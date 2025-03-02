"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../footer/Footer";

interface FormData {
  id?: string; // ID opcional para editar/eliminar
  author: string;
  title: string;
  description: string;
  image: string; // URL de la imagen
}

export default function FormMagazine() {
  const [formData, setFormData] = useState<FormData>({
    author: "",
    title: "",
    description: "",
    image: "",
  });

  const [selectedId, setSelectedId] = useState<string | null>(null); // ID del artículo seleccionado
  const [articles, setArticles] = useState<FormData[]>([]); // Lista de artículos

  // Cargar artículos desde la API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get<FormData[]>("http://localhost:3000/api/magazine");
        setArticles(response.data); 
      } catch (error) {
        console.error("Error al obtener los artículos:", error);
      }
    };

    fetchArticles();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      // Resetear formulario y ID
      setFormData({ author: "", title: "", description: "", image: "" });
      setSelectedId(null);

      // Refrescar lista de artículos después de la actualización o creación
      const response = await axios.get<FormData[]>("http://localhost:3000/api/magazine");
      setArticles(response.data);

    } catch (error: any) {
      console.error("Error al enviar el formulario:", error.response?.data || error.message);
    }
  };

  // Cargar datos en el formulario para edición
  const handleEdit = (article: FormData) => {
    setFormData(article);
    setSelectedId(article.id || null);
  };

  // Eliminar artículo
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/magazine/${id}`);
      console.log("Artículo eliminado con éxito.");

      // Eliminar el artículo de la lista sin necesidad de recargar la página
      setArticles(articles.filter((article) => article.id !== id));

      // Resetear formulario después de eliminar
      setFormData({ author: "", title: "", description: "", image: "" });
      setSelectedId(null);
    } catch (error: any) {
      console.error("Error al eliminar el artículo:", error.response?.data || error.message);
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
