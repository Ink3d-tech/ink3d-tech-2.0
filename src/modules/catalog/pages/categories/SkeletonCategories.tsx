const SkeletonCategories = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="group relative overflow-hidden animate-pulse">
            {/* Imagen de carga */}
            <div className="relative w-full h-[70vh] bg-gray-700"></div>
            {/* Barra inferior */}
            <div className="bg-black h-10 relative"></div>
          </div>
        ))}
      </div>
    );
};
export default SkeletonCategories