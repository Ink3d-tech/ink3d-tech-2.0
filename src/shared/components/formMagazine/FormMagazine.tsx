"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";
import Image from "next/image";
import { CustomError } from "@/modules/auth/shared/helpers/customError";


interface FormData {
  id?: string;
  author: string;
  title: string;
  description: string;
  image: string;
}

export default function FormMagazine() {
  const [formData, setFormData] = useState<FormData>({
    author: "",
    title: "",
    description: "",
    image: "",
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [articles, setArticles] = useState<FormData[]>([]);
  const [imagePreview, setImagePreview] = useState<string>(""); // Vista previa de imagen

  // Cargar artículos desde la API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get<FormData[]>(`${API_BACK}/auth/google/login/api/magazine`);
        setArticles(response.data);
      } catch (error) {
        console.error("Error al obtener los artículos:", error);
      }
    };
    fetchArticles();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Si es el campo de imagen, actualizar la vista previa
    if (name === "image") {
      setImagePreview(value);
    }
  };

  // Crear o actualizar artículo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = {
      title: formData.title,
      content: formData.description,
      image: formData.image,
      author: formData.author,
    };

    try {
      if (selectedId) {
        // EDITAR ARTÍCULO (PUT)
        await axios.put(`http://localhost:3000/api/magazine/${selectedId}`, formDataToSend);
        console.log("Artículo actualizado:", formDataToSend);
      } else {
        // CREAR ARTÍCULO (POST)
        await axios.post("http://localhost:3000/api/magazine", formDataToSend);
        console.log("Artículo publicado:", formDataToSend);
      }

      // Resetear formulario e ID
      setFormData({ author: "", title: "", description: "", image: "" });
      setSelectedId(null);
      setImagePreview("");

      // Refrescar lista de artículos
      const response = await axios.get<FormData[]>(`${API_BACK}/auth/google/login/api/magazine`);
      setArticles(response.data);

    } catch (error) {
      const errorMessage = error instanceof CustomError ? error.message : "Error interno del servidor"
      console.error("Error al enviar el formulario:", errorMessage);
    }
  };

  // Cargar datos en el formulario para edición
  const handleEdit = (article: FormData) => {
    setFormData(article);
    setSelectedId(article.id || null);
    setImagePreview(article.image); // Mostrar la imagen actual en la vista previa
  };

  // Eliminar artículo
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/magazine/${id}`);
      console.log("Artículo eliminado con éxito.");
      setArticles(articles.filter((article) => article.id !== id));
      setFormData({ author: "", title: "", description: "", image: "" });
      setSelectedId(null);
      setImagePreview("");
    } catch (error) {
      const errorMessage = error instanceof CustomError ? error.message : "Error interno del servidor"
      console.error("Error al eliminar el artículo:", errorMessage);
    }
  };

  return (
    <div>
      {/* Formulario de artículo */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-md">
        <label className="block">
          Autor:
          <input 
            type="text" 
            name="author" 
            value={formData.author} 
            onChange={handleChange} 
            className="border p-2 w-full" 
            required 
          />
        </label>

        <label className="block">
          Título:
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="border p-2 w-full" 
            required 
          />
        </label>

        <label className="block">
          Descripción:
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            className="border p-2 w-full" 
            required 
          ></textarea>
        </label>

        <label className="block">
          📷 URL de Imagen:
          <input 
            type="text" 
            name="image" 
            value={formData.image} 
            onChange={handleChange} 
            className="border p-2 w-full" 
            placeholder="https://example.com/image.jpg" 
            required 
          />
        </label>

        {/* Vista previa de la imagen */}
        {imagePreview && (
          <div className="mt-3">
            <p className="text-gray-500 text-sm">Vista previa:</p>
            <Image src={imagePreview} alt="Vista previa" className="w-32 h-32 object-cover border rounded-md" width={200}
              height={200} />
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-3 mt-3">
          <button 
            type="submit" 
            className={`px-4 py-2 rounded text-white transition ${selectedId ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            {selectedId ? "Actualizar" : "Publicar"}
          </button>
        </div>
      </form>

      {/* Lista de artículos */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Lista de Artículos</h2>
        {articles.length > 0 ? (
          <ul>
            {articles.map((article) => (
              <li key={article.id} className="flex justify-between items-center p-2 border-b">
                <span>{article.title}</span>
                <div>
                  <button
                    onClick={() => handleEdit(article)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(article.id!)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay artículos disponibles.</p>
        )}
      </div>
      
      
    </div>
  );
}
