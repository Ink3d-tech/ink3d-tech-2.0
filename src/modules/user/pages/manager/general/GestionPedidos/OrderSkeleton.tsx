const SkeletonOrdersList = () => {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Lista de Órdenes</h1>
        <ul className="space-y-4">
          {[...Array(10)].map((_, index) => (
            <li key={index} className="p-4 bg-white shadow rounded-lg animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SkeletonOrdersList;
  