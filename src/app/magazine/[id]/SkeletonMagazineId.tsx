

const SkeletonMagazineId = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-screen-xl w-full mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar de productos */}
          <aside className="hidden lg:block lg:col-span-2 xl:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-indigo-50">
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                <div className="flex items-center gap-1">
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                  <div className="h-4 bg-gray-300 rounded w-4"></div>
                </div>
              </div>
              {/* Skeleton de ProductCard */}
              <div className="space-y-4">
                <div className="h-20 bg-gray-300 rounded-lg"></div>
                <div className="h-20 bg-gray-300 rounded-lg"></div>
                <div className="h-20 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </aside>

          {/* Contenido del artículo */}
          <main className="lg:col-span-6 xl:col-span-6">
            <article className="rounded-3xl shadow-xl border border-indigo-50 overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <div className="bg-gray-300 w-full h-full"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h1 className="absolute bottom-0 left-0 right-0 text-4xl md:text-5xl font-bold text-white p-8">
                  <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                </h1>
              </div>
              <div className="p-8">
                <p className="text-gray-600"></p>
                <div className="h-4 bg-gray-300 rounded w-32"></div>
                <div className="prose max-w-none">
                  <div className="h-48 bg-gray-300 rounded-lg mt-4"></div>
                  <div className="h-48 bg-gray-300 rounded-lg mt-4"></div>
                </div>

                {/* Botón de comentarios */}
                <div className="relative mt-4">
                  <button className="lg:hidden bg-indigo-600 text-white p-3 rounded-full shadow-lg flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </button>

                  {/* Skeleton de comentarios */}
                  <div className="mt-4 w-full h-auto overflow-hidden">
                    <div className="h-24 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="h-24 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="h-24 bg-gray-300 rounded-lg mb-4"></div>
                  </div>
                </div>
              </div>
            </article>
          </main>

          {/* Panel de comentarios para pantallas grandes */}
          <aside className="hidden lg:block lg:col-span-1 xl:col-span-1">
            <div className="h-full bg-gray-300 rounded-lg"></div>
          </aside>
        </div>

        {/* Skeleton de ProductCard2 - Visible en pantallas pequeñas */}
        <div className="lg:hidden mt-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-indigo-50">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 bg-gray-300 rounded w-1/3"></div>
              <div className="flex items-center gap-1">
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-4 bg-gray-300 rounded w-4"></div>
              </div>
            </div>
            {/* Skeleton de ProductCard2 */}
            <div className="space-y-4">
              <div className="h-20 bg-gray-300 rounded-lg"></div>
              <div className="h-20 bg-gray-300 rounded-lg"></div>
              <div className="h-20 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonMagazineId;
