import axios from 'axios';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Interfaces
type ITransaction = {
    id: number;
    description: string;
    amount: number;
    date: string;
};

type IDetailsVenta = {
    id: number;
    product: string;
    quantity: number;
    price: number;
};

// Servicios API
const fetchTransactions = async (): Promise<ITransaction[]> => {
    try {
        const response = await axios.get('http://localhost:3000/transactions');
        if (!Array.isArray(response.data)) throw new Error("Datos incorrectos en transactions");
        return response.data as ITransaction[];
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
};

const fetchDetailsVenta = async (): Promise<IDetailsVenta[]> => {
    try {
        const response = await axios.get('http://localhost:3000/details-venta');
        if (!Array.isArray(response.data)) throw new Error("Datos incorrectos en details venta");
        return response.data as IDetailsVenta[];
    } catch (error) {
        console.error('Error fetching details venta:', error);
        return [];
    }
};

// Componente de Finanzas
const Finanzas = () => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [details, setDetails] = useState<IDetailsVenta[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const transactionsData = await fetchTransactions();
            setTransactions(transactionsData);

            const detailsData = await fetchDetailsVenta();
            setDetails(detailsData);
        };
        loadData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Resumen Financiero</h1>

            {/* Tarjetas con información clave */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-lg font-semibold">Total Transacciones</h2>
                    <p className="text-2xl">{transactions.length}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-lg font-semibold">Ingresos Totales</h2>
                    <p className="text-2xl">${transactions.reduce((acc, t) => acc + t.amount, 0)}</p>
                </div>
            </div>

            {/* Gráfico de ventas */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Transacciones por Categoría</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={transactions}>
                        <XAxis dataKey="description" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#4F46E5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Tabla de detalles de venta */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Detalles de Venta</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Producto</th>
                            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
                            <th className="border border-gray-300 px-4 py-2">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((d) => (
                            <tr key={d.id} className="border border-gray-300">
                                <td className="px-4 py-2">{d.product}</td>
                                <td className="px-4 py-2">{d.quantity}</td>
                                <td className="px-4 py-2">${d.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Finanzas;
