"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  description: string;
  content: string;
}

interface Comment {
  id: number;
  articleId: number;
  author: string;
  text: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Las Tendencias Más Hot de la Temporada",
    author: "Laura Jimenez",
    date: "15 Feb 2024",
    image: "/images/01.png",
    description:
      "Descubre las últimas tendencias en moda que están dominando las pasarelas y cómo puedes incorporarlas a tu estilo diario.",
    content:
      "Aquí está todo el contenido detallado del artículo sobre tendencias en moda.",
  },
  {
    id: 2,
    title: "Secretos del Estilo Urbano Chic",
    author: "Nacho",
    date: "10 Feb 2024",
    image: "/images/02.png",
    description:
      "Los trucos y consejos para dominar el estilo urbano sin perder la elegancia. Inspirado en las grandes ciudades del mundo.",
    content: "Aquí está el contenido del artículo sobre estilo urbano chic.",
  },
  {
    id: 3,
    title: "Colores que Dominarán en Primavera",
    author: "Laura Jimenez",
    date: "05 Feb 2024",
    image: "/images/03.png",
    description:
      "Una guía completa sobre los colores que serán tendencia esta primavera y cómo combinarlos para lograr un look espectacular.",
    content:
      "Aquí está el contenido del artículo sobre los colores de la primavera.",
  },
];

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const foundArticle = articles.find((a) => a.id === Number(id));
    setArticle(foundArticle || null);
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim() === "" || author.trim() === "") return;
    const comment: Comment = {
      id: comments.length + 1,
      articleId: Number(id),
      author,
      text: newComment,
    };
    setComments([...comments, comment]);
    setNewComment("");
    setAuthor("");
  };

  if (!article) {
    return <p className="text-center text-gray-500">Artículo no encontrado</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold">{article.title}</h1>
          <p className="text-gray-500 text-sm mt-2">
            {article.date} · <span className="font-bold">{article.author}</span>
          </p>
          <p className="mt-4 text-gray-700">{article.content}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold">Comentarios</h2>
        <div className="mt-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 py-2">
              <p className="text-gray-700 font-bold">{comment.author}</p>
              <p className="text-gray-600">{comment.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Tu nombre"
            className="border p-2 w-full rounded mb-2"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            placeholder="Escribe tu comentario..."
            className="border p-2 w-full rounded"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="bg-yellow-300 text-white px-4 py-2 rounded mt-2"
            onClick={handleAddComment}
          >
            Agregar comentario
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
