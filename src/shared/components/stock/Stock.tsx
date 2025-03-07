import axios from "axios";
import { useEffect, useState } from "react";
import { getAuthHeaders } from "../../../modules/user/pages/manager/context/getAuthHeaders"; // Asegúrate de importar la ruta correcta

const Stock = () => {
  const [stockMovements, setStockMovements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStockMovements = async () => {
      try {
        setLoading(true);

        // 🔍 Verificar los headers antes de la petición
        const headers = getAuthHeaders();
        console.log("🔍 Headers enviados:", headers);

        const response = await axios.get(
          "http://localhost:3000/stock-movements",
          headers // Usamos la función para incluir el token
        );

        console.log("✅ Respuesta de stock-movements:", response.data);
        setStockMovements(response.data);
      } catch (error: any) {
        console.error("❌ Error al obtener movimientos de stock:", error);

        if (error.response?.status === 401) {
          alert("⚠️ Sesión expirada o no autorizada. Inicia sesión nuevamente.");
        } else {
          alert("Hubo un error al cargar los movimientos de stock.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStockMovements();
  }, []);

  return (
    <div>
      <h2>Movimientos de Stock</h2>
      {loading ? <p>Cargando...</p> : <pre>{JSON.stringify(stockMovements, null, 2)}</pre>}
    </div>
  );
};

export default Stock;
