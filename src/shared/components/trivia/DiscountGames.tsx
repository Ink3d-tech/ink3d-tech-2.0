// "use client";

// import React, { useState } from "react";
// import { X, Trophy, RotateCcw } from "lucide-react";
// import DiscountWheel from "./DiscountWheel";
// import DiscountTrivia from "./DiscountTrivia";

// export default function DiscountGames({ showGamesModal, setShowGamesModal }) {
//   const [selectedGame, setSelectedGame] = useState(null);

//   if (!showGamesModal) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
//       <div className="bg-gray-900 rounded-2xl shadow-xl max-w-md w-full p-6 relative">
//         <button onClick={() => setShowGamesModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
//           <X className="h-6 w-6" />
//         </button>

//         {!selectedGame ? (
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-white mb-6">🎮 Elige tu Juego</h2>
//             <div className="flex flex-col space-y-4">
//               <button onClick={() => setSelectedGame("trivia")} className="py-3 px-4 bg-red-700 hover:bg-red-800 rounded-lg text-white font-medium flex items-center justify-center">
//                 <Trophy className="h-6 w-6 mr-2" /> Trivia de Descuentos
//               </button>
//               <button onClick={() => setSelectedGame("wheel")} className="py-3 px-4 bg-blue-700 hover:bg-blue-800 rounded-lg text-white font-medium flex items-center justify-center">
//                 <RotateCcw className="h-6 w-6 mr-2" /> Ruleta de Descuentos
//               </button>
//             </div>
//           </div>
//         ) : selectedGame === "trivia" ? (
//           <DiscountTrivia showModal={true} setShowModal={() => setSelectedGame(null)} />
//         ) : (
//           <DiscountWheel showModal={true} setShowModal={() => setSelectedGame(null)} />
//         )}
//       </div>
//     </div>
//   );
// }
