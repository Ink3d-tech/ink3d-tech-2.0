const SkeletonTable = () => {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Usuario</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Rol</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">Órdenes</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, index) => (
              <tr key={index} className="border-b animate-pulse">
                <td className="py-4 px-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default SkeletonTable;