// import FinanzasDashboard from "@/shared/components/finanzas/Finanzas";
import OrderList from "../general/GestionPedidos/OrderList";
import UserManagement from "../general/GestionUsuarios/UserManagement";
import StockMovements from "../pages/stock/Stock";
import FormMagazine from "@/shared/components/formMagazine/FormMagazine";
// import SeguridadConfiguracion from "@/shared/components/seguridadConfiguracion/SeguridadConfiguracion";
import DashboardPanel from "../general/Panel de Control/DashboardPanel";
import { ManagementProductForm } from "../pages/management/Managment";

interface MainContentProps {
  activeTab: string;
}

export default function MainContent({ activeTab }: MainContentProps) {
  return (
    <div className="flex-1 p-6 overflow-auto">
      {activeTab === "overview" && <DashboardPanel />}
      {activeTab === "orders" && <OrderList />}
      {activeTab === "users" && <UserManagement />}
      {activeTab === "invent" && <StockMovements />}
      {/* {activeTab === "finance" && <FinanzasDashboard />} */}
      {activeTab === "products" && <ManagementProductForm />}
      {activeTab === "forum" && <FormMagazine />}
      {/* {activeTab === "settings" && <SeguridadConfiguracion />} */}
    </div>
  );
}

