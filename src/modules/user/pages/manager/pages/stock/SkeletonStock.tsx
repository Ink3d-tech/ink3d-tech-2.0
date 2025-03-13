

export default function SkeletonStock() {
  return (
    <div className="min-h-screen bg-white p-6 animate-pulse">
      <h2 className="text-3xl font-bold text-gray-300 text-center mb-6">📦 Cargando Movimientos de Stock...</h2>
      
      {/* Barra de búsqueda */}
      <div className="mb-4 flex items-center bg-gray-100 p-2 rounded-md shadow-sm">
        <div className="bg-gray-300 w-5 h-5 mr-2 rounded" />
        <div className="w-full h-5 bg-gray-300 rounded" />
      </div>
      
      {/* Movimientos simulados */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-semibold text-gray-400">👕 Talla: ...</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  {[...Array(20)].map((_, i) => (
                    <th key={i} className="border p-2 text-left">
                      <div className="w-24 h-4 bg-gray-300 rounded"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(20)].map((_, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    {[...Array(10)].map((_, j) => (
                      <td key={j} className="border p-2">
                        <div className="w-16 h-4 bg-gray-300 rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}