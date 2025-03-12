// "use client";

// import React, { useState } from "react";
// import { X } from "lucide-react";

// const discountOptions = ["5%", "10%", "15%", "20%", "¡Inténtalo de nuevo!", "30%"];

// export default function DiscountWheel({ showModal, setShowModal }) {
//   const [spinning, setSpinning] = useState(false);
//   const [result, setResult] = useState(null);

//   const spinWheel = () => {
//     setSpinning(true);
//     setTimeout(() => {
//       const randomDiscount = discountOptions[Math.floor(Math.random() * discountOptions.length)];
//       setResult(randomDiscount);
//       setSpinning(false);
//     }, 2000);
//   };

//   if (!showModal) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
//       <div className="bg-gray-900 rounded-2xl shadow-xl max-w-md w-full p-6 relative text-center">
//         <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
//           <X className="h-6 w-6" />
//         </button>
//         <h2 className="text-2xl font-bold text-white mb-4">🎡 Ruleta de Descuentos</h2>
//         <button onClick={spinWheel} disabled={spinning} className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition">
//           {spinning ? "Girando..." : "¡Gira la Ruleta!"}
//         </button>
//         {result && <p className="text-lg text-yellow-500 mt-4">{result}</p>}
//       </div>
//     </div>
//   );
// }
