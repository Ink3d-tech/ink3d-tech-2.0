"use client";

import { useState } from "react";
import LoginView from "@/modules/auth/pages/login/shared/Login.view";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(true); // El modal se abre por defecto

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
          <LoginView />
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    )
  );
}
