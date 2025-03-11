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
      <div className="flex bg-white text-black min-h-screen overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MainContent activeTab={activeTab} />
      </div>
    </ProtectedRouteAdmin>
  );
}