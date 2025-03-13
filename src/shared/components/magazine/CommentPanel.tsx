// "use client";
// import { useAuth } from "@/modules/auth/shared/context/Auth.context";
// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// interface Comentario {
//   id: string;
//   username: string;
//   text: string;
//   likes: number;
//   isLiked: boolean;
// }

// const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3003");

// export function CommentPanel() {
//   const { user, isAuthenticated } = useAuth();
//   const [comentarios, setComentarios] = useState<Comentario[]>([]);
//   const [nuevoComentario, setNuevoComentario] = useState("");
//   const [mensajeError, setMensajeError] = useState("");

//   useEffect(() => {
//     socket.on("updateComments", (comments: Comentario[]) => {
//       setComentarios((prev) => [
//         ...prev,
//         ...comments.filter((c) => !prev.some((p) => p.id === c.id)),
//       ]);
//     });

//     return () => {
//       socket.off("updateComments");
//     };
//   }, []);

//   const manejarComentario = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!isAuthenticated) {
//       setMensajeError("Debes iniciar sesión para comentar.");
//       return;
//     }
//     if (!nuevoComentario.trim()) return;

//     const comentario: Comentario = {
//       id: Date.now().toString(),
//       username: typeof user === "object" && user !== null ? user.name : "usuario_desconocido",
//       text: nuevoComentario,
//       likes: 0,
//       isLiked: false,
//     };

//     setComentarios((prev) => [...prev, comentario]);
//     socket.emit("newComment", comentario);
//     setNuevoComentario("");
//     setMensajeError("");
//   };

//   const alternarMeGusta = (idComentario: string) => {
//     if (!isAuthenticated) {
//       setMensajeError("Debes iniciar sesión para dar me gusta.");
//       return;
//     }

//     setComentarios((prev) =>
//       prev.map((comentario) =>
//         comentario.id === idComentario
//           ? {
//               ...comentario,
//               likes: comentario.isLiked ? comentario.likes - 1 : comentario.likes + 1,
//               isLiked: !comentario.isLiked,
//             }
//           : comentario
//       )
//     );
//   };

//   return (
//     <div className="w-full max-w-[600px] md:w-[350px] lg:max-w-[400px] bg-white rounded-3xl shadow-xl overflow-hidden border border-indigo-50">
//       <div className="flex flex-col h-[calc(100vh-2rem)] md:h-[800px]">
//         <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500">
//           <h2 className="text-xl font-semibold text-white flex items-center gap-2">Comentarios</h2>
//         </div>
//         <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
//           {comentarios.map((comentario) => (
//             <div key={comentario.id} className="group animate-fade-in">
//               <div className="flex items-start space-x-4">
//                 <div className="flex-1 min-w-0">
//                   <div className="bg-indigo-50/50 rounded-2xl p-4 hover:bg-indigo-50 transition-colors">
//                     <div className="flex items-center justify-between">
//                       <p className="font-semibold text-gray-900">@{comentario.username}</p>
//                     </div>
//                     <p className="mt-2 text-gray-700 leading-relaxed">{comentario.text}</p>
//                     <div className="flex items-center gap-6 mt-3 pt-3 border-t border-indigo-100/30">
//                       <button
//                         onClick={() => alternarMeGusta(comentario.id)}
//                         className={`flex items-center gap-1 text-sm transition-colors ${
//                           comentario.isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
//                         }`}
//                       >
//                         ❤ {comentario.likes}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="p-4 bg-white border-t border-indigo-100">
//           {mensajeError && <p className="text-red-500 text-sm mb-2">{mensajeError}</p>}
//           <form onSubmit={manejarComentario} className="relative">
//             <input
//               type="text"
//               value={nuevoComentario}
//               onChange={(e) => setNuevoComentario(e.target.value)}
//               placeholder={isAuthenticated ? "Añadir un comentario..." : "Inicia sesión para comentar"}
//               disabled={!isAuthenticated}
//               className="w-full px-4 py-3 pr-12 bg-indigo-50/50 border-2 border-transparent rounded-xl focus:outline-none focus:border-indigo-500/20 focus:bg-white transition-all placeholder:text-gray-400"
//             />
//             <button
//               type="submit"
//               disabled={!isAuthenticated}
//               className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
//             >
//               Enviar
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }






// "use client";
// import { useAuth } from "@/modules/auth/shared/context/Auth.context";
// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";
// interface Comentario {
//   id: string;
//   username: string;
//   text: string;
//   likes: number;
//   isLiked: boolean;
// }
// interface CommentPanelProps {
//   magazineId: string;
// }
// const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3003");
// export function CommentPanel({ magazineId }: CommentPanelProps) {
//   const { user, isAuthenticated } = useAuth();
//   const [comentarios, setComentarios] = useState<Comentario[]>([]);
//   const [nuevoComentario, setNuevoComentario] = useState("");
//   const [mensajeError, setMensajeError] = useState("");
//   const [mensajeToxicidad, setMensajeToxicidad] = useState("");
//   useEffect(() => {
//     console.log("Magazine ID recibido:", magazineId);
//     if (!magazineId) return;
//     // Función para cargar los comentarios iniciales
//     const fetchComentarios = async () => {
//       console.log("Iniciando carga de comentarios...");
//       try {
//         const response = await axios.get<Comentario[]>(`${API_BACK}/api/comments/${magazineId}`);
//         console.log("Comentarios iniciales recibidos:", response.data);
//         setComentarios(response.data);
//       } catch (error) {
//         console.error("Error cargando comentarios:", error);
//       }
//     };
//     fetchComentarios();
//     // Conexión al socket y escucha de nuevos comentarios
//     socket.emit("joinRoom", magazineId);
//     socket.on("newComment", (newComment: Comentario) => {
//       console.log("Nuevo comentario recibido a través de Socket:", newComment);
//       setComentarios((prevComentarios) => {
//         if (!prevComentarios.some((comment) => comment.id === newComment.id)) {
//           return [...prevComentarios, newComment];
//         }
//         return prevComentarios;
//       });
//     });
//     return () => {
//       socket.off("newComment");
//       console.log("Desconectando del socket...");
//     };
//   }, [magazineId]);
//   // Función para verificar la toxicidad de un comentario
//   const verificarToxicidad = async (comentarioTexto: string) => {
//     console.log("Verificando toxicidad para el comentario:", comentarioTexto);
//     try {
//       const response = await axios.post(`${API_BACK}/perspective/analyze`, {
//         text: comentarioTexto,
//       });
//       console.log("Respuesta de Perspective API:", response.data);
//       const toxicityMessage = response.data.toxicityMessage;
//       if (toxicityMessage === "Este comentario es tóxico.") {
//         setMensajeToxicidad(toxicityMessage);
//         console.log("Toxicidad alta detectada:", toxicityMessage);
//         return false;
//       } else if (toxicityMessage === "Este comentario podría ser tóxico. ¿Estás seguro?") {
//         setMensajeToxicidad(toxicityMessage);
//         console.log("Toxicidad moderada detectada:", toxicityMessage);
//         return true;
//       }
//       setMensajeToxicidad("");
//       return true;
//     } catch (error) {
//       console.error("Error al verificar toxicidad:", error);
//       setMensajeToxicidad("Hubo un error al verificar el comentario.");
//       return false;
//     }
//   };
//   const manejarComentario = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Enviando comentario...");
//     if (!isAuthenticated) {
//       setMensajeError("Debes iniciar sesión para comentar.");
//       return;
//     }
//     if (!nuevoComentario.trim()) return;
//     const esValido = await verificarToxicidad(nuevoComentario);
//     if (!esValido) return;
//     const comentarioData = {
//       text: nuevoComentario,
//       username: user?.name || "usuario_desconocido",
//     };
//     try {
//       const response = await axios.post(`${API_BACK}/api/comments/${magazineId}`, comentarioData);
//       console.log("Comentario guardado:", response.data);
//       setComentarios((prev) => [...prev, response.data]);
//       socket.emit("newComment", response.data);
//       setNuevoComentario("");
//       setMensajeError("");
//       setMensajeToxicidad("");
//     } catch (error) {
//       console.error("Error al enviar comentario:", error);
//       setMensajeError("Hubo un problema al enviar tu comentario.");
//     }
//   };
//   return (
//     <div className="w-full max-w-[600px] md:w-[350px] lg:max-w-[400px] bg-white rounded-3xl shadow-xl overflow-hidden border border-indigo-50">
//       <div className="flex flex-col h-[calc(100vh-2rem)] md:h-[800px]">
//         <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500">
//           <h2 className="text-xl font-semibold text-white flex items-center gap-2">Comentarios</h2>
//         </div>
//         <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
//           {comentarios.length > 0 ? (
//             comentarios.map((comentario) => (
//               <div key={comentario.id} className="group animate-fade-in">
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-1 min-w-0">
//                     <div className="bg-indigo-50/50 rounded-2xl p-4 hover:bg-indigo-50 transition-colors">
//                       <div className="flex items-center justify-between">
//                         <p className="font-semibold text-gray-900">@{comentario.username}</p>
//                       </div>
//                       <p className="mt-2 text-gray-700 leading-relaxed">{comentario.text}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center">No hay comentarios aún.</p>
//           )}
//         </div>
//         <div className="p-4 bg-white border-t border-indigo-100">
//           {mensajeError && <p className="text-red-500 text-sm mb-2">{mensajeError}</p>}
//           {mensajeToxicidad && <p className="text-yellow-500 text-sm mb-2">{mensajeToxicidad}</p>}
//           <form onSubmit={manejarComentario} className="relative">
//             <input
//               type="text"
//               value={nuevoComentario}
//               onChange={(e) => setNuevoComentario(e.target.value)}
//               placeholder={isAuthenticated ? "Añadir un comentario..." : "Inicia sesión para comentar"}
//               disabled={!isAuthenticated}
//               className="w-full px-4 py-3 pr-12 bg-indigo-50/50 border-2 border-transparent rounded-xl focus:outline-none focus:border-indigo-500/20 focus:bg-white transition-all placeholder:text-gray-400"
//             />
//             <button
//               type="submit"
//               disabled={!isAuthenticated}
//               className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
//             >
//               Enviar
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";
// import { useAuth } from "@/modules/auth/shared/context/Auth.context";
// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface Comentario {
//   id: string;
//   username: string;
//   text: string;
//   likes: number;
//   isLiked: boolean;
// }

// interface CommentPanelProps {
//   magazineId: string;
// }

// const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3003");

// export function CommentPanel({ magazineId }: CommentPanelProps) {
//   const { user, isAuthenticated } = useAuth();
//   const [comentarios, setComentarios] = useState<Comentario[]>([]);
//   const [nuevoComentario, setNuevoComentario] = useState("");
//   const [mensajeError, setMensajeError] = useState("");
//   const [mensajeToxicidad, setMensajeToxicidad] = useState("");

//   useEffect(() => {
//     if (!magazineId) return;

//     // Función para cargar los comentarios iniciales
//     const fetchComentarios = async () => {
//       try {
//         const response = await axios.get<Comentario[]>(`${API_BACK}/api/comments/${magazineId}`);
//         setComentarios(response.data);
//       } catch (error) {
//         console.error("Error cargando comentarios:", error);
//       }
//     };
//     fetchComentarios();

//     // Conexión al socket y escucha de nuevos comentarios
//     socket.emit("joinRoom", magazineId);
//     socket.on("newComment", (newComment: Comentario) => {
//       setComentarios((prevComentarios) => {
//         if (!prevComentarios.some((comment) => comment.id === newComment.id)) {
//           return [...prevComentarios, newComment];
//         }
//         return prevComentarios;
//       });
//     });

//     return () => {
//       socket.off("newComment");
//     };
//   }, [magazineId]);

//   // Función para verificar la toxicidad de un comentario
//   const verificarToxicidad = async (comentarioTexto: string) => {
//     try {
//       const response = await axios.post(`${API_BACK}/perspective/analyze`, {
//         text: comentarioTexto,
//       });
//       const toxicityMessage = response.data.toxicityMessage;

//       if (toxicityMessage === "Este comentario es tóxico.") {
//         setMensajeToxicidad(toxicityMessage);
//         return false;
//       } else if (toxicityMessage === "Este comentario podría ser tóxico. ¿Estás seguro?") {
//         setMensajeToxicidad(toxicityMessage);
//         return true;
//       }

//       setMensajeToxicidad("");
//       return true;
//     } catch (error) {
//       console.error("Error al verificar toxicidad:", error);
//       setMensajeToxicidad("Hubo un error al verificar el comentario.");
//       return false;
//     }
//   };

//   const manejarComentario = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!isAuthenticated) {
//       setMensajeError("Debes iniciar sesión para comentar.");
//       return;
//     }

//     if (!nuevoComentario.trim()) return;

//     const esValido = await verificarToxicidad(nuevoComentario);
//     if (!esValido) return;

//     const comentarioData = {
//       text: nuevoComentario,
//       username: user?.name || "usuario_desconocido",
//     };

//     try {
//       const response = await axios.post(`${API_BACK}/api/comments/${magazineId}`, comentarioData);
//       setComentarios((prev) => [...prev, response.data]);
//       socket.emit("newComment", response.data);
//       setNuevoComentario("");
//       setMensajeError("");
//       setMensajeToxicidad("");
//     } catch (error) {
//       console.error("Error al enviar comentario:", error);
//       setMensajeError("Hubo un problema al enviar tu comentario.");
//     }
//   };

//   return (
//     <div className="w-full max-w-[600px] md:w-[350px] lg:max-w-[400px] bg-white rounded-3xl shadow-xl overflow-hidden border border-indigo-50">
//       <div className="flex flex-col h-[calc(100vh-2rem)] md:h-[800px]">
//         <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500">
//           <h2 className="text-xl font-semibold text-white flex items-center gap-2">Comentarios</h2>
//         </div>
//         <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
//           {comentarios.length > 0 ? (
//             comentarios.map((comentario) => (
//               <div key={comentario.id} className="group animate-fade-in">
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-1 min-w-0">
//                     <div className="bg-indigo-50/50 rounded-2xl p-4 hover:bg-indigo-50 transition-colors">
//                       <div className="flex items-center justify-between">
//                         <p className="font-semibold text-gray-900">@{comentario.username}</p>
//                       </div>
//                       <p className="mt-2 text-gray-700 leading-relaxed">{comentario.text}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center">No hay comentarios aún.</p>
//           )}
//         </div>
//         <div className="p-4 bg-white border-t border-indigo-100">
//           {mensajeError && <p className="text-red-500 text-sm mb-2">{mensajeError}</p>}
//           {mensajeToxicidad && <p className="text-yellow-500 text-sm mb-2">{mensajeToxicidad}</p>}
//           <form onSubmit={manejarComentario} className="relative">
//             <input
//               type="text"
//               value={nuevoComentario}
//               onChange={(e) => setNuevoComentario(e.target.value)}
//               placeholder={isAuthenticated ? "Añadir un comentario..." : "Inicia sesión para comentar"}
//               disabled={!isAuthenticated}
//               className="w-full px-4 py-3 pr-12 bg-indigo-50/50 border-2 border-transparent rounded-xl focus:outline-none focus:border-indigo-500/20 focus:bg-white transition-all placeholder:text-gray-400"
//             />
//             <button
//               type="submit"
//               disabled={!isAuthenticated}
//               className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
//             >
//               Enviar
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }







"use client";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";

interface Comentario {
  id: string;
  username: string;
  text: string;
  likes: number;
  isLiked: boolean;
}

interface CommentPanelProps {
  magazineId: string;
}

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3003");

export function CommentPanel({ magazineId }: CommentPanelProps) {
  const { user, isAuthenticated } = useAuth();
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeToxicidad, setMensajeToxicidad] = useState("");

  useEffect(() => {
    if (!magazineId) return;

    // Función para cargar los comentarios iniciales
    const fetchComentarios = async () => {
      try {
        // Especificamos que esperamos un array de Comentario[]
        const response = await axios.get<Comentario[]>(`${API_BACK}/api/comments/${magazineId}`);
        setComentarios(response.data); // Ahora response.data es de tipo Comentario[]
      } catch (error) {
        console.error("Error cargando comentarios:", error);
      }
    };
    fetchComentarios();

    // Conexión al socket y escucha de nuevos comentarios
    socket.emit("joinRoom", magazineId);
    socket.on("newComment", (newComment: Comentario) => {
      setComentarios((prevComentarios) => {
        if (!prevComentarios.some((comment) => comment.id === newComment.id)) {
          return [...prevComentarios, newComment];
        }
        return prevComentarios;
      });
    });

    return () => {
      socket.off("newComment");
    };
  }, [magazineId]);

  // Función para verificar la toxicidad de un comentario
  const verificarToxicidad = async (comentarioTexto: string) => {
    try {
      const response = await axios.post<{ toxicityMessage: string }>(`${API_BACK}/perspective/analyze`, {
        text: comentarioTexto,
      });
      const toxicityMessage = response.data.toxicityMessage;

      if (toxicityMessage === "Este comentario es tóxico.") {
        setMensajeToxicidad(toxicityMessage);
        return false;
      } else if (toxicityMessage === "Este comentario podría ser tóxico. ¿Estás seguro?") {
        setMensajeToxicidad(toxicityMessage);
        return true;
      }

      setMensajeToxicidad("");
      return true;
    } catch (error) {
      console.error("Error al verificar toxicidad:", error);
      setMensajeToxicidad("Hubo un error al verificar el comentario.");
      return false;
    }
  };

  const manejarComentario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setMensajeError("Debes iniciar sesión para comentar.");
      return;
    }

    if (!nuevoComentario.trim()) return;

    const esValido = await verificarToxicidad(nuevoComentario);
    if (!esValido) return;

    const comentarioData = {
      text: nuevoComentario,
      username: user?.name || "usuario_desconocido",
    };

    try {
      const response = await axios.post<Comentario>(`${API_BACK}/api/comments/${magazineId}`, comentarioData);
      // Aquí también aseguramos que el tipo de response.data es Comentario
      setComentarios((prev) => [...prev, response.data]);
      socket.emit("newComment", response.data);
      setNuevoComentario("");
      setMensajeError("");
      setMensajeToxicidad("");
    } catch (error) {
      console.error("Error al enviar comentario:", error);
      setMensajeError("Hubo un problema al enviar tu comentario.");
    }
  };

  return (
    <div className="w-full max-w-[600px] md:w-[350px] lg:max-w-[400px] bg-white rounded-3xl shadow-xl overflow-hidden border border-indigo-50">
      <div className="flex flex-col h-[calc(100vh-2rem)] md:h-[800px]">
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">Comentarios</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {comentarios.length > 0 ? (
            comentarios.map((comentario) => (
              <div key={comentario.id} className="group animate-fade-in">
                <div className="flex items-start space-x-4">
                  <div className="flex-1 min-w-0">
                    <div className="bg-indigo-50/50 rounded-2xl p-4 hover:bg-indigo-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900">@{comentario.username}</p>
                      </div>
                      <p className="mt-2 text-gray-700 leading-relaxed">{comentario.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No hay comentarios aún.</p>
          )}
        </div>
        <div className="p-4 bg-white border-t border-indigo-100">
          {mensajeError && <p className="text-red-500 text-sm mb-2">{mensajeError}</p>}
          {mensajeToxicidad && <p className="text-yellow-500 text-sm mb-2">{mensajeToxicidad}</p>}
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
