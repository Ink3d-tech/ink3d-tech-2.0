"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";
import { format, addMinutes } from "date-fns";
import { Ticket, Plus, Trash, Search } from "lucide-react";
import { Mixin } from "@/modules/auth/shared/components/MixinAlert";
import SkeletonDiscountsList from "./SkeletonDiscountList";


// Definir el tipo de datos del descuento
interface Discount {
  id: string;
  amount: number;
  isUsed: boolean;
  createdAt: string;
  expiresAt: string | null;
  status: "active" | "expired" | "used" | "inactive";
  userId: string | null;
}

function DiscountsApp() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [searchId, setSearchId] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);

  // Obtener los descuentos
  const fetchDiscounts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No hay token de autenticación.");
        return;
      }
      const response = await axios.get<Discount[]>(`${API_BACK}/discounts`, {
        headers: { Authorization: `Bearer ${token}` },
      });


      setDiscounts(response.data);
    } catch (error) {
      setError("Error al cargar los descuentos.");
      console.error(error)
    } finally {
      setLoading(false);
    }
  };

  // Crear un descuento con expiración opcional
  const createDiscount = async () => {
    if (!newAmount || Number(newAmount) < 1 || Number(newAmount) > 100) {
      alert("El porcentaje debe estar entre 1 y 100");
      return;
    }

    const minExpiration = addMinutes(new Date(), 5);
    if (expiresAt && new Date(expiresAt) < minExpiration) {
      alert("La fecha de expiración debe ser al menos 5 minutos en el futuro.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const expirationDate = expiresAt ? new Date(expiresAt).toISOString() : null;

      const response = await axios.post<Discount>(
        `${API_BACK}/discounts`,
        {
          amount: Number(newAmount),
          isUsed: false,
          status: "active",
          expiresAt: expirationDate,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDiscounts([...discounts, response.data]);
      setNewAmount("");
      setExpiresAt(null);
    } catch (error) {
      alert("Error al crear el descuento");
      console.error(error)
    }
  };

  // Eliminar un descuento
  const deleteDiscount = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BACK}/discounts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDiscounts(discounts.filter((discount) => discount.id !== id));
    } catch (error) {
      console.error(error)
      alert("Error al eliminar el descuento");
    }
  };

  // Buscar un descuento por ID
  const searchDiscount = async () => {
    if (!searchId) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<Discount>(`${API_BACK}/discounts/${searchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSelectedDiscount(response.data);
    } catch (error) {
      Mixin.fire("Descuento no encontrado");
      console.error(error)
    }
  };

  // Agrupar descuentos por porcentaje
  const groupedDiscounts = discounts.reduce((acc, discount) => {
    if (!acc[discount.amount]) {
      acc[discount.amount] = [];
    }
    acc[discount.amount].push(discount);
    return acc;
  }, {} as Record<number, Discount[]>);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  if (loading) return <SkeletonDiscountsList/>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Ticket className="h-6 w-6 mr-2 text-indigo-600" /> Lista de Descuentos
        </h1>
      </header>

      {/* Formulario estilizado */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Crear nuevo descuento</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            placeholder="% de descuento"
            className="border p-2 rounded w-full"
          />
          <input
            type="datetime-local"
            value={expiresAt ? expiresAt : ""}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button onClick={createDiscount} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center">
            <Plus className="h-5 w-5 mr-2" /> Crear
          </button>
        </div>
      </div>

      {/* Buscar un descuento */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Buscar descuento por ID</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="ID del descuento"
            className="border p-2 rounded w-full"
          />
          <button onClick={searchDiscount} className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center">
            <Search className="h-5 w-5 mr-2" /> Buscar
          </button>
        </div>
      </div>

      {/* Mostrar descuento seleccionado */}
      {selectedDiscount && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 border-l-4 border-indigo-600">
          <h2 className="text-xl font-bold">{selectedDiscount.amount}% de descuento</h2>
          <p className="text-sm text-gray-500">ID: {selectedDiscount.id}</p>
          <p className="text-sm text-gray-500">
            Creado: {format(new Date(selectedDiscount.createdAt), "dd/MM/yyyy HH:mm")}
          </p>
          {selectedDiscount.expiresAt && (
            <p className="text-sm text-red-500">
              Expira: {format(new Date(selectedDiscount.expiresAt), "dd/MM/yyyy HH:mm")}
            </p>
          )}
        </div>
      )}

      {/* Lista de descuentos agrupados */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {Object.entries(groupedDiscounts).map(([amount, discountList]) => {
    // Ordenamos para encontrar el último creado
    const sortedDiscounts = discountList.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const latestDiscount = sortedDiscounts[0];
    console.log(amount)
    // Contadores de estado
    const totalCreated = discountList.length;
    const expiringSoon = discountList.filter(d => d.expiresAt !== null && d.status === "active").length;
    const expired = discountList.filter(d => d.status === "expired").length;
    const noExpiration = discountList.filter(d => d.expiresAt === null).length;

    return (
      <div key={latestDiscount.id} className="bg-white rounded-lg shadow-md border-l-4 border-indigo-600 p-8 mt-4">
        <h2 className="text-xl font-semibold text-gray-800">{latestDiscount.amount}% de descuento</h2>
        <p className="text-sm text-gray-500">ID: {latestDiscount.id}</p>
        <p className="text-sm text-gray-500">Creado: {format(new Date(latestDiscount.createdAt), "dd/MM/yyyy HH:mm")}</p>

        {/* Contadores de estado */}
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-700 font-semibold">Total creados: {totalCreated}</p>
          {expiringSoon > 0 && (
            <p className="text-sm text-yellow-500 font-semibold">Próximas a vencer: {expiringSoon}</p>
          )}
          {expired > 0 && <p className="text-sm text-red-500 font-semibold">Expirados: {expired}</p>}
          {noExpiration > 0 && <p className="text-sm text-green-500 font-semibold">Sin expiración: {noExpiration}</p>}
        </div>

        <button
          onClick={() => deleteDiscount(latestDiscount.id)}
          className="bg-red-500 text-white px-4 py-2 mt-2 rounded flex items-center"
        >
          <Trash className="h-5 w-5 mr-2" /> Eliminar
        </button>
      </div>
    );
  })}
</div>

    </div>
  );
}

export default DiscountsApp;
