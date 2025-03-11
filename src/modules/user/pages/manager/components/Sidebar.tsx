import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Boxes, Newspaper, ShieldCheck, List, X } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, menuOpen, setMenuOpen }: SidebarProps) {
  const tabsGeneral = [
    { icon: <LayoutDashboard />, name: "Panel de Control", id: "overview" },
    { icon: <Package />, name: "Crear Productos", id: "products" },
    { icon: <ShoppingCart />, name: "Pedidos", id: "orders" },
    { icon: <Users />, name: "Usuarios", id: "users" },
  ];

  const tabsBusiness = [
    { icon: <BarChart3 />, name: "Finanzas", id: "finance" },
    { icon: <Boxes />, name: "Stock", id: "invent" },
    { icon: <Newspaper />, name: "Magazine", id: "forum" },
    { icon: <ShieldCheck />, name: "Seguridad", id: "settings" },
  ];

  return (
    <nav className={`fixed md:relative bg-black p-6 border-r border-gray-800 transition-transform
    ${menuOpen ? "translate-x-0 w-3/4 sm:w-1/2 md:w-80" : "-translate-x-full"} 
    md:translate-x-0 md:w-80 md:block h-screen overflow-y-auto`}>
      <button
        className="md:hidden fixed top-25 left-4 z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg transition-transform active:scale-95"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <List size={24} />}
      </button>
      
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
  );
}
