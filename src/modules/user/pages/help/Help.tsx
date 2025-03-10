"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const faqs = [
  { question: "¿Cómo saber mi talla?", answer: "Consulta nuestra guía de tallas en la página de cada producto." },
  { question: "¿Cuánto tarda el envío?", answer: "El tiempo de entrega varía según tu ubicación, de 3 a 7 días hábiles." },
  { question: "¿Puedo cambiar o devolver un producto?", answer: "Sí, tienes hasta 30 días para realizar cambios o devoluciones." },
  { question: "¿Qué métodos de pago aceptan?", answer: "Aceptamos tarjetas de crédito, débito, PayPal y pagos en efectivo." }
];

export default function HelpSection() {
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-white text-black flex flex-col items-center">
      {/* Título */}
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">Centro de Ayuda</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar en la ayuda..."
        className="mb-10 p-3 border-2 border-red-600 rounded text-red-600 w-3/4 text-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Contenedor principal */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
        {/* Columnas de tarjetas */}
        <div className="flex flex-col gap-6">
          {filteredFaqs.slice(0, 2).map((faq, index) => (
            <motion.div key={index} className="w-64 h-40" whileHover={{ scale: 1.1 }}>
              <div className="p-4 rounded-lg shadow-lg flex flex-col justify-center items-center text-center bg-white text-black border border-gray-300">
                <h3 className="text-lg font-bold">{faq.question}</h3>
                <p className="mt-2 text-sm">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Imagen principal */}
        <div className="w-80 md:w-96 flex justify-center items-center">
          <Image src="/asia8.png" alt="Imagen de ayuda" width={350} height={250} className="rounded-lg" />
        </div>

        {/* Columnas de tarjetas */}
        <div className="flex flex-col gap-6">
          {filteredFaqs.slice(2, 4).map((faq, index) => (
            <motion.div key={index} className="w-64 h-40" whileHover={{ scale: 1.1 }}>
              <div className="p-4 rounded-lg shadow-lg flex flex-col justify-center items-center text-center bg-black text-red-600 border border-red-600">
                <h3 className="text-lg font-bold">{faq.question}</h3>
                <p className="mt-2 text-sm">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
