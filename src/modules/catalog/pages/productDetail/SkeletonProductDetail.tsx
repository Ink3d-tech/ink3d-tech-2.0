import React from 'react';

const SkeletonProductDetail = () => {
  return (
    <div className="relative py-14">
      {/* Fondo con desenfoque */}
      <div
        className="absolute inset-0 bg-repeat blur-xl"
        style={{
          backgroundImage: "url('/images/textures/8.jpg')",
          backgroundSize: "1000px",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          filter: "blur(10px)",
        }}
      />
      <div className="absolute inset-0 bg-white/30"></div>

      <div className="flex items-center justify-center py-10 pb-2">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-6xl w-full flex flex-col md:flex-row gap-10 relative">
          {/* Sin stock */}
          <div className="absolute top-3 left-0 bg-gray-300 text-transparent text-xs font-semibold uppercase px-4 py-1 rounded-br-lg rounded-tr-lg shadow-md"></div>

          <button className="absolute top-4 right-4 text-gray-500 hover:text-black transition">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          </button>

          {/* Notificación */}
          <div className="absolute -top-9 right-0 bg-black text-white text-sm px-3 py-1 rounded-md shadow-lg animate-fade-in"></div>

          <div className="flex flex-col items-center gap-4 w-full md:w-3/5">
            {/* Imagen principal */}
            <div className="rounded-lg bg-gray-300 w-[500px] h-[500px]"></div>

            {/* Imágenes de vista previa */}
            <div className="flex gap-3 overflow-x-auto">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="w-24 h-24 bg-gray-300 rounded-md"></div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between flex-grow gap-2 w-full md:w-2/5">
            {/* Nombre del producto */}
            <div className="h-8 bg-gray-300 w-3/4 rounded-md"></div>

            {/* Estilo del producto */}
            <div className="flex gap-2">
              <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
            </div>

            {/* Descripción */}
            <div className="h-20 bg-gray-300 rounded-md mt-2"></div>

            {/* Precio */}
            <div className="h-8 bg-gray-300 rounded-md mt-2 w-1/4"></div>

            {/* Tallas */}
            <div>
              <p className="h-4 bg-gray-300 rounded-md w-1/4 mb-2"></p>
              <div className="flex gap-3">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <div key={size} className="px-4 py-2 border rounded-md bg-gray-300 w-16 h-8"></div>
                ))}
              </div>
            </div>

            {/* Cuidado del producto */}
            <div className="bg-gray-100 p-4 rounded-lg mt-3">
              <div className="h-6 bg-gray-300 w-3/4 rounded-md"></div>
              <div className="h-4 bg-gray-300 w-1/2 rounded-md mt-2"></div>
            </div>

            {/* Botón de agregar al carrito */}
            <div className="w-36 h-12 bg-gray-300 rounded-lg mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductDetail;
