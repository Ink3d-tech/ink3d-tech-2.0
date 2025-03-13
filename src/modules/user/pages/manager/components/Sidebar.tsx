import { Package, ShoppingCart, Users, Boxes, Newspaper, List, X, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, menuOpen, setMenuOpen }: SidebarProps) {
  const tabsGeneral = [
    { icon: <Ticket />, name: "Lista de descuentos", id: "overview" },
    { icon: <Package />, name: "Productos", id: "products" },
    { icon: <ShoppingCart />, name: "Pedidos", id: "orders" },
    { icon: <Users />, name: "Usuarios", id: "users" },
  ];

  const tabsBusiness = [
    { icon: <Boxes />, name: "Stock", id: "invent" },
    { icon: <Newspaper />, name: "Magazine", id: "forum" },
    // { icon: <ShieldCheck />, name: "Seguridad", id: "settings" },
  ];

  return (
    <>
      {/* Botón para abrir/cerrar menú en móviles */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg transition-transform active:scale-95"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <List size={24} />}
      </button>

      {/* Sidebar fijo en pantalla sin encimarse con el contenido */}
      <nav
        className={`fixed top-0 left-0 bg-black px-6 pt-3 border-r border-black transition-transform h-screen w-3/4 sm:w-1/2 md:w-80 overflow-y-auto z-40
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
                        <div className="flex-1 flex justify-center md:justify-start pb-12 px-2">
                    <Link href="/home">
                        <Image
                            src="/LogoInk3d.webp"
                            alt="Logo Ink3d"
                            width={130}
                            height={130}
                            className="object-contain w-auto h-auto max-w-[100px]"
                        />
                    </Link>
                </div>
        <h2 className="text-gray-400 text-sm uppercase mb-2">General</h2>
        {tabsGeneral.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center px-4 py-3 rounded-lg w-full transition-all 
            ${activeTab === tab.id ? "bg-black text-white border-l-4 border-gray-400" : "bg-black text-gray-300 hover:bg-gray-800"}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="mr-3">{tab.icon}</span> {tab.name}
          </button>
        ))}

        <h2 className="text-gray-400 text-sm uppercase mt-6 mb-2">Mi Negocio</h2>
        {tabsBusiness.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center px-4 py-3 rounded-lg w-full transition-all 
            ${activeTab === tab.id ? "bg-black text-white border-l-4 border-gray-400" : "bg-black text-gray-300 hover:bg-gray-800"}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="mr-3">{tab.icon}</span> {tab.name}
          </button>
        ))}
      </nav>
    </>
  );
}
