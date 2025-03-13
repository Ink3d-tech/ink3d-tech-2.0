const SkeletonDiscountsList = () => {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <header className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg animate-pulse">
          <div className="h-6 w-48 bg-gray-300 rounded"></div>
        </header>
  
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 animate-pulse">
          <div className="h-5 w-2/3 bg-gray-300 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
  
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 animate-pulse">
          <div className="h-5 w-2/3 bg-gray-300 rounded mb-4"></div>
          <div className="flex gap-4">
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <div className="h-10 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md border-l-4 border-gray-300 p-8 animate-pulse">
              <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-300 rounded mb-4"></div>
              <div className="h-10 bg-gray-300 rounded w-24 mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SkeletonDiscountsList;