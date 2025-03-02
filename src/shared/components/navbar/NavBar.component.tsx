// "use client";

// import React, { useState, useEffect } from "react";
// import HamburguerMenu from "./HamburguerMenu.components";
// import { Menu, X, LucideSearch, ShoppingCart } from "lucide-react"; 
// import Link from "next/link";

// export default function NavBar() {
//     const [logged, setLogged] = useState(false);
//     const [menu, setMenu] = useState<boolean>(false);

//     const handleToggle = (): void => {
//         setMenu(prevMenu => !prevMenu);
//     };

//     useEffect(() => {
//         if (menu) {
//             document.body.style.overflow = "hidden"; // Bloquear scroll de la página
//         } else {
//             document.body.style.overflow = ""; // Restaurar scroll de la página
//         }

//         return () => {
//             document.body.style.overflow = ""; // Restaurar al desmontar
//         };
//     }, [menu]);

//     return (
//         <div>
//             {/* Navbar */}
//             <div className="bg-black text-white h-14 flex fixed top-0 w-full z-50">
//                 <div className="my-auto mr-auto ml-4 cursor-pointer" onClick={handleToggle}>
//                     {menu ? <X size="24" color="gray" /> : <Menu size="24" color="gray" />}
//                 </div>

//                 <div className="my-auto mx-5 px-1 py-1 bg-white text-gray-500 w-full flex gap-1">
//                     <LucideSearch size="20" color="gray" className="my-auto" />
//                     <h2>Estoy buscando...</h2>
//                 </div>


//                 <Link href={"/cart"} className="my-auto ml-auto mr-4">
//                     <ShoppingCart size="24" color="gray" />
//                 </Link>

//             </div>

//             {/* Menú desplegable con animación */}
//             <div 
//                 className={`fixed top-14 left-0 min-w-full h-[calc(100vh-56px)] bg-white z-50 overflow-y-auto 
//                 transform transition-transform duration-300 ${menu ? "translate-x-0" : "-translate-x-full"}`}
//             >
//                 <HamburguerMenu handleToggle={handleToggle} />
//             </div>
//         </div>
//     );
// }





// "use client";

// import React, { useState, useEffect } from "react";
// import HamburguerMenu from "./HamburguerMenu.components";
// import { Menu, X, LucideSearch, ShoppingCart, HelpCircle, LogOut } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { useAuth } from "@/modules/auth/shared/context/Auth.context";

// export default function NavBar() {
//     const { isAuthenticated, logout } = useAuth();
//     const [menu, setMenu] = useState(false);
//     const [searchOpen, setSearchOpen] = useState(false);

//     const handleToggle = () => setMenu(prevMenu => !prevMenu);
//     const handleSearchToggle = () => setSearchOpen(prevSearchOpen => !prevSearchOpen);
//     const handleLogout = () => logout();

//     useEffect(() => {
//         document.body.style.overflow = menu ? "hidden" : "";
//         return () => { document.body.style.overflow = ""; };
//     }, [menu]);

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth >= 768) setMenu(false);
//         };
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     return (
//         <div>
//             <div className="bg-black text-white h-20 flex fixed top-0 w-full z-50 items-center px-4 md:px-8 justify-between">
//                 <div className="md:hidden cursor-pointer" onClick={handleToggle}>
//                     {menu ? <X size="24" color="gray" /> : <Menu size="24" color="gray" />}
//                 </div>
//                 <div className="flex-1 flex justify-center md:justify-start">
//                     <Link href="/home">
//                         <Image src="/LogoInk3d.webp" alt="Logo Ink3d" width={130} height={130} className="object-contain w-auto h-auto max-w-[100px]" />
//                     </Link>
//                 </div>
//                 <div className="hidden md:flex items-center gap-6">
//                     <Link href="/manager/magazine" className="text-white">Magazine</Link>
//                     <Link href="/categories" className="text-white">Categorías</Link>
//                     <Link href="/sales" className="text-white">Ofertas</Link>
//                 </div>
//                 <div className="hidden md:flex flex-1 justify-center px-1 py-1 bg-white text-gray-500 w-1/3 gap-1 rounded-full transition-all">
//                     <LucideSearch size="20" color="gray" className="my-auto" />
//                     <input type="text" className="w-full p-2 pl-4 rounded-full border-none focus:outline-none" placeholder="Estoy buscando..." />
//                 </div>
//                 <div className="hidden md:flex items-center gap-6">
//                     {isAuthenticated ? (
//                         <>
//                             <button onClick={handleLogout} className="flex items-center gap-2 text-white">
//                                 <LogOut size={24} color="gray" />
//                                 <span>Cerrar sesión</span>
//                             </button>
//                             <Image
//                                 src="/avatar.webp"
//                                 alt="User Avatar"
//                                 width={40}
//                                 height={40}
//                                 className="rounded-full"
//                             />

//                         </>
//                     ) : (
//                         <>
//                             <Link href="/auth/login" className="text-white">Iniciar sesión</Link>
//                             <Link href="/auth/signup" className="text-white">Crear cuenta</Link>
//                         </>
//                     )}
//                     <Link href="/cart">
//                         <ShoppingCart size="24" color="gray" />
//                     </Link>
//                 </div>
//                 <div className="md:hidden ml-auto mr-4">
//                     <LucideSearch size="24" color="gray" className="cursor-pointer" onClick={handleSearchToggle} />
//                 </div>
//                 <div className="md:hidden ml-4">
//                     <Link href="/cart">
//                         <ShoppingCart size="24" color="gray" />
//                     </Link>
//                 </div>
//             </div>
//             <div className={`fixed top-20 left-0 min-w-full h-[calc(100vh-56px)] bg-white z-50 overflow-y-auto transform transition-transform duration-300 ${menu ? "translate-x-0" : "-translate-x-full"}`}>
//                 <HamburguerMenu handleToggle={handleToggle} />
//             </div>
//             <div className="absolute top-0 right-0 mt-4 mr-4">
//                 <Link href="/help">
//                     <HelpCircle size="24" color="gray" className="cursor-pointer" />
//                 </Link>
//             </div>
//         </div>
//     );
// }


"use client";

import React, { useState, useEffect } from "react";
import HamburguerMenu from "./HamburguerMenu.components";
import { Menu, X, ShoppingCart, HelpCircle, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";

export default function NavBar() {
    const { isAuthenticated, user, logout } = useAuth(); 
    const [menu, setMenu] = useState(false);

    const handleToggle = () => setMenu(prevMenu => !prevMenu);
    const handleLogout = () => logout();

    useEffect(() => {
        document.body.style.overflow = menu ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menu]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMenu(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            <div className="bg-black text-white h-20 flex fixed top-0 w-full z-50 items-center px-4 md:px-8 justify-between">
                <div className="md:hidden cursor-pointer" onClick={handleToggle}>
                    {menu ? <X size="24" color="gray" /> : <Menu size="24" color="gray" />}
                </div>
                <div className="flex-1 flex justify-center md:justify-start">
                    <Link href="/home">
                        <Image src="/LogoInk3d.webp" alt="Logo Ink3d" width={130} height={130} className="object-contain w-auto h-auto max-w-[100px]" />
                    </Link>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/manager/magazine" className="text-white">Magazine</Link>
                    <Link href="/categories" className="text-white">Categorías</Link>
                    <Link href="/sales" className="text-white">Ofertas</Link>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    {isAuthenticated ? (
                        <>
                            <button onClick={handleLogout} className="flex items-center gap-2 text-white">
                                <LogOut size={24} color="gray" />
                                <span>Cerrar sesión</span>
                            </button>
                            <Image
                                src="/avatar.webp"
                                alt="User Avatar"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="text-white">Iniciar sesión</Link>
                            <Link href="/auth/signup" className="text-white">Crear cuenta</Link>
                        </>
                    )}
                    <Link href="/cart">
                        <ShoppingCart size="24" color="gray" />
                    </Link>
                </div>
            </div>
            <div className={`fixed top-20 left-0 min-w-full h-[calc(100vh-56px)] bg-white z-50 overflow-y-auto transform transition-transform duration-300 ${menu ? "translate-x-0" : "-translate-x-full"}`}>
                <HamburguerMenu handleToggle={handleToggle} />
            </div>
            <div className="absolute top-0 right-0 mt-4 mr-4">
                <Link href="/help">
                    <HelpCircle size="24" color="gray" className="cursor-pointer" />
                </Link>
            </div>
        </div>
    );
}
