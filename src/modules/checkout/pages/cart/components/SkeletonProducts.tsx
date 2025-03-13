import { ArrowRight } from "lucide-react";

const SkeletonProducts = () => {
    return (
      <section className="bg-gray-50 py-12 z-0">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Skeletons de carga */}
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="w-full h-64 bg-gray-200 animate-pulse rounded-lg">
                {/* Skeleton para la imagen del producto */}
                <div className="w-full h-full bg-gray-300 animate-pulse rounded-t-lg"></div>
                {/* Skeleton para la descripción */}
                <div className="p-3">
                  <div className="w-3/4 h-5 bg-gray-300 animate-pulse mb-2"></div>
                  <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4"></div>
                  <div className="w-1/3 h-6 bg-gray-300 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/products";
              }}
              type="submit"
              className="w-60 bg-black text-white py-3 rounded-xl font-semibold 
                      hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200
                      flex items-center justify-center gap-2"
            >
              Ver más
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default SkeletonProducts;
  