import { useState, useEffect } from "react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";
import { StockMovement } from "./types";
import { format } from "date-fns"; // Importamos la librería

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string[];
  size: string;
  style: string;
  discount: number;
  isActive: boolean;
  category: {
    id: string;
    name: string;
  };
}

interface StockData {
  stockInicial: number;
  vendidos: number;
  stockActual: number;
}

export default function useStockMovements() {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [selectedMovement, setSelectedMovement] = useState<StockMovement | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [consolidatedStock, setConsolidatedStock] = useState<Record<string, { product: Product; sizes: Record<string, StockData> }>>({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("❌ No se ha encontrado el token de autenticación.");
      setLoading(false);
      return;
    }

    const fetchStockMovements = async () => {
      try {
        const response = await axios.get<StockMovement[]>(`${API_BACK}/stock-movements`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const movements = response.data;
        setStockMovements(movements);
        setConsolidatedStock(consolidateStockByProduct(movements));
      } catch (error) {
        console.error("❌ Error al obtener movimientos de stock:", error);
        setError("Hubo un error al cargar los movimientos de stock.");
      } finally {
        setLoading(false);
      }
    };

    fetchStockMovements();
  }, []);

  const consolidateStockByProduct = (movements: StockMovement[]) => {
    const consolidated: Record<string, { product: Product; sizes: Record<string, StockData> }> = {};
  
    movements.forEach((movement) => {
      if (!movement.product) return;
      
      const productId = movement.product.id;
      const size = movement.size || "Sin Talla";
  
      // Verificar que movement.product tiene todas las propiedades de Product
      const completeProduct: Product = {
        id: movement.product.id,
        name: movement.product.name,
        description: movement.product.description || "Sin descripción",
        price: movement.product.price || "0",
        stock: (movement.product as Product).stock ?? 0, // Si es undefined, usa 0
        image: movement.product.image || [],
        size: (movement.product as Product).size || "Única",
        style: (movement.product as Product).style || "Genérico",
        discount: (movement.product as Product).discount ?? 0, // Si es undefined, usa 0
        isActive: (movement.product as Product).isActive ?? true,
        category: (movement.product as Product).category || { id: "unknown", name: "Sin Categoría" },
      };
  
      if (!consolidated[productId]) {
        consolidated[productId] = { product: completeProduct, sizes: {} };
      }
  
      if (!consolidated[productId].sizes[size]) {
        consolidated[productId].sizes[size] = {
          stockInicial: 0,
          vendidos: 0,
          stockActual: 0,
        };
      }
  
      if (movement.type === "initial_stock") {
        consolidated[productId].sizes[size].stockInicial += movement.newStock;
      } else if (movement.type === "order_creation") {
        consolidated[productId].sizes[size].vendidos += Math.abs(movement.quantity);
      }
    });
  
    Object.keys(consolidated).forEach((productId) => {
      Object.keys(consolidated[productId].sizes).forEach((size) => {
        const data = consolidated[productId].sizes[size];
        data.stockActual = data.stockInicial - data.vendidos;
      });
    });
  
    return consolidated;
  };

  const filteredStock: StockMovement[] = Object.values(consolidatedStock)
    .flatMap((productData) =>
      Object.entries(productData.sizes).map(([size, stockData]: [string, StockData]) => ({
        id: `generated-${productData.product.id}-${size}`, // ID generado si falta
        product: productData.product,
        size,
        stockInicial: stockData.stockInicial,
        vendidos: stockData.vendidos,
        stockActual: stockData.stockActual,
        createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"), // Usamos date-fns para formatear la fecha y hora
        quantity: stockData.vendidos,
        type: "consolidated", // Tipo genérico
        reason: "consolidated calculation", // Razón genérica
        previousStock: stockData.stockInicial,
        newStock: stockData.stockActual,
      }))
    )
    .filter((item) =>
      item.product.name.toLowerCase().includes(search.toLowerCase())
    );

  return {
    stockMovements,
    selectedMovement,
    setSelectedMovement,
    search,
    setSearch,
    loading,
    error,
    filteredStock,
  };
}
