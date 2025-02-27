"use client"

import { useState } from "react";
import { useCategories } from "../../context/Categories.context";
import { Title } from "./components/Title";
import { Mixin } from "@/modules/auth/shared/components/MixinAlert";
import { ProductInterface, useProducts } from "../../context/Products.context";
import { Plus, X } from "lucide-react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";
import { useSizes } from "../../context/Sizes.context";
import { useColors } from "../../context/Colors.context";

// interface Size {
//     id: number
//     size: string
// }


const colorins = [
    { id: 1, color: "Blanco" },
    { id: 2, color: "Negro" },
    { id: 3, color: "Rojo" },
    { id: 4, color: "Azul" },
];

export interface Color {
    id: number
    color: string
}



const MAX_IMAGES = 5;



export const ManagmentProductForm = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newCategory, setNewCategory] = useState<string>("");
    const [newColor, setNewColor] = useState<string>("")
    const [newSize, setNewSize] = useState<string>("")

    const { products, createProduct } = useProducts()
    const { categories, createCategory, error } = useCategories()
    const { createSize, sizes } = useSizes()
    const { createColor } = useColors()


    const [cloudinary, setCloudinary] = useState<string[]>([])
    const [colors, setColors] = useState<string[]>([])

    const [IsModalOpenSize, setIsModalOpenSize] = useState<boolean>(false)


    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSize, setIsOpenSize] = useState(false);


    

    const handleColorProduct = (selectedColor: string) => {
        setFormProduct((prev) => ({
          ...prev,
          color: prev.color.includes(selectedColor)
            ? prev.color.filter((color) => color !== selectedColor) // Quita si ya estaba
            : [...prev.color, selectedColor], // Agrega si no estaba
        }));
    };

     const handleSizeProduct = (selectedSize: string) => {
        setFormProduct((prev) => ({
          ...prev,
          size: prev.size.includes(selectedSize)
            ? prev.size.filter((size) => size !== selectedSize) 
            : [...prev.size, selectedSize],
        }));
    };
  
    
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

    const [formProduct, setFormProduct] = useState<ProductInterface>({
        name: "",
        description: "",
        image: [],
        price: "",
        stock: "",
        category: "",
        size: [],
        isActive: false,
        color: []
    })


    const handleChangeProduct = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value  } = e.target;
        setFormProduct({
          ...formProduct,
          [name]: value
        });
    };


    const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setFormProduct({
            ...formProduct,
            [name]: type === "checkbox" ? checked : value
        });
    };


    // CREAMOS UNA CATEGORIA
    const handleCreateCategory = (e: any) => {
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

    const handleCreateSize = (e: any) => {
        e.preventDefault()

        if(!newSize) {
            Mixin.fire("El campo no puede quedar vacio", "", "error")
            return
        }
        
        if(error) {
            Mixin.fire("Error al crear el size", error, "error")
            return
        }
       
        createSize({name: newSize})


        Mixin.fire(`Categoria: ${newSize} creada con exito`, "", "success")
        setIsModalOpenSize(false);
        setNewSize("")
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


    console.log('====================================');
    console.log(formProduct);
    console.log('====================================');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //handlerSubmit(e, products, "El producto ",formProduct, createProduct, "Producto creado con éxito", setFormProduct);
        e.preventDefault();
    
        const formData = {
            ...formProduct,
            image: cloudinary, 
            sizes: sizes,
            color: colors
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
            console.log('====================================');
            console.log(formData);
            console.log('====================================');
            createProduct(formData)

            setFormProduct({
                name: "",
                description: "",
                image: [],
                price: "",
                stock: "",
                category: "",
                size: [],
                isActive: false,
                color: []
            }); 
    

            Mixin.fire("Producto creado con éxito", "", "success");
        } catch (error) {
            Mixin.fire("Error al crear el producto", "", "error");
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
                                    <img
                                        src={image}
                                        alt={`Imagen ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg"
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

            



            {/* ############################### MODAL CATEGORIA ############################### */}
                    {/* CORRECCIONES: MODAL DE CATEGORIA FUNCIONANDO REALIZAR COMPONENTE */}
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
                    <div
                        className="w-full p-2 border rounded-lg cursor-pointer bg-white"
                        onClick={() => setIsOpenSize(!isOpenSize)}
                    >
                        {formProduct.size.length > 0
                        ? formProduct.size.join(", ")
                        : "Seleccionar talles"}
                    </div>

                    {/* Dropdown con opciones */}
                    {isOpenSize && (
                        <div className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
                        {sizes.map((s) => (
                            <div
                                key={s.id}
                                className={`p-2 hover:bg-gray-200 cursor-pointer flex justify-between ${
                                    formProduct.size.includes(s.name) ? "bg-blue-300" : ""
                                }`}
                                onClick={() => handleSizeProduct(s.name)}
                            >
                                {s.name}
                                {formProduct.size.includes(s.name) && <span>✓</span>}
                            </div>
                        ))}
                        </div>
                    )}   
                </div> 



                {/* ########################### COLORES ########################### */}
                    
                <div className="relative w-full">
             
                    <div
                        className="w-full p-2 border rounded-lg cursor-pointer bg-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {formProduct.color.length > 0
                        ? formProduct.color.join(", ") 
                        : "Seleccionar colores"}
                    </div>

                    
                    {isOpen && (
                        <div className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
                            {colorins.map((c) => (
                                <div
                                    key={c.id}
                                    className={`p-2 hover:bg-gray-200 cursor-pointer flex justify-between ${
                                        formProduct.color.includes(c.color) ? "bg-blue-300" : ""
                                    }`}
                                    onClick={() => handleColorProduct(c.color)}
                                >
                                    {c.color}
                                    {formProduct.color.includes(c.color) && <span className="text-green-500">✓</span>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div> 
         
                





            {/* ############################### MAS OPCIONES ############################### */}

            <div className="space-y-4 p-6 rounded-lg bg-white flex flex-col gap-4">
                <h1 className="text-2xl font-semibold">Más opciones</h1>
                <div className="flex gap-1">
                    <input name="isActive" checked={formProduct.isActive} onChange={handleChangeCheckbox} id="isVisible" type="checkbox" className="p-2 border" />
                    <label htmlFor="isVisible">Mostrar en la tienda</label>
                    
                </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Subir Producto</button>
        </form>
    )
}