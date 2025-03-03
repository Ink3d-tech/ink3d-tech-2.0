"use client"

import { useState } from "react";
import { useCategories } from "../../context/Categories.context";
import { Title } from "./components/Title";
import { Mixin } from "@/modules/auth/shared/components/MixinAlert";
import { ProductInterface, useProducts } from "../../context/Products.context";
import { Plus, X } from "lucide-react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";

import { PlusOption } from "./components/PlusOption.component";
import Image from "next/image";
import { CustomError } from "@/modules/auth/shared/helpers/customError";

interface Size {
    id: number
    name: string
}

const sizes: Size[] = [
    { id: 1, name: "XL" },
    { id: 2, name: "L" },
    { id: 3, name: "M" },
    { id: 4, name: "S" },
]


const colorins = [
    { id: 1, name: "Blanco" },
    { id: 2, name: "Negro" },
    { id: 3, name: "Rojo" },
    { id: 4, name: "Azul" },
];

export interface Color {
    id: number
    color: string
}



const MAX_IMAGES = 5;

const FORM_PRODUCT_INTIAL: ProductInterface = {
    name: "",
    description: "",
    image: [],
    price: "",
    stock: "",
    category: "",
    size: "",
    isActive: false,
    color: ""
}


export const ManagmentProductForm = () => {
    const [formProduct, setFormProduct] = useState<ProductInterface>(FORM_PRODUCT_INTIAL)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


    const [newCategory, setNewCategory] = useState<string>("");

    const { createProduct } = useProducts()
    const { categories, createCategory, error } = useCategories()

    const [cloudinary, setCloudinary] = useState<string[]>([])

    
    const handleCloudinary = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file); 
        
        try {
            const res = await axios.post<string>(
                `${API_BACK}/file`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem("token")}`, 
                    },
                }
            );
            setCloudinary([ ...cloudinary, res.data]);
        } catch (error) {
            console.error('Error uploading image:', error);
            return
        }
    };

    const handleChangeProduct = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value  } = e.target;
        console.log(formProduct)
        setFormProduct({
          ...formProduct,
          [name]: value
        });
    };




    
    const handleCreateCategory = (e: React.SyntheticEvent) => {
        e.preventDefault()

        if(!newCategory) {
            Mixin.fire("El campo no puede quedar vacio", "", "error")
            return
        }
        
        if(error) {
            Mixin.fire("Error al crear la categoria", error, "error")
            return
        }
       
        createCategory({name: newCategory})


        Mixin.fire(`Categoria: ${newCategory} creada con exito`, "", "success")
        setIsModalOpen(false);
        setNewCategory("")
    };
    

    // IMAGES GUARDO LOS CAMBIOS
    const [images, setImages] = useState<(string | null)[]>(Array(MAX_IMAGES).fill(null));

    // MANEJADOR PARA GUARDAR LAS IMAGENES
    const handleImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            handleCloudinary(file)
            const imageUrl = URL.createObjectURL(file);
            if(imageUrl) {
                setImages(images.map((img, i) => (i === index ? imageUrl : img)))
            };
        }
    };

    // MANEJADOR PARA REMOVER LA IMAGEN (CRUZ)
    const handleRemoveImage = (index: number) => {
        setImages(images.map((img, i) => (i === index ? null : img)));
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //handlerSubmit(e, products, "El producto ",formProduct, createProduct, "Producto creado con éxito", setFormProduct);
        e.preventDefault();
    
        const formData = {
            ...formProduct,
            image: cloudinary
        };

        if (Object.values(formData).some(value => value === "" || value === undefined || value === null)) {
            Mixin.fire("Error", "Por favor, completa todos los campos correctamente.", "error");
            return;
        }

        if(error) {
            Mixin.fire("Error al crear la categoria", error, "error")
            return
        }

        try {
            createProduct(formData)
            
            setFormProduct(FORM_PRODUCT_INTIAL); 
            setCloudinary([]);
            setImages(Array(MAX_IMAGES).fill(null));

            Mixin.fire("Producto creado con éxito", "", "success");
        } catch (error) {
            const errorMessage = error instanceof CustomError ? error.message : "Error interno del servidor"
            Mixin.fire("Error al crear el producto", errorMessage, "error");
        }
    };


    // MANEJADOR PARA VALIDAR EL CAMPO DE TIPO NUMBER
    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const invalidKeys = ['+', '-', 'e', 'E', ',', '.'];
        if (invalidKeys.includes(e.key)) {
            e.preventDefault();
          }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-300 p-6 rounded-lg">
            <div className="space-y-4 p-6 rounded-lg bg-white shadow-lg">
                <Title title="Nombre y descripción"/>
                <input name="name" value={formProduct.name} onChange={handleChangeProduct} type="text"  placeholder="Nombre del Producto" className="w-full p-2 border"/>
                <textarea name="description" value={formProduct.description} onChange={handleChangeProduct} placeholder="Escribe la descripción aquí..." className="w-full p-2 border resize-none h-60" ></textarea>
            </div>



            {/* ############################### IMAGENES ############################### */}

            <div className="space-y-4 p-6 rounded-lg bg-white flex flex-col gap-4 shadow-lg">
                <Title title="Fotos"/>
                <div className="flex justify-center items-center gap-8">
                    {images.map((image, index) => (
                        <div key={index} className="relative w-40 h-40">
                        <label className="w-full h-full flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition relative">
                            <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageChange(index, e)}
                            className="hidden"
                            />
                            {image ? (
                                    <Image
                                        src={image}
                                        alt={`Imagen ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg"
                                        width={200}
                                        height={200}
                                    />
                                ) : (
                                    <div className="flex flex-col justify-center items-center">
                                        <Plus size={40} className="text-gray-400" />
                                        <h2 className="text-center">Arrastrá y soltá las imagenes aquí</h2>
                                    </div>
                                )
                            }
                        </label>
                    
                    {/* Si hay imagen mostramos la X en caso de querer eliminar la imagen */}
                        {image && (
                            <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-700 transition"
                            >
                            <X size={16} />
                            </button>
                        )}
                        </div>
                    ))}
                </div>
            </div> 



            {/* ############################### PRECIO Y STOCK ############################### */}

            <div className="space-y-4 p-6 rounded-lg bg-white flex flex-col gap-4 shadow-lg">
            <Title title="Precio y stock"/>
                <input name="price" value={formProduct.price} onChange={handleChangeProduct}  type="number" placeholder="Price" className="w-full p-2 border" min="0" onKeyDown={handleOnKeyDown}/>
                <input name="stock" value={formProduct.stock} onChange={handleChangeProduct} type="number" placeholder="Stock" className="w-full p-2 border" min="0" onKeyDown={handleOnKeyDown} />
            </div>

            {/* ############################### CATEGORIA ############################### */}
        
            <div className="space-y-4 p-6 rounded-lg bg-white flex flex-col gap-4 shadow-lg">
                <Title title="Categorías"/>
    
                <select name="category" value={formProduct.category} onChange={handleChangeProduct} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" >
                    <option value={""} disabled>Seleccionar una categoría</option>
                    { categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>) }
                </select>

                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={(e) => {
                        e.preventDefault()
                        setIsModalOpen(true)
                    }}
                >
                    +
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center shadow-lg">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold">Crear Categoría</h2>
                        <input 
                            type="text" 
                            placeholder="Nombre de la categoría" 
                            className="w-full p-2 border my-4"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button 
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleCreateCategory}
                            >
                                Crear
                            </button>
                        </div>
                    </div>
                </div>
            )}



            {/* ############################### VARIANTES ############################### */}

            <div className="space-y-4 p-6 rounded-lg bg-white flex flex-col gap-4">
                <h1 className="text-2xl font-semibold">Variantes</h1>


                {/* ########################### TALLES ########################### */}
                
                <div className="relative w-full">
                    <select name="size" value={formProduct.size} onChange={handleChangeProduct} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" >
                        <option value={""} disabled>Seleccionar una talla</option>
                        { sizes.map((cat) => <option key={cat.id} value={cat.name}>{cat.name}</option>) }
                    </select> 
                </div> 



                {/* ########################### COLORES ########################### */}
                    
                <div className="relative w-full">
                    <select name="color" value={formProduct.color} onChange={handleChangeProduct} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" >
                        <option value={""} disabled>Seleccionar un color</option>
                        { colorins.map((cat) => <option key={cat.id} value={cat.name}>{cat.name}</option>) }
                    </select>
                </div>
            </div> 
         
            {/* ############################### MAS OPCIONES ############################### */}

            <PlusOption formProduct={formProduct} setFormProduct={setFormProduct}/>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Subir Producto</button>
        </form>
    )
}