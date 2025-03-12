import { useState, useEffect } from "react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import ArticleList from "./ArticleList";
import ArticleForm from "./ArticleForm";

export interface FormData {
  id?: string;
  category: string;
  author: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
}

export default function FormMagazine() {
  const { token } = useAuth();

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
    <h2 className="text-2xl font-bold mb-6 text-center">Creación de Artículos</h2>

      <ArticleForm
        formData={formData}
        setFormData={setFormData}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        fetchArticles={fetchArticles}
      />
      <ArticleList
        articles={articles}
        onEdit={(article) => {
          setFormData(article);
          setSelectedId(article.id || null);
          console.log("Artículo seleccionado con ID:", article.id);
        }}
        onToggleActive={handleToggleActive}
      />
    </div>
  );
}
