import ProtectedRoute from "@/shared/helpers/ProtectedRoute";

export default function CartSkeleton() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-300 pb-2">
        <div className="relative py-14">
          <div className="absolute inset-0 bg-repeat blur-xl" style={{
            backgroundImage: "url('/images/textures/8.jpg')",
            backgroundSize: "1000px", // Ajusta el tamaño del mosaico a tu gusto
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            filter: "blur(10px)",
          }} />
          <div className="absolute inset-0 bg-white/30"></div>
          <div className="max-w-[1000px] mx-auto">
            <div className="text-gray-900 my-8 relative z-[10]">
              <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
                {/* Skeleton de vista del carrito */}
                <div className="w-full lg:w-[70%] min-h-[100px] bg-gray-300 animate-pulse rounded-md"></div>
              </div>
            </div>
            <div className="relative z-10">
              {/* Skeleton de productos */}
              <div className="w-full lg:w-[70%] min-h-[200px] bg-gray-300 animate-pulse rounded-md mb-6"></div>
              {/* Skeleton de resumen de carrito */}
              <div className="w-full lg:w-[30%] sticky bottom-0 bg-gray-300 animate-pulse rounded-md h-[200px]"></div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
