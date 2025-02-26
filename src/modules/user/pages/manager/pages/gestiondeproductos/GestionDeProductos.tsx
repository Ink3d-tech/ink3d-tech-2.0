"use client"
import { useState } from "react";
import { ProductInterface } from "../../context/Products.context";


const GestionProductos = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProductInterface>({
    name: "",
    categoryId: "",
    size: "",
    price: "",
    stock: "",
    discount: "",
    image: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="max-w-lg mx-auto  mt-10 p-6 bg-black text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4">🛍️ Gestión de Productos</h1>
      
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-2">1️⃣ Características</h2>
          <select name="name" className="w-full p-2 border rounded mb-2">
            <option value="">📛 Selecciona un producto</option>
            <option value="Camisetas">Camisetas</option>
            <option value="Jogger">Jogger</option>
          </select>
          <input type="text" name="category" placeholder="📂 Categoría"  className="w-full p-2 border rounded mb-2" />
          <select name="color"  className="w-full p-2 border rounded mb-2">
            <option value="">🎨 Selecciona un color</option>
            <option value="Blanco">Blanco</option>
            <option value="Negro">Negro</option>
            <option value="Azul Marino">Azul Marino</option>
            <option value="Rojo">Rojo</option>
          </select>
          <select name="size"  className="w-full p-2 border rounded mb-2">
            <option value="">📏 Selecciona una talla</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          <input type="number" name="price" placeholder="💰 Precio"  className="w-full p-2 border rounded mb-2" />
        </div>
      )}
      
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-2">2️⃣ Stock y Descuentos</h2>
          <input type="number" name="stock" placeholder="📦 Stock" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <input type="number" name="discount" placeholder="🔖 Descuento (%)" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        </div>
      )}
      
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-2">3️⃣ Imágenes</h2>
          <input type="file" multiple className="w-full p-2 border rounded mb-2" />
        </div>
      )}
      
      <div className="flex justify-between mt-4">
        {step > 1 && <button onClick={() => setStep(step - 1)} className="bg-red-500 text-white px-4 py-2 rounded">⬅️ Atrás</button>}
        {step < 3 ? (
          <button onClick={() => setStep(step + 1)} className="bg-red-500 text-white px-4 py-2 rounded">Siguiente ➡️</button>
        ) : (
          <button onClick={() => alert("Producto registrado con éxito! 🎉")} className="bg-red-500 text-white px-4 py-2 rounded">Finalizar ✅</button>
        )}
      </div>
    </div>
  );
};

export default GestionProductos;
