interface ViewButtonsProps {
    view: string;
    setView: (value: string) => void;
  }
  
  export default function ViewButtons({ view, setView }: ViewButtonsProps) {
    return (
      <div className="flex justify-center gap-4 mb-6">
        {["byProduct", "bySize", "summary"].map((option) => (
          <button
            key={option}
            onClick={() => setView(option)}
            className={`px-4 py-2 rounded-md ${view === option ? "bg-teal-500 text-white" : "bg-gray-200"}`}
          >
            {option === "byProduct" ? "Por Producto" : option === "bySize" ? "Por Talla" : "Resumen"}
          </button>
        ))}
      </div>
    );
  }
  