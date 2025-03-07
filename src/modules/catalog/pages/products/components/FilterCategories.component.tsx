"use client";

import { useState, useEffect } from "react";
import { API_BACK } from "@/shared/config/api/getEnv";

interface Category {
  id: string;
  name: string;
}

interface FilterCategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
}

export default function FilterCategories({ selectedCategory, onSelectCategory }: FilterCategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BACK}/categories`);
        if (!response.ok) {
          throw new Error("Error al obtener las categorías");
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="my-4 px-4">
      <select
        className="p-2 border rounded-md bg-white text-gray-700"
        value={selectedCategory || ""}
        onChange={(e) => onSelectCategory(e.target.value || null)}
      >
        <option value="">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
