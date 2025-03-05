"use client"

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('wss://tu-servidor-websocket.com');

export function CommentPanel() {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');

  useEffect(() => {
    setComentarios([
      { id: '1', username: 'emily.tech', text: '¡Esto es exactamente lo que necesitaba!', likes: 24, isLiked: true },
      { id: '2', username: 'alex.developer', text: '¡Gran artículo! Los ejemplos son muy útiles.', likes: 15, isLiked: false },
    ]);

    socket.on('newComment', (comentario) => {
      setComentarios((prev) => [...prev, comentario]);
    });

    return () => {
      socket.off('newComment');
    };
  }, []);
  const manejarComentario = (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    const comentario = {
      id: Date.now().toString(),
      username: 'usuario_invitado',
      text: nuevoComentario,
      likes: 0,
      isLiked: false,
    };

    socket.emit('comment', comentario);
    setNuevoComentario(''); 
  };

  const alternarMeGusta = (idComentario) => {
    setComentarios((prev) => prev.map(comentario => comentario.id === idComentario ? { 
      ...comentario, 
      likes: comentario.isLiked ? comentario.likes - 1 : comentario.likes + 1, 
      isLiked: !comentario.isLiked 
    } : comentario));
  };

  return (
    <div className="w-full md:w-[480px] bg-white rounded-3xl shadow-xl overflow-hidden border border-indigo-50">
      <div className="flex flex-col h-[calc(100vh-2rem)] md:h-[800px]">
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">Comentarios</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {comentarios.map((comentario) => (
            <div key={comentario.id} className="group animate-fade-in">
              <div className="flex items-start space-x-4">
                <div className="flex-1 min-w-0">
                  <div className="bg-indigo-50/50 rounded-2xl p-4 hover:bg-indigo-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">@{comentario.username}</p>
                    </div>
                    <p className="mt-2 text-gray-700 leading-relaxed">{comentario.text}</p>
                    <div className="flex items-center gap-6 mt-3 pt-3 border-t border-indigo-100/30">
                      <button onClick={() => alternarMeGusta(comentario.id)} className={`flex items-center gap-1 text-sm transition-colors ${comentario.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}>
                        ❤ {comentario.likes}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-white border-t border-indigo-100">
          <form onSubmit={manejarComentario} className="relative">
            <input 
              type="text" 
              value={nuevoComentario} 
              onChange={(e) => setNuevoComentario(e.target.value)} 
              placeholder="Añadir un comentario..." 
              className="w-full px-4 py-3 pr-12 bg-indigo-50/50 border-2 border-transparent rounded-xl focus:outline-none focus:border-indigo-500/20 focus:bg-white transition-all placeholder:text-gray-400" 
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
