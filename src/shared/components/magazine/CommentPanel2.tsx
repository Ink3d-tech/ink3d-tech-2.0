"use client";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

interface Comentario {
  id: string;
  username: string;
  text: string;
  likes: number;
  isLiked: boolean;
}

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3003");

export function CommentPanel2() {
  const { user, isAuthenticated } = useAuth();
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    socket.on("updateComments", (comments: Comentario[]) => {
      setComentarios((prev) => [
        ...prev,
        ...comments.filter((c) => !prev.some((p) => p.id === c.id)),
      ]);
    });

    return () => {
      socket.off("updateComments");
    };
  }, []);

  const manejarComentario = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setMensajeError("Debes iniciar sesión para comentar.");
      return;
    }
    if (!nuevoComentario.trim()) return;

    const comentario: Comentario = {
      id: Date.now().toString(),
      username: typeof user === "object" && user !== null ? user.name : "usuario_desconocido",
      text: nuevoComentario,
      likes: 0,
      isLiked: false,
    };

    setComentarios((prev) => [...prev, comentario]);
    socket.emit("newComment", comentario);
    setNuevoComentario("");
    setMensajeError("");
  };

  const alternarMeGusta = (idComentario: string) => {
    if (!isAuthenticated) {
      setMensajeError("Debes iniciar sesión para dar me gusta.");
      return;
    }

    setComentarios((prev) =>
      prev.map((comentario) =>
        comentario.id === idComentario
          ? {
              ...comentario,
              likes: comentario.isLiked ? comentario.likes - 1 : comentario.likes + 1,
              isLiked: !comentario.isLiked,
            }
          : comentario
      )
    );
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-3xl shadow-xl  border border-indigo-50 flex flex-col h-[50vh] ">
        {/* Encabezado */}
        <div className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 ">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 ">Comentarios</h2>
        </div>

        {/* Lista de comentarios */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {comentarios.map((comentario) => (
            <div key={comentario.id} className="group animate-fade-in">
              <div className="flex items-start space-x-4">
                <div className="flex-1 min-w-0">
                  <div className="bg-indigo-50/50 rounded-xl p-4 hover:bg-indigo-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">@{comentario.username}</p>
                    </div>
                    <p className="mt-2 text-gray-700 leading-relaxed">{comentario.text}</p>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-indigo-100/30">
                      <button
                        onClick={() => alternarMeGusta(comentario.id)}
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          comentario.isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                        }`}
                      >
                        ❤ {comentario.likes}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Formulario para agregar comentarios */}
        <div className="p-4 bg-white border-t border-indigo-100">
          {mensajeError && <p className="text-red-500 text-sm mb-2">{mensajeError}</p>}
          <form onSubmit={manejarComentario} className="relative">
            <input
              type="text"
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              placeholder={isAuthenticated ? "Añadir un comentario..." : "Inicia sesión para comentar"}
              disabled={!isAuthenticated}
              className="w-full px-4 py-3 pr-12 bg-indigo-50/50 border-2 border-transparent rounded-xl focus:outline-none focus:border-indigo-500/20 focus:bg-white transition-all placeholder:text-gray-400"
            />
            <button
              type="submit"
              disabled={!isAuthenticated}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}