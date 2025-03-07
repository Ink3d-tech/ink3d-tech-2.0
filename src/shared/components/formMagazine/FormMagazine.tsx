"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Image from "next/image";

interface FormData {
  id?: string;
  category: string,
  author: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
}

export default function FormMagazine() {
  const { token, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    category: "",
    author: "",
    title: "",
    description: "",
    image: "",
    isActive: true,
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [articles, setArticles] = useState<FormData[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Strike],
    content: formData.description,
    onUpdate: ({ editor }) => {
      setFormData({ ...formData, description: editor.getHTML() });
    },
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get<FormData[]>(`${API_BACK}/api/magazine`);
      setArticles(response.data);
    } catch (error) {
      console.error("Error al obtener los artículos:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !token) {
      console.error("No hay un usuario autenticado o falta el token.");
      return;
    }

    let imageUrl = formData.image;

    if (selectedFile) {
      const formDataImage = new FormData();
      formDataImage.append("file", selectedFile);

      try {
        const uploadResponse = await axios.post(`${API_BACK}/file`, formDataImage, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        imageUrl = uploadResponse.data as string;
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        return;
      }
    }

    const formDataToSend = {
      category: formData.category, 
      title: formData.title,
      content: formData.description,
      image: imageUrl,
      author: formData.author,
      isActive: formData.isActive,
    };
    

    try {
      if (selectedId) {
        await axios.patch(`${API_BACK}/api/magazine/${selectedId}`, formDataToSend, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Artículo actualizado:", formDataToSend);
      } else {
        await axios.post(`${API_BACK}/api/magazine`, formDataToSend, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Artículo publicado:", formDataToSend);
      }
      setFormData({    category: "", author: "", title: "", description: "", image: "", isActive: true });
      setSelectedId(null);
      setImagePreview("");
      setSelectedFile(null);
      fetchArticles();
    } catch{
      console.error("Error al enviar el formulario:");
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 6;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const paginatedArticles = articles.slice(currentPage * articlesPerPage, (currentPage + 1) * articlesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleToggleActive = async (articleId: string) => {
    try {
      await axios.patch(`${API_BACK}/api/magazine/active/${articleId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchArticles();
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-md">
        <div className="flex justify-between space-x-4">
          <div className="w-3/5">
          <label className="block">
              Categoria:
              <input type="text" name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="border p-2 w-full" required />
            </label>
            <label className="block">
              Autor:
              <input type="text" name="author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className="border p-2 w-full" required />
            </label>
            <label className="block">
              Título:
              <input type="text" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="border p-2 w-full" required />
            </label>
          </div>
          <div className="w-2/5">
            <label className="block">
              📷 Subir Imagen:
              <div
                className="border p-4 w-full text-center rounded-md border-dashed"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <p className="text-gray-600">Arrastra y suelta una imagen aquí o haz clic para seleccionar</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </label>

            {imagePreview && (
              <div className="mt-3">
                <p className="text-gray-500 text-sm">Vista previa:</p>
                <Image
                  src={imagePreview}
                  alt="Vista previa"
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover border rounded-md"
                />
              </div>
            )}
          </div>
        </div>

        <label className="block">
          Descripción:
          <div className="border p-3 w-full min-h-[200px] rounded-md relative">
            {editor && (
              <div className="absolute bottom-2 right-2 space-x-2 bg-white p-1 rounded shadow-md">
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1 text-sm font-bold">B</button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 text-sm italic">I</button>
                <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className="px-2 py-1 text-sm line-through">S</button>
              </div>
            )}
            <EditorContent editor={editor} className="min-h-[150px] p-2" />
          </div>
        </label>

        <button type="submit" className={`px-4 py-2 rounded text-white transition ${selectedId ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`} disabled={!isAuthenticated}>
          {selectedId ? "Actualizar" : "Publicar"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Lista de Artículos</h2>
        {articles.length > 0 ? (
          <ul>
            {paginatedArticles.map((article) => (
              <li key={article.id} className="flex justify-between items-center p-2 border-b">
                <div>
                  <p className="font-semibold">{article.title}</p>
                  <p className={`text-sm ${article.isActive ? "text-green-600" : "text-red-600"}`}>
                    {article.isActive ? "Activo" : "Inactivo"}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setFormData(article);
                    setSelectedId(article.id || null);
                    setImagePreview(article.image);
                    console.log("Artículo seleccionado con ID:", article.id);
                  }}
                  className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleToggleActive(article.id!)}
                  className={`px-2 py-1 rounded text-white ${article.isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                >
                  {article.isActive ? "Desactivar" : "Activar"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay artículos disponibles.</p>
        )}

        <div className="flex justify-center space-x-4 mt-4">
          <button onClick={prevPage} disabled={currentPage === 0} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
            ◀ Anterior
          </button>
          <span>Página {currentPage + 1} de {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage >= totalPages - 1} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
            Siguiente ▶
          </button>
        </div>
      </div>
    </div>
  );
}
