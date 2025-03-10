import { API_BACK } from "@/shared/config/api/getEnv";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: {
      id: string;
      name: string;
    };
    image: string;
    size: string;
    stock: number;
    style: string;
  }

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BACK}/products`);
  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }
  return response.json();
};

export const getAllCategories = async (): Promise<{ id: string; name: string }[]> => {
  const response = await fetch(`${API_BACK}/categories`);
  if (!response.ok) {
    throw new Error("Error al obtener las categorías");
  }
  return response.json();
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_BACK}/products/${id}`);
  if (!response.ok) {
    throw new Error("Error al obtener el producto");
  }
  return response.json();
};

export const getProductsByCategoryName = async (categoryName: string): Promise<Product[]> => {
  try {
    const categories = await getAllCategories();
    const category = categories.find((cat) => cat.name.toLowerCase() === categoryName.toLowerCase());

    if (!category) {
      console.warn(`⚠️ No se encontró la categoría: ${categoryName}`);
      return [];
    }

    const allProducts = await getAllProducts();
    return allProducts.filter((product) => product.category.id === category.id);
  } catch (error) {
    console.error("Error obteniendo productos por categoría:", error);
    return [];
  }
};
