"use client"



import { useState } from "react";
import { motion } from "framer-motion";

export default function StockManagement() {
  const [inventory, setInventory] = useState([
    { id: 1, nombre: "Remera", talla: "M", color: "Blanco", precio: 20, stock: 10, categoria: "Ropa", descripcion: "Remera básica de algodón", imagen: "" },
    { id: 2, nombre: "Jogger", talla: "L", color: "Negro", precio: 35, stock: 5, categoria: "Ropa Deportiva", descripcion: "Jogger cómodo para entrenar", imagen: "" },
  ]);

  const [newItem, setNewItem] = useState({
    nombre: "", talla: "XS", color: "Blanco", precio: 0, stock: 1, categoria: "", descripcion: "", imagen: ""
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, imagen: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    setInventory([...inventory, { ...newItem, id: Date.now() }]);
    setNewItem({ nombre: "", talla: "XS", color: "Blanco", precio: 0, stock: 1, categoria: "", descripcion: "", imagen: "" });
  };

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-4 text-center">📦 Gestión de Stock</h1>

      {/* Formulario para agregar stock */}
      <motion.div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-lg mx-auto"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-semibold mb-4">➕ Agregar Nuevo Producto</h2>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Nombre" value={newItem.nombre} onChange={(e) => setNewItem({ ...newItem, nombre: e.target.value })} className="p-2 border rounded text-black" />
          <select value={newItem.talla} onChange={(e) => setNewItem({ ...newItem, talla: e.target.value })} className="p-2 border rounded text-black">
            <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
          </select>
          <select value={newItem.color} onChange={(e) => setNewItem({ ...newItem, color: e.target.value })} className="p-2 border rounded text-black">
            <option>Blanco</option><option>Negro</option><option>Azul Marino</option><option>Rojo</option>
          </select>
          <input type="number" placeholder="Precio" value={newItem.precio} onChange={(e) => setNewItem({ ...newItem, precio: Number(e.target.value) })} className="p-2 border rounded text-black" />
          <input type="number" placeholder="Stock" value={newItem.stock} onChange={(e) => setNewItem({ ...newItem, stock: Number(e.target.value) })} className="p-2 border rounded text-black" />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="p-2 border rounded text-white" />
        </div>
        <button onClick={addItem} className="w-full bg-green-500 text-white py-2 rounded mt-4">Agregar al Stock</button>
      </motion.div>

      {/* Tabla de Inventario */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-gray-900 text-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Imagen</th>
              <th className="py-2 px-4 border-b">Producto</th>
              <th className="py-2 px-4 border-b">Talla</th>
              <th className="py-2 px-4 border-b">Color</th>
              <th className="py-2 px-4 border-b">Precio</th>
              <th className="py-2 px-4 border-b">Stock</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.imagen && <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover" />}</td>
                <td className="py-2 px-4 border-b">{item.nombre}</td>
                <td className="py-2 px-4 border-b">{item.talla}</td>
                <td className="py-2 px-4 border-b">{item.color}</td>
                <td className="py-2 px-4 border-b">${item.precio}</td>
                <td className="py-2 px-4 border-b">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
