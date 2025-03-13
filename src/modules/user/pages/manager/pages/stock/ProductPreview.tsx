// import Image from "next/image";
// import { Layers, Package } from "lucide-react";

// interface ProductPreviewProps {
//   selectedMovement: any;
// }

// export default function ProductPreview({ selectedMovement }: ProductPreviewProps) {
//   if (!selectedMovement || !selectedMovement.product) return null;

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-80 mx-auto">
//       <h3 className="text-lg font-semibold text-gray-800 text-center">
//         {selectedMovement.product.name}
//       </h3>

//       <div className="relative w-full h-80 rounded-md overflow-hidden my-3">
//         {selectedMovement.product.image.length > 0 && (
//           <Image
//             src={selectedMovement.product.image[0]}
//             alt={selectedMovement.product.name}
//             layout="fill"
//             objectFit="cover"
//             className="rounded-md"
//           />
//         )}
//       </div>

//       <p className="text-gray-500 text-sm text-center">
//         {selectedMovement.product.description}
//       </p>
//       <p className="text-teal-600 text-lg font-bold text-center mt-1">
//         ${selectedMovement.product.price}
//       </p>

//       {/* Datos de stock */}
//       <div className="mt-4 space-y-2">
//         <div className="flex items-center text-gray-600 text-sm">
//           <Layers className="w-4 h-4 text-teal-500 mr-2" />
//           <span>Stock Inicial: <strong>{selectedMovement.stockInicial}</strong></span>
//         </div>
//         <div className="flex items-center text-gray-600 text-sm">
//           <Package className="w-4 h-4 text-blue-500 mr-2" />
//           <span>Productos Vendidos: <strong>{selectedMovement.vendidos}</strong></span>
//         </div>
//         <div className="flex items-center text-gray-600 text-sm">
//           <Layers className="w-4 h-4 text-teal-500 mr-2" />
//           <span>Stock Actual: <strong>{selectedMovement.stockActual}</strong></span>
//         </div>
//       </div>
//     </div>
//   );
// }



import Image from "next/image";
import { Layers, Package } from "lucide-react";
import { StockMovement } from "./types"; // Asegúrate de importar el tipo correcto

interface ProductPreviewProps {
  selectedMovement: StockMovement | null;
}

export default function ProductPreview({ selectedMovement }: ProductPreviewProps) {
  if (!selectedMovement || !selectedMovement.product) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-80 mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 text-center">
        {selectedMovement.product.name}
      </h3>

      <div className="relative w-full h-80 rounded-md overflow-hidden my-3">
        {selectedMovement.product.image.length > 0 && (
          <Image
            src={selectedMovement.product.image[0]}
            alt={selectedMovement.product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        )}
      </div>

      <p className="text-gray-500 text-sm text-center">
        {selectedMovement.product.description}
      </p>
      <p className="text-teal-600 text-lg font-bold text-center mt-1">
        ${selectedMovement.product.price}
      </p>

      {/* Datos de stock */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600 text-sm">
          <Layers className="w-4 h-4 text-teal-500 mr-2" />
          <span>Stock Inicial: <strong>{selectedMovement.stockInicial}</strong></span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Package className="w-4 h-4 text-blue-500 mr-2" />
          <span>Productos Vendidos: <strong>{selectedMovement.vendidos}</strong></span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Layers className="w-4 h-4 text-teal-500 mr-2" />
          <span>Stock Actual: <strong>{selectedMovement.stockActual}</strong></span>
        </div>
      </div>
    </div>
  );
}
