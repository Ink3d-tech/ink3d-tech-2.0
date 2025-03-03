"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Definimos el tipo de datos de un artículo
interface Article {
  id?: number;
  title: string;
  content: string;
  image: string;
  author: string;
}

export default function ForumPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [newArticle, setNewArticle] = useState<Article>({
    title: "",
    content: "",
    image: "",
    author: "",
  });
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // 📌 Cargar artículos al cargar la página
  useEffect(() => {
    fetch("/api/magazine")
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos:", data);
        setArticles(data);
      })
      .catch((err) => console.error("Error al obtener artículos:", err));
  }, []);

  // 📌 Crear o editar artículo
  const handlePublish = async () => {
    const method = editingArticle ? "PUT" : "POST";
    const url = editingArticle
      ? `/api/magazine/${editingArticle.id}`
      : "/api/magazine";

    console.log("Enviando a", url, "con datos", newArticle);

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArticle),
    });

    if (!response.ok) {
      console.error("Error al publicar artículo", await response.text());
      return;
    }

    const updatedArticle = await response.json();
    setArticles((prev) =>
      editingArticle
        ? prev.map((art) => (art.id === editingArticle.id ? updatedArticle : art))
        : [...prev, updatedArticle]
    );

    setNewArticle({ title: "", content: "", image: "", author: "" });
    setEditingArticle(null);
  };

  // 📌 Eliminar artículo
  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este artículo?")) return;

    const response = await fetch(`/api/magazine/${id}`, { method: "DELETE" });

    if (!response.ok) {
      console.error("Error al eliminar artículo", await response.text());
      return;
    }

    setArticles((prev) => prev.filter((article) => article.id !== id));
  };

  // 📌 Cargar artículo en el formulario para edición
  const handleEdit = (article: Article) => {
    setNewArticle(article);
    setEditingArticle(article);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">💬 Foro Social</h2>

      <input
        type="text"
        placeholder="Título"
        className="w-full p-2 border mb-2"
        value={newArticle.title}
        onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
      />
      <textarea
        placeholder="Escribe tu post aquí..."
        className="w-full p-2 border mb-2"
        value={newArticle.content}
        onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL de la imagen"
        className="w-full p-2 border mb-2"
        value={newArticle.image}
        onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
      />
      <button
        onClick={handlePublish}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {editingArticle ? "Actualizar" : "Publicar"}
      </button>

      <h3 className="text-2xl font-bold mt-6">📝 Artículos</h3>
      <ul>
        {articles.map((article) => (
          <li key={article.id} className="border p-4 mt-2">
            <h4 className="text-xl font-semibold">{article.title}</h4>
            <p>{article.content}</p>
            <Image src={article.image} alt={article.title} className="w-32 h-32 mt-2" width={150} height={150}/>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(article)}
                className="bg-yellow-500 text-black px-3 py-1 rounded mr-2"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => handleDelete(article.id!)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                🗑 Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
