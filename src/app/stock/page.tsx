
"use client"
import { useState } from "react";

const Inventory = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Camiseta", category: "Ropa", color: "Negro", size: "M", price: 20000, stock: 10, reference: "ABC123" },
    { id: 2, name: "Jogger", category: "Ropa", color: "Azul Marino", size: "L", price: 30000, stock: 5, reference: "XYZ456" }
  ]);
  
  const [newProduct, setNewProduct] = useState({ name: "", category: "", color: "", size: "", price: "", stock: "", reference: "" });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    const updatedProducts = [...products, { ...newProduct, id: products.length + 1 }];
    setProducts(updatedProducts);
    setNewProduct({ name: "", category: "", color: "", size: "", price: "", stock: "", reference: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4">🏷️ Gestión de Stock</h1>
      
      {/* Tabla de Inventario */}
      <table className="w-full border-collapse border border-gray-600 text-white">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-600 px-4 py-2">Referencia</th>
            <th className="border border-gray-600 px-4 py-2">Nombre</th>
            <th className="border border-gray-600 px-4 py-2">Categoría</th>
            <th className="border border-gray-600 px-4 py-2">Color</th>
            <th className="border border-gray-600 px-4 py-2">Talla</th>
            <th className="border border-gray-600 px-4 py-2">Precio</th>
            <th className="border border-gray-600 px-4 py-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="border border-gray-600 px-4 py-2">{product.reference}</td>
              <td className="border border-gray-600 px-4 py-2">{product.name}</td>
              <td className="border border-gray-600 px-4 py-2">{product.category}</td>
              <td className="border border-gray-600 px-4 py-2">{product.color}</td>
              <td className="border border-gray-600 px-4 py-2">{product.size}</td>
              <td className="border border-gray-600 px-4 py-2">${product.price}</td>
              <td className="border border-gray-600 px-4 py-2">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para añadir productos */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">➕ Agregar Producto</h2>
        <input type="text" name="reference" placeholder="🔢 Referencia" onChange={handleChange} value={newProduct.reference} className="w-full p-2 border rounded mb-2 bg-gray-800" />
        <input type="text" name="name" placeholder="📛 Nombre" onChange={handleChange} value={newProduct.name} className="w-full p-2 border rounded mb-2 bg-gray-800" />
        <input type="text" name="category" placeholder="📂 Categoría" onChange={handleChange} value={newProduct.category} className="w-full p-2 border rounded mb-2 bg-gray-800" />
        <select name="color" onChange={handleChange} value={newProduct.color} className="w-full p-2 border rounded mb-2 bg-gray-800">
          <option value="">🎨 Color</option>
          <option value="Blanco">Blanco</option>
          <option value="Negro">Negro</option>
          <option value="Azul Marino">Azul Marino</option>
          <option value="Rojo">Rojo</option>
        </select>
        <select name="size" onChange={handleChange} value={newProduct.size} className="w-full p-2 border rounded mb-2 bg-gray-800">
          <option value="">📏 Talla</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        <input type="number" name="price" placeholder="💰 Precio" onChange={handleChange} value={newProduct.price} className="w-full p-2 border rounded mb-2 bg-gray-800" />
        <input type="number" name="stock" placeholder="📦 Stock" onChange={handleChange} value={newProduct.stock} className="w-full p-2 border rounded mb-2 bg-gray-800" />
        <button onClick={handleAddProduct} className="bg-red-500 text-white px-4 py-2 rounded w-full">📌 Añadir Producto</button>
      </div>
    </div>
  );
};

export default Inventory;

