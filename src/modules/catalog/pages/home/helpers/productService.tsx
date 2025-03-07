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
  }

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BACK}/products`);
  if (!response.ok) {
    throw new Error("Error al obtener los productos");
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

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const allProducts = await getAllProducts();
  if (categoryId === "all") return allProducts;

  return allProducts.filter((product) => product.category.id === categoryId);
};
