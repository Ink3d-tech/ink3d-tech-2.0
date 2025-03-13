export default function CarouselSkeleton() {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-9xl">
          <div className="relative flex items-center justify-center space-x-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center justify-center cursor-pointer w-[300px] h-[500px] bg-gray-300 rounded-lg shadow-lg animate-pulse"
              >
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent p-4">
                  <div className="h-6 bg-gray-400 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
  
          <button className="custom-prev absolute left-4"></button>
          <button className="custom-next absolute right-4"></button>
        </div>
      </div>
    );
  }