// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";
// import { getAuthHeaders } from "./getAuthHeaders";


// export interface CategoryInterface {
//     id?: string
//     name: string
// }

// export interface ProductInterface {
//     id?: string
//     name: string
//     description: string
//     price: number | ""
//     size: string
//     stock: number | ""
//     image: string
//     discount?: number | ""
//     categoryId: string
//     isActive?: boolean
// }

// interface ProductsContextType {
//     products: Product[]
//     loading: boolean
//     error: string | undefined
//     getAllProducts: () => Product[]  | undefined
//     getProductById: (id: string) => Product | undefined
//     filteredProducts: (selectedCategory: string) => Product[] | undefined
//     desactivateProduct: (id: string) => Promise<void>
//     activateProduct: (id: string) => Promise<void>
//     createProduct: (product: Product) => Promise<void>
// }

// const ProductsContext = createContext<ProductsContextType>({
//     products: [],
//     loading: true,
//     error: undefined,
//     createProduct: async () => { },
//     getProductById: () => undefined,
//     updateProduct: async () => { },
//     deleteProduct: async () => { },
// });

// export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
//     const [products, setProducts] = useState<ProductInterface[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | undefined>();
//     console.log(products)
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const res = await axios.get<Product[]>(`${API_BACK}/products`)
//                 if(res) setProducts(res.data)
//             } catch (error) {
//                 setError(error instanceof Error ? error.message : "Error interno del servidor");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProducts();
//     }, []);

        

//     const createProduct = async (product: ProductInterface): Promise<void> => {      
//         try {
//             const res = await axios.post<ProductInterface>(`${API_BACK}/products`, product,  getAuthHeaders());
//             setProducts(prev => [...prev, res.data]);
//         } catch (error) {
//             setError(error instanceof Error ? error.message : "Error al crear el producto");
//         }
//     };

//     const getProductById = (id: string): ProductInterface | undefined => {
//         if (!products || products.length === 0) return undefined
//         return products.find(product => product.id === id) || undefined;
//     };


//     const updateProduct = async (id: string, data: Partial<ProductInterface>): Promise<void> => {
//         try {
//             await axios.patch(`${API_BACK}/products/${id}`, data, getAuthHeaders());
//             setProducts(prev => prev.map(product =>
//                 product.id === id ? { ...product, ...data } : product
//             ));
//         } catch (error) {
//             setError(error instanceof Error ? error.message : "Error actualizando el producto");
//         }
//     };

//     const deleteProduct = async (id: string): Promise<void> => {
//         try {
//             await axios.delete(`${API_BACK}/products/${id}`, getAuthHeaders())
//             setProducts(prev => prev.filter(product => product.id !== id));
//         } catch (error) {
//             setError(error instanceof Error ? error.message : "Error eliminando el producto")
//         }
//     }

//     const value = {
//         products,
//         loading,
//         error,
//         getProductById,
//         updateProduct,
//         createProduct,
//         deleteProduct
//     };

//     return (
//         <ProductsContext.Provider value={value}>
//             {children}
//         </ProductsContext.Provider>
//     );
// };

// export const useProducts = (): ProductsContextType => {
//     const context = useContext(ProductsContext);
//     if (!context) throw new Error("useProducts must be used within a ProductsProvider");
//     return context;
// };

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";
import { getAuthHeaders } from "./getAuthHeaders";


export interface CategoryInterface {
    id?: string;
    name: string;
}

export interface ProductInterface {
    id?: string;
    name: string;
    description: string;
    price: number | "";
    size: string;
    stock: number | "";
    image: string[];
    category?: string;
    discount?: number | "";
    categoryId?: string;
    isActive?: boolean;
    color?: string;
}

interface ProductsContextType {
    products: ProductInterface[];
    loading: boolean;
    error: string | undefined;
    getAllProducts: () => ProductInterface[] | undefined;
    getProductById: (id: string) => ProductInterface | undefined;
    filteredProducts: (selectedCategory: string) => ProductInterface[] | undefined;
    desactivateProduct: (id: string) => Promise<void>;
    activateProduct: (id: string) => Promise<void>;
    createProduct: (product: ProductInterface) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType>({
    products: [],
    loading: true,
    error: undefined,
    createProduct: async () => { },
    getProductById: () => undefined,
    filteredProducts: () => undefined,
    desactivateProduct: async () => { },
    activateProduct: async () => { },
    getAllProducts: () => undefined 
});

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get<ProductInterface[]>(`${API_BACK}/products`);
                if (res) setProducts(res.data);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Error interno del servidor");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const createProduct = async (product: ProductInterface): Promise<void> => {
        try {
            const res = await axios.post<ProductInterface>(`${API_BACK}/products`, product, getAuthHeaders());
            setProducts(prev => [...prev, res.data]);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error al crear el producto");
        }
    };

    const getProductById = (id: string): ProductInterface | undefined => {
        if (!products || products.length === 0) return undefined;
        return products.find(product => product.id === id) || undefined;
    };

    const filteredProducts = (selectedCategory: string): ProductInterface[] | undefined => {
        if (!selectedCategory) return undefined;
        return products.filter(product => product.categoryId === selectedCategory);
    };

    const desactivateProduct = async (id: string): Promise<void> => {
        try {
            const updatedProduct = products.find(product => product.id === id);
            if (updatedProduct) {
                const updatedProductData = { ...updatedProduct, isActive: false };
                await axios.patch(`${API_BACK}/products/${id}`, updatedProductData, getAuthHeaders());
                setProducts(prev => prev.map(product => product.id === id ? updatedProductData : product));
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error desactivando el producto");
        }
    };

    const activateProduct = async (id: string): Promise<void> => {
        try {
            const updatedProduct = products.find(product => product.id === id);
            if (updatedProduct) {
                const updatedProductData = { ...updatedProduct, isActive: true };
                await axios.patch(`${API_BACK}/products/${id}`, updatedProductData, getAuthHeaders());
                setProducts(prev => prev.map(product => product.id === id ? updatedProductData : product));
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error activando el producto");
        }
    };

    const getAllProducts = (): ProductInterface[] | undefined => {
        return products;
    };

    const value = {
        products,
        loading,
        error,
        getProductById,
        createProduct,
        filteredProducts,
        desactivateProduct,
        activateProduct,
        getAllProducts 
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = (): ProductsContextType => {
    const context = useContext(ProductsContext);
    if (!context) throw new Error("useProducts must be used within a ProductsProvider");
    return context;
};
