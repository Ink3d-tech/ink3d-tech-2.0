"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("historia");

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/bandera1.jpg"
          alt="Fondo"
          layout="fill"
          objectFit="cover"
          className="opacity-100"
        />
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 flex items-center max-w-6xl mx-auto p-6 bg-black bg-opacity-50 rounded-lg">
        {/* Imagen a la izquierda */}
        <div className="w-1/2 flex justify-center">
          <Image
            src="/about10.png"
            alt="Imagen principal"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Contenido a la derecha */}
        <div className="w-1/2 p-6">
          {/* Botones de navegación */}
          <div className="flex justify-between mb-6">
            <button
              className={`text-lg font-bold px-4 py-2 rounded-lg transition ${
                activeTab === "historia" ? "text-red-600 underline" : "text-white"
              }`}
              onClick={() => setActiveTab("historia")}
            >
              Nuestra Historia
            </button>
            <button
              className={`text-lg font-bold px-4 py-2 rounded-lg transition ${
                activeTab === "contacto" ? "text-red-600 underline" : "text-white"
              }`}
              onClick={() => setActiveTab("contacto")}
            >
              Contáctanos
            </button>
            <button
              className={`text-lg font-bold px-4 py-2 rounded-lg transition ${
                activeTab === "trabajo" ? "text-red-600 underline" : "text-white"
              }`}
              onClick={() => setActiveTab("trabajo")}
            >
              Trabaja con Nosotros
            </button>
          </div>

          {/* Contenido dinámico basado en la pestaña activa */}
          {activeTab === "historia" && (
            <motion.div
              key="historia"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-red-600 mb-10"></h1>
              <p className="text-lg">
                INK3D es una marca argentina que fusiona el street style, el motorsport y el asian style en una propuesta única.
                Más que una marca, es un movimiento que rompe límites y redefine la expresión urbana con actitud y pasión.
              </p>
            </motion.div>
          )}

          {activeTab === "contacto" && (
            <motion.div
              key="contacto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-red-600 mb-10"></h1>
              <p className="text-lg">📧 Email: contacto@ink3d.com</p>
              <p className="text-lg">📍 Ubicación: Buenos Aires, Argentina</p>
              <p className="text-lg">📞 Teléfono: +54 11 1234-5678</p>
              {/* <Maps/> */}
            </motion.div>
          )}

          {activeTab === "trabajo" && (
            <motion.div
              key="trabajo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-red-600 mb-10"></h1>
              <p className="text-lg">Si te apasiona la moda y la creatividad, queremos conocerte.</p>
              <p className="text-lg">Envíanos tu CV a: jobs@ink3d.com</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}