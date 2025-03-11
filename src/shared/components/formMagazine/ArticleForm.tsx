"use client";

import { useEffect, useState } from "react";
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
  category: string;
  author: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
}

interface Props {
  formData: FormData;
  setFormData: (data: FormData) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  fetchArticles: () => void;
}

const categories = ["MOTORSPORT", "MUNDO ASIAN", "STREETWEAR", "ACERCA DE NOSOTROS"];

export default function ArticleForm({ formData, setFormData, selectedId, setSelectedId, fetchArticles }: Props) {
  const { token, isAuthenticated } = useAuth();
  const [imagePreview, setImagePreview] = useState<string>(formData.image || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Strike],
    content: formData.description || "",
    onUpdate: ({ editor }) => {
      setFormData({ ...formData, description: editor.getHTML() });
    },
  });


  useEffect(() => {
    if (editor && formData.description) {
      editor.commands.setContent(formData.description);
    }
  }, [formData.description, editor]);


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
  
    // 💡 Aquí aplicamos la solución
    const updatedDescription = editor?.getHTML() || ""; // Usa optional chaining
  
    const formDataToSend = {
      category: formData.category,
      title: formData.title,
      content: updatedDescription,
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
      setFormData({ category: "", author: "", title: "", description: "", image: "", isActive: true });
      editor?.commands.setContent("");
      setSelectedId(null);
      setImagePreview("");
      setSelectedFile(null);
      fetchArticles();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };
  




  const handleCancelUpdate = () => {
      setFormData({ category: "", author: "", title: "", description: "", image: "", isActive: true });
      setSelectedId(null);
      setImagePreview("");
      setSelectedFile(null);
      if (editor) {
        editor.commands.setContent("");
      }
    };
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="flex flex-col md:flex-row justify-between space-x-0 md:space-x-6">
        {/* 📌 Sección Izquierda */}
        <div className="w-full md:w-3/5 space-y-4">
          <label className="block">
            <span className="text-gray-700 font-medium">📌 Categoría:</span>
            <select
              name="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="border rounded-md p-2 w-full mt-1 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">✍ Autor:</span>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="border rounded-md p-2 w-full mt-1 focus:ring-2 focus:ring-blue-500"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">📖 Título:</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border rounded-md p-2 w-full mt-1 focus:ring-2 focus:ring-blue-500"
              required
            />
          </label>
        </div>

        {/* 📌 Sección Derecha - Imagen */}
        <div className="w-full md:w-2/5">
          <label className="block">
            <span className="text-gray-700 font-medium">📷 Subir Imagen:</span>
            <div
              className="border-2 border-dashed p-4 w-full text-center rounded-md mt-2 cursor-pointer transition hover:bg-gray-100"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <p className="text-gray-500">Arrastra y suelta una imagen aquí o haz clic para seleccionar</p>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>
          </label>

          {imagePreview && (
            <div className="mt-3 flex justify-center">
              <Image
                src={imagePreview}
                alt="Vista previa"
                width={140}
                height={140}
                className="w-36 h-36 object-cover border rounded-md shadow-sm"
              />
            </div>
          )}
        </div>
      </div>

      {/* 📌 Descripción con Editor */}
      <label className="block">
        <span className="text-gray-700 font-medium">📝 Descripción:</span>
        <div className="border p-3 w-full min-h-[200px] rounded-md relative">
          {editor && (
            <div className="absolute bottom-2 right-2 space-x-2 bg-white p-1 rounded shadow-md border">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="px-2 py-1 text-sm font-bold hover:bg-gray-200 rounded"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className="px-2 py-1 text-sm italic hover:bg-gray-200 rounded"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className="px-2 py-1 text-sm line-through hover:bg-gray-200 rounded"
              >
                S
              </button>
            </div>
          )}
          <EditorContent editor={editor} className="min-h-[150px] p-2" />
        </div>
      </label>

      {/* 📌 Botones de Acción */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Botón para Publicar o Actualizar */}
        <button
          type="submit"
          className={`w-full py-3 text-white font-semibold rounded-md transition ${selectedId ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
            } disabled:opacity-50`}
          disabled={!isAuthenticated}
        >
          {selectedId ? "✅ Actualizar Artículo" : "🚀 Publicar Artículo"}
        </button>

        {/* Botón para Cancelar Actualización (Solo si está editando) */}
        {selectedId && (
          <button
            type="button"
            onClick={handleCancelUpdate}
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-md transition hover:bg-red-600"
          >
            ❌ Cancelar Actualización
          </button>
        )}
      </div>

    </form>
  );
}