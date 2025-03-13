export default function MagazineSkeleton() {
    return (
      <div className="min-h-screen bg-white p-8">
        {/* Navbar Skeleton */}
        <nav className="bg-white text-black shadow-md z-50 p-4">
          <div className="container mx-auto flex justify-start items-center">
            <ul className="flex gap-6">
              {[...Array(4)].map((_, index) => (
                <li key={index} className="h-4 bg-gray-300 rounded w-16 animate-pulse"></li>
              ))}
            </ul>
          </div>
        </nav>
        
        {/* Title Skeleton */}
        <div className="text-center py-5 mt-20 mb-10">
          <div className="h-10 bg-gray-300 rounded w-1/2 mx-auto animate-pulse"></div>
        </div>
  
        {/* Articles Grid Skeleton */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
              <div className="w-full h-64 bg-gray-300"></div>
              <div className="p-5">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  