import { GlassesIcon } from "lucide-react";
import Link from "next/link";
import { FaCube } from "react-icons/fa";

export default function notFound() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-12 gap-4 h-full w-full rotate-12">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <div key={i} className="col-span-1">
                            <div className="h-full w-full border-r border-white/20"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <FaCube size={64} className="text-purple-500 animate-pulse" />
                        <GlassesIcon size={64} className="absolute top-0 left-0 text-cyan-400 opacity-50 animate-ping" />
                    </div>
                </div>

                <h1 className="text-[12rem] font-black leading-none tracking-tighter mb-4 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 text-transparent bg-clip-text animate-gradient">
                    404
                </h1>

                <div className="relative">
                    <h2 className="text-4xl font-bold mb-6 uppercase tracking-widest">
                        INK<span className="text-purple-500">3</span>D
                    </h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto"></div>
                </div>

                <p className="text-xl text-gray-400 mt-8 mb-12 font-medium">
                Parece que te has adentrado en territorio desconocido.
                Esta página se ha perdido en el vacío digital.
                </p>

                <Link
                    href="/home"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity duration-300 hover:scale-105 transform"
                >
                    Regreso a la realidad
                </Link>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/2 -right-24 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    )
};
