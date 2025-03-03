import BackButton from "@/shared/components/buttons/BackButton.component";
import CartView from "./components/Cart.view";
import ProductsComponent from "./components/Products.component";
import ProtectedRoute from "@/shared/helpers/ProtectedRoute";

export default function Cart() {
  return (
    <ProtectedRoute title="Debes inciar sesion o registrarte para ingresar al carrito">
      <div className="min-h-screen bg-gray-300 pb-2">
        <BackButton tab="Producto" />
        <div className="max-w-[1000px] mx-auto">
          <div className="text-gray-900 my-8 relative">
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
              <CartView />
            </div>
          </div>
          <ProductsComponent />
        </div>
      </div>
    </ProtectedRoute>
  );
}
