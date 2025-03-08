import Image from "next/image";

export default function acercaDeNosotros() {
  // Datos simulados para evitar errores
  const article = {
    id: 1,
    image: "/", // Ruta de la imagen en public/
    title: "¿QUE ES THE INK3D PROYECT?",
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      {/* Encabezado */}
      <header className="text-center py-10">
        <h1 className="text-5xl font-extrabold tracking-wide bg-gradient-to-r from-red-600 via-red-800 to-black text-transparent bg-clip-text">
          THE INKED PROJECT
        </h1>
        <h2 className="text-3xl font-semibold text-gray-700 mt-2">
          
        </h2>
      </header>

      {/* Contenido del artículo */}
      <main className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Imagen */}
        <div className="flex justify-center items-center w-full">
  <Image
    src="/logoonk3dwhite.png"
    alt="Emma Blue"
    width={180}
    height={180}
    className="object-cover"
  />
</div>

        {/* Título del artículo */}
        <h2 className="text-4xl font-bold text-red-600 mt-6 text-center">
          {article.title}
        </h2>

        {/* Contenido */}
        <p className="text-gray-700 leading-relaxed mt-4">



          <span className="font-bold text-red-500"> </span>, 
        </p>

        <p className="text-gray-700 mt-4">
        INK3D: La Evolución del Streetwear Tecnológico
Nacida en Tokio en 2018, Ink3D surgió de la visión de un grupo de diseñadores apasionados por el Asian style, la estética cyberpunk y la cultura del motorsport. Inspirados por la velocidad, la precisión y la innovación, buscaron una manera de fusionar la moda urbana con la tecnología de impresión 3D.

Su primera colección, "Neon Velocity", rompió esquemas al combinar tejidos de alto rendimiento con estructuras impresas en 3D, ofreciendo prendas ligeras, aerodinámicas y con un diseño futurista. Desde entonces, Ink3D ha redefinido el streetwear, llevando la moda más allá de lo convencional y creando una comunidad donde el diseño, la velocidad y la expresión personal se encuentran.

Hoy, Ink3D sigue evolucionando, empujando los límites de la creatividad y la tecnología. 🚀🔥
        </p>

        <p className="text-gray-700 mt-4 italic">
          "El arte y la moda son una extensión de quienes somos. INK3D PROJECT no solo viste, sino que cuenta historias".
        </p>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 mt-10">
        <p>&copy; 2025 THE INKED PROJECT | Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
