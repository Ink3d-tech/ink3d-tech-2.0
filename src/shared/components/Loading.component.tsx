import { Loader2 } from "lucide-react";

export default function LoadingComponent() {
    return (
        <div className="h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
            {/* Main content */}
            <div className="relative">
                {/* Label design */}
                <div className="border-2 border-white p-8 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-4">
                        <span className="text-white text-xs tracking-widest">ESTABLECIDA 2024</span>
                    </div>

                    {/* Brand name */}
                    <div className="text-center">
                        <h1 className="text-6xl font-bold text-white tracking-wider mb-4 font-mono">
                            INK3D
                        </h1>

                        {/* Loading animation */}
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin text-white" size={24} />
                            <span className="text-white text-sm tracking-widest">CARGANDO</span>
                        </div>
                    </div>

                    {/* Care instructions style details */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full">
                        <div className="text-center text-white/60 text-[10px] tracking-wider space-y-1">
                            <p>EXPERIENCIA DIGITAL</p>
                            <p>HECHO CON PRECISIÓN</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-8 right-8 text-white/30 text-sm tracking-widest rotate-90">
                STREETWEAR
            </div>
            <div className="absolute top-8 left-8 text-white/30 text-sm tracking-widest -rotate-90">
                CULTURE
            </div>
        </div>
    )
        
}

