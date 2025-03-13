import BackButton from "@/shared/components/buttons/BackButton.component";
import CartView from "./components/Cart.view";
import ProductsComponent from "./components/Products.component";
import ProtectedRoute from "@/shared/helpers/ProtectedRoute";


export default function Cart() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-300 pb-2">
        <BackButton tab="Producto" />
        <div className="relative py-14">
          {/* 🎨 Fondo con desenfoque (ahora correctamente detrás) */}
          <div
            className="absolute inset-0 bg-repeat blur-xl "
            style={{
              backgroundImage: "url('/images/textures/8.jpg')",
              backgroundSize: "1000px", // Ajusta el tamaño del mosaico a tu gusto
              backgroundPosition: "center",
              backgroundRepeat: "repeat", // Hace que la imagen se repita en mosaico
              filter: "blur(10px)", // Aplica el desenfoque
            }}
          />
          <div className="absolute inset-0 bg-white/30"></div>
          <div className="max-w-[1000px] mx-auto">
            <div className="text-gray-900 my-8 relative z-[30]">
              <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
                <CartView />
              </div>
            </div>
            <div className="relative z-10">
              <ProductsComponent />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
