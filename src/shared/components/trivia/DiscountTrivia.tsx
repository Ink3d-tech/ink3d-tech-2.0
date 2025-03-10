// "use client";

// import React, { useState } from "react";
// import { Trophy, X } from "lucide-react";

// function DiscountTrivia<>({ showModal, setShowModal }) {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [showResults, setShowResults] = useState(false);
//   const [score, setScore] = useState(0);
//   const [discountCode, setDiscountCode] = useState("");

//   const triviaQuestions = [
//     {
//       question: "¿Cuál es la capital de Francia?",
//       options: ["Londres", "Madrid", "París", "Roma"],
//       correctAnswer: "París",
//     },
//     {
//       question: "¿Cuántos planetas hay en el sistema solar?",
//       options: ["7", "8", "9", "10"],
//       correctAnswer: "8",
//     },
//     {
//       question: "¿Quién pintó la Mona Lisa?",
//       options: ["Van Gogh", "Da Vinci", "Picasso", "Miguel Ángel"],
//       correctAnswer: "Da Vinci",
//     },
//   ];

//   const handleAnswer = (selectedAnswer) => {
//     if (selectedAnswer === triviaQuestions[currentQuestion].correctAnswer) {
//       setScore(score + 1);
//     }

//     if (currentQuestion < triviaQuestions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       setShowResults(true);
//       setDiscountCode(Math.random().toString(36).substring(2, 8).toUpperCase());
//     }
//   };

//   if (!showModal) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
//       <div className="bg-gray-900 rounded-2xl shadow-xl max-w-md w-full p-6 relative">
//         <button
//           onClick={() => setShowModal(false)}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//         >
//           <X className="h-6 w-6" />
//         </button>

//         {!showResults ? (
//           <div>
//             <h2 className="text-2xl font-bold text-white mb-6">
//               🏆 ¡Responde y Gana un Descuento!
//             </h2>
//             <div className="mb-6">
//               <p className="text-lg font-medium text-gray-300 mb-4">
//                 {triviaQuestions[currentQuestion].question}
//               </p>
//               <div className="space-y-3">
//                 {triviaQuestions[currentQuestion].options.map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleAnswer(option)}
//                     className="w-full py-3 px-4 text-left rounded-lg bg-red-700 hover:bg-red-800 transition-colors text-white font-medium"
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//               <div className="mt-4 text-sm text-gray-400">
//                 Pregunta {currentQuestion + 1} de {triviaQuestions.length}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center">
//             <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-white mb-2">🎉 ¡Felicidades!</h2>
//             <p className="text-gray-400 mb-6">
//               Acertaste {score} de {triviaQuestions.length} preguntas.
//             </p>
//             <div className="bg-red-700 p-4 rounded-lg mb-6">
//               <p className="text-sm text-white mb-2">Código de descuento:</p>
//               <p className="text-2xl font-bold text-white">{discountCode}</p>
//             </div>
//             <button
//               onClick={() => setShowModal(false)}
//               className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
//             >
//               Cerrar
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DiscountTrivia;
