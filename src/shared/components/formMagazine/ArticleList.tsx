import { useState } from "react";
import Image from "next/image";
import { FaEdit, FaToggleOn, FaToggleOff, FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";

interface FormData {
  id?: string;
  category: string;
  author: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
}

interface ArticleListProps {
  articles: FormData[];
  onEdit: (article: FormData) => void;
  onToggleActive: (articleId: string) => void;
}

export default function ArticleList({ articles, onEdit, onToggleActive }: ArticleListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 3;

  // Filtrar y ordenar artículos
  const filteredArticles = articles
    .filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.title.localeCompare(b.title));

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const paginatedArticles = filteredArticles.slice(currentPage * articlesPerPage, (currentPage + 1) * articlesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Lista de Artículos</h2>

      {/* 📌 Buscador */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedArticles.map((article) => (
            <div key={article.id} className="bg-white shadow-md rounded-lg overflow-hidden border">
              {article.image && (
                <div className="relative w-full h-32">
                  <Image
                    src={article.image}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
              )}

              <div className="p-3">
                <h3 className="font-semibold text-md text-gray-800 truncate">{article.title}</h3>
                <p className="text-sm text-gray-500">{article.author}</p>
                <p className={`text-xs font-bold mt-1 ${article.isActive ? "text-green-600" : "text-red-600"}`}>
                  {article.isActive ? "Activo" : "Inactivo"}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => onEdit(article)}
                    className="flex items-center px-2 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    <FaEdit className="mr-1" /> Editar
                  </button>

                  <button
                    onClick={() => onToggleActive(article.id!)}
                    className={`flex items-center px-2 py-1 text-xs rounded text-white transition ${
                      article.isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {article.isActive ? <FaToggleOff className="mr-1" /> : <FaToggleOn className="mr-1" />}
                    {article.isActive ? "Desactivar" : "Activar"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay artículos disponibles.</p>
      )}

      {/* 📌 Paginación */}
      {filteredArticles.length > articlesPerPage && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="flex items-center px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 transition"
          >
            <FaArrowLeft className="mr-2" /> Anterior
          </button>
          <span className="text-gray-700 font-semibold">
            Página {currentPage + 1} de {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage >= totalPages - 1}
            className="flex items-center px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 transition"
          >
            Siguiente <FaArrowRight className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
}
