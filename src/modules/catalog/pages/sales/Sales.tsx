"use client";

import { useState } from "react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import ProtectedRoute from "@/shared/helpers/ProtectedRoute";

type Discount = {
  id: string;
  amount: string;
  status: string;
  isUsed: boolean;
  expiresAt: string | null;
};

export default function Sales() {
  const [showModal] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [rewardCode, setRewardCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { token } = useAuth();

  const questions = [
    {
      question: "¿Quién es el piloto más exitoso en la F1?",
      options: ["Sebastian Vettel", "Lewis Hamilton", "Fernando Alonso", "Max Verstappen"],
      correctAnswer: "Lewis Hamilton",
    },
    {
      question: "¿Qué equipo de F1 tiene el logo de un caballo rojo?",
      options: ["Ferrari", "Mercedes", "Red Bull", "McLaren"],
      correctAnswer: "Ferrari",
    },
    {
      question: "¿Qué marca de ropa es famosa por su colaboración con F1?",
      options: ["Nike", "Puma", "Adidas", "Under Armour"],
      correctAnswer: "Puma",
    },
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    if (newAnswers.length === questions.length) {
      checkAnswers(newAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const checkAnswers = async (answers: string[]) => {
    const correctAnswers = questions.every((q, index) => q.correctAnswer === answers[index]);
    setIsCorrect(correctAnswers);

    if (correctAnswers) {
      try {
        const response = await axios.get<Discount[]>(`${API_BACK}/discounts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const validDiscounts = response.data.filter(
          (discount) =>
            discount.status === "active" &&
            discount.isUsed === false &&
            (!discount.expiresAt || new Date(discount.expiresAt) > new Date())
        );
        if (validDiscounts.length > 0) {
          const randomDiscount = validDiscounts[Math.floor(Math.random() * validDiscounts.length)];
          setRewardCode(randomDiscount.id);
          setDiscountAmount(randomDiscount.amount);
        } else {
          setRewardCode("No hay descuentos disponibles");
          setDiscountAmount("");
        }
      } catch (error) {
        console.error("Error obteniendo descuentos:", error);
      }
    }
    setIsCompleted(true);
  };

  // Redirigir al home al cerrar el modal
  const redirectToHome = () => {
    window.location.href = "/home";
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen text-white relative -my-23">
      <div
        className="absolute inset-0 bg-repeat blur-xl "
        style={{
          backgroundImage: "url('/images/textures/8.jpg')",
          backgroundSize: "1000px", // Ajusta el tamaño del mosaico a tu gusto
          backgroundPosition: "center",
          backgroundRepeat: "repeat", // Hace que la imagen se repita en mosaico
          filter: "blur(10px)", // Aplica el desenfoque
        }}
      />
      <div className="absolute inset-0 bg-white/30"></div>

      {/* Modal Trivia */}
      {showModal && !isCompleted && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 -mt-6"
        >
          <div className="bg-gray-800 p-6 rounded-lg text-white max-w-sm">
            <h2 className="text-xl font-bold mb-4">Trivia Motorsport</h2>
            <p className="mb-4">{questions[currentQuestionIndex].question}</p>
            <div className="space-y-4">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className="w-full bg-gray-700 px-4 py-2 rounded-lg text-white hover:bg-gray-600 transition"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Resultado */}
      {isCompleted && showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
        >
          <div className="bg-gradient-to-r -mt-6 from-purple-600 via-blue-600 to-indigo-600 p-8 rounded-xl text-white shadow-xl max-w-md transform transition-all scale-110 hover:scale-100">
            <h2 className="text-3xl font-bold mb-6 text-center">
              {isCorrect ? "¡Felicidades!" : "Fallaste :("}
            </h2>
            <p className="mb-6 text-center text-lg">
              {isCorrect
                ? "Has completado la trivia correctamente."
                : "Lo siento, no todas tus respuestas son correctas."}
            </p>

            {/* Texto adicional al ganar */}
            {isCorrect && (
              <p className="mb-6 text-center text-lg  ">
                ¡Copia el siguiente codigo para utilizarlo antes de comprar!
              </p>
            )}

            {isCorrect && rewardCode !== "No hay descuentos disponibles" ? (
              <div className="text-center">
                <p className="text-2xl font-semibold mb-2">
                  <span className="text-lg">Tu código de descuento es:</span>{" "}
                  <strong className="text-yellow-400">{rewardCode}</strong>
                </p>
                <p className="text-xl">
                  <span className="text-lg">El descuento es de:</span>{" "}
                  <strong className="text-green-500">{discountAmount}%</strong>
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-xl">No hay descuentos disponibles en este momento.</p>
              </div>
            )}

            {/* Botón para cerrar el modal y redirigir al home */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={redirectToHome} // Redirige al home
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}
