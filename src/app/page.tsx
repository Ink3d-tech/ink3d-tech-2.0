import Image from 'next/image';
import Link from 'next/link'; 

export default function LandingPage() {



  return (
    <div className="relative">
      {/* Sección de introducción */}
      <section className="relative bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-16 flex items-center justify-center flex-col text-center">
          <h1 className="text-5xl font-bold leading-tight mb-6">Transforma Tu Mundo</h1>
          <p className="text-xl mb-8">Con nuestros productos innovadores, cada día se vuelve una experiencia única.</p>
          <Link href="/home" className='bg-blue-600 text-white py-3 px-8 rounded-lg text-xl transition duration-300 hover:bg-blue-700'>
            
              Comienza Ahora
           
          </Link>
        </div>
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-[-1]">
          <Image
            src="/path-to-your-image.jpg" // Reemplaza con tu imagen
            alt="Imagen principal"
            className="w-full h-full object-cover"
            width={100}
            height={100}
          />
        </div>
      </section>

      {/* Sección de características */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Características Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card bg-gray-100 p-6 rounded-lg shadow-md">
              <Image src="/path-to-feature-image-1.jpg" alt="Feature 1" className="w-full h-64 object-cover mb-6 rounded-lg" width={200} height={200}/>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Innovación a tu alcance</h3>
              <p className="text-gray-600">Descubre cómo nuestros productos están cambiando el futuro de la tecnología.</p>
            </div>
            <div className="feature-card bg-gray-100 p-6 rounded-lg shadow-md">
              <Image src="/path-to-feature-image-2.jpg" alt="Feature 2" className="w-full h-64 object-cover mb-6 rounded-lg" width={200} height={200}/>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Diseño elegante</h3>
              <p className="text-gray-600">Un diseño que se adapta a tu estilo, con materiales de primera calidad.</p>
            </div>
            <div className="feature-card bg-gray-100 p-6 rounded-lg shadow-md">
              <Image src="/path-to-feature-image-3.jpg" alt="Feature 3" className="w-full h-64 object-cover mb-6 rounded-lg" width={200} height={200}/>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Rendimiento sin igual</h3>
              <p className="text-gray-600">Potencia y eficiencia para que puedas trabajar, jugar y crear sin límites.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de llamada a la acción */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Estás listo para comenzar?</h2>
          <p className="text-lg mb-8">Únete a miles de personas que ya están disfrutando de una experiencia única.</p>
          <Link href="/home" className='bg-white text-blue-600 py-3 px-8 rounded-lg text-xl transition duration-300 hover:bg-gray-100'>
            Explorar Productos
          </Link>
        </div>
      </section>
    </div>
  );
};

