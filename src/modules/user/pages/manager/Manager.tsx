"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProtectedRouteAdmin from "@/shared/helpers/ProtectedRouteAdmin";

export default function Manager() {
  const [activeTab, setActiveTab] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ProtectedRouteAdmin>
      <div className="flex bg-white text-black min-h-screen">
        {/* Sidebar fijo sin superponer el contenido */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        
        {/* Espacio reservado para el Sidebar en pantallas grandes */}
        <div className="hidden md:block w-80"></div>

        {/* Contenido principal que ocupa el resto del espacio */}
        <main className="flex-1 p-6 overflow-auto">
          <MainContent activeTab={activeTab} />
        </main>
      </div>
    </ProtectedRouteAdmin>
  );
}
