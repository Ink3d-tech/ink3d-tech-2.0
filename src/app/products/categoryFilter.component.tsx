"use client";
import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://project-ink3d-back-1.onrender.com/categories");
        if (!response.ok) throw new Error("Error al obtener categorías");
  
        const data = await response.json();
        console.log("Categorías recibidas:", data); 
  
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        setError((error as Error).message);
      }
    };
  
    fetchCategories();
  }, []);

  return (
    <div className="mb-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <select
        className="p-2 border border-gray-400 rounded"
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Todas las categorías</option>
        {categories.length > 0 ? (
  categories.map((cat) => (
    <option key={cat.id} value={String(cat.name)}>
      {String(cat.name)}
    </option>
  ))
) : (
  <option disabled>Cargando categorías...</option>
)}


      </select>
    </div>
  );
}
