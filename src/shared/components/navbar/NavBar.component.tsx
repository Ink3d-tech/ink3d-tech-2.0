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
// import { Menu, X, LucideSearch, ShoppingCart, User as UserIcon, HelpCircle } from "lucide-react";  
// import Link from "next/link";
// import Image from "next/image"; 
// import { useAuth } from "@/modules/auth/shared/context/Auth.context"; 

// export default function NavBar() {
//     const { isAuthenticated } = useAuth(); 
//     const [menu, setMenu] = useState<boolean>(false);
//     const [searchOpen, setSearchOpen] = useState<boolean>(false); 

//     const handleToggle = (): void => {
//         setMenu(prevMenu => !prevMenu);
//     };

//     const handleSearchToggle = (): void => {
//         setSearchOpen(prevSearchOpen => !prevSearchOpen);  
//     };

//     useEffect(() => {
//         if (menu) {
//             document.body.style.overflow = "hidden"; 
//         } else {
//             document.body.style.overflow = ""; 
//         }

//         return () => {
//             document.body.style.overflow = ""; 
//         };
//     }, [menu]);

//     return (
//         <div>
//             {/* Navbar */}
//             <div className="bg-black text-white h-20 flex fixed top-0 w-full z-50 justify-between items-center px-4 md:px-8">

//                 {/* Menú hamburguesa en móvil */}
//                 <div className="md:hidden my-auto cursor-pointer" onClick={handleToggle}>
//                     {menu ? <X size="24" color="gray" /> : <Menu size="24" color="gray" />}
//                 </div>

//                 {/* Logo centrado en dispositivos móviles */}
//                 <div className="flex justify-center flex-1">
//                     <Link href="/home">
//                         <Image
//                             src="/LogoInk3d.webp"
//                             alt="Logo Ink3d"
//                             width={130}
//                             height={130}
//                             className="object-contain w-auto h-auto max-w-[100px]" 
//                         />
//                     </Link>
//                 </div>

//                 {/* Barra de búsqueda en móviles */}
//                 <div className="md:hidden ml-auto mr-4">
//                     <LucideSearch
//                         size="24"
//                         color="gray"
//                         className="cursor-pointer"
//                         onClick={handleSearchToggle} 
//                     />
//                 </div>

//                 {/* Carrito en móviles */}
//                 <div className="md:hidden ml-4">
//                     <Link href="/cart">
//                         <ShoppingCart size="24" color="gray" />
//                     </Link>
//                 </div>

//                 {/* Barra de búsqueda en escritorio */}
//                 <div className={`hidden md:flex my-auto mx-5 px-1 py-1 bg-white text-gray-500 w-1/3 gap-1 rounded-full ${searchOpen ? "w-1/2" : "w-1/3"} transition-all`}>
//                     <LucideSearch size="20" color="gray" className="my-auto" />
//                     <input
//                         type="text"
//                         className="w-full p-2 pl-4 rounded-full border-none focus:outline-none"
//                         placeholder="Estoy buscando..."
//                     />
//                 </div>

//                 {/* Links de navegación en escritorio */}
//                 <div className="hidden md:flex items-center gap-6 ml-6"> 
//                     <Link href="/magazine" className="text-white">
//                         <p>Magazine</p>
//                     </Link>
//                     <Link href="/sales" className="text-white">
//                         <p>Ofertas</p>
//                     </Link>
//                     <Link href="/categories" className="text-white">
//                         <p>Categorías</p>
//                     </Link>

//                     {!isAuthenticated ? (
//                         <>
//                             <Link href="/auth/login" className="text-white">
//                                 <p>Iniciar sesión</p>
//                             </Link>
//                             <Link href="/auth/signup" className="text-white">
//                                 <p>Crear cuenta</p>
//                             </Link>
//                         </>
//                     ) : (
//                         <>
//                             <Link href="/account" className="text-white">
//                                 <p>Mi cuenta</p>
//                             </Link>
//                             <Link href="/orders" className="text-white">
//                                 <p>Mis compras</p>
//                             </Link>
//                             <Link href="/favs" className="text-white">
//                                 <p>Favoritos</p>
//                             </Link>
//                         </>
//                     )}

//                     <Link href="/cart" className="my-auto ml-4">
//                         <ShoppingCart size="24" color="gray" />
//                     </Link>
//                 </div>
//             </div>

//             {/* Menú hamburguesa */}
//             <div 
//                 className={`fixed top-20 left-0 min-w-full h-[calc(100vh-56px)] bg-white z-50 overflow-y-auto 
//                 transform transition-transform duration-300 ${menu ? "translate-x-0" : "-translate-x-full"}`}
//             >
//                 <HamburguerMenu handleToggle={handleToggle} />
//             </div>

//             {/* Icono de ayuda */}
//             <div className="absolute top-0 right-0 mt-4 mr-4">
//                 <Link href="/help">
//                     <HelpCircle size="24" color="gray" className="cursor-pointer" />
//                 </Link>
//             </div>
//         </div>
//     );
// }

// "use client";

// import React, { useState, useEffect } from "react";
// import HamburguerMenu from "./HamburguerMenu.components";
// import { Menu, X, LucideSearch, ShoppingCart, User as UserIcon, HelpCircle } from "lucide-react";  
// import Link from "next/link";
// import Image from "next/image"; 
// import { useAuth } from "@/modules/auth/shared/context/Auth.context"; 

// export default function NavBar() {
//     const { isAuthenticated, user } = useAuth(); // Obtener el usuario
//     const [menu, setMenu] = useState<boolean>(false);
//     const [searchOpen, setSearchOpen] = useState<boolean>(false); 

//     const handleToggle = (): void => {
//         setMenu(prevMenu => !prevMenu);
//     };

//     const handleSearchToggle = (): void => {
//         setSearchOpen(prevSearchOpen => !prevSearchOpen);  
//     };

//     useEffect(() => {
//         if (menu) {
//             document.body.style.overflow = "hidden"; 
//         } else {
//             document.body.style.overflow = ""; 
//         }

//         return () => {
//             document.body.style.overflow = ""; 
//         };
//     }, [menu]);

//     return (
//         <div>
//             {/* Navbar */}
//             <div className="bg-black text-white h-20 flex fixed top-0 w-full z-50 justify-between items-center px-4 md:px-8">

//                 {/* Menú hamburguesa en móvil */}
//                 <div className="md:hidden my-auto cursor-pointer" onClick={handleToggle}>
//                     {menu ? <X size="24" color="gray" /> : <Menu size="24" color="gray" />}
//                 </div>

//                 {/* Logo centrado en dispositivos móviles */}
//                 <div className="flex justify-center flex-1">
//                     <Link href="/home">
//                         <Image
//                             src="/LogoInk3d.webp"
//                             alt="Logo Ink3d"
//                             width={130}
//                             height={130}
//                             className="object-contain w-auto h-auto max-w-[100px]" 
//                         />
//                     </Link>
//                 </div>

//                 {/* Barra de búsqueda en móviles */}
//                 <div className="md:hidden ml-auto mr-4">
//                     <LucideSearch
//                         size="24"
//                         color="gray"
//                         className="cursor-pointer"
//                         onClick={handleSearchToggle} 
//                     />
//                 </div>

//                 {/* Carrito en móviles */}
//                 <div className="md:hidden ml-4">
//                     <Link href="/cart">
//                         <ShoppingCart size="24" color="gray" />
//                     </Link>
//                 </div>

//                 {/* Barra de búsqueda en escritorio */}
//                 <div className={`hidden md:flex my-auto mx-5 px-1 py-1 bg-white text-gray-500 w-1/3 gap-1 rounded-full ${searchOpen ? "w-1/2" : "w-1/3"} transition-all`}>
//                     <LucideSearch size="20" color="gray" className="my-auto" />
//                     <input
//                         type="text"
//                         className="w-full p-2 pl-4 rounded-full border-none focus:outline-none"
//                         placeholder="Estoy buscando..."
//                     />
//                 </div>

//                 {/* Links de navegación en escritorio */}
//                 <div className="hidden md:flex items-center gap-6 ml-6"> 
//                     <Link href="/magazine" className="text-white">
//                         <p>Magazine</p>
//                     </Link>
//                     <Link href="/sales" className="text-white">
//                         <p>Ofertas</p>
//                     </Link>
//                     <Link href="/categories" className="text-white">
//                         <p>Categorías</p>
//                     </Link>

//                     {!isAuthenticated ? (
//                         <>
//                             <Link href="/auth/login" className="text-white">
//                                 <p>Iniciar sesión</p>
//                             </Link>
//                             <Link href="/auth/signup" className="text-white">
//                                 <p>Crear cuenta</p>
//                             </Link>
//                         </>
//                     ) : (
//                         <>
//                             <Link href="/account" className="text-white">
//                                 <p>Mi cuenta</p>
//                             </Link>
//                             <Link href="/orders" className="text-white">
//                                 <p>Mis compras</p>
//                             </Link>
//                             <Link href="/favs" className="text-white">
//                                 <p>Favoritos</p>
//                             </Link>
//                             {user && user.name && (
//                                 <Link href="/dashboard" className="text-white">
//                                     <p>Dashboard</p>
//                                 </Link>
//                             )}
//                         </>
//                     )}

//                     <Link href="/cart" className="my-auto ml-4">
//                         <ShoppingCart size="24" color="gray" />
//                     </Link>
//                 </div>
//             </div>

//             {/* Menú hamburguesa */}
//             <div 
//                 className={`fixed top-20 left-0 min-w-full h-[calc(100vh-56px)] bg-white z-50 overflow-y-auto 
//                 transform transition-transform duration-300 ${menu ? "translate-x-0" : "-translate-x-full"}`}
//             >
//                 <HamburguerMenu handleToggle={handleToggle} />
//             </div>

//             {/* Icono de ayuda */}
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
import { Menu, X, LucideSearch, ShoppingCart, HelpCircle } from "lucide-react";  
import Link from "next/link";
import Image from "next/image"; 
import { useAuth } from "@/modules/auth/shared/context/Auth.context"; 

export default function NavBar() {
    const { isAuthenticated, user } = useAuth(); 
    const [menu, setMenu] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const handleToggle = () => setMenu(prevMenu => !prevMenu);
    const handleSearchToggle = () => setSearchOpen(prevSearchOpen => !prevSearchOpen);

    useEffect(() => {
        document.body.style.overflow = menu ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menu]);

    return (
        <div>
            <div className="bg-black text-white h-20 flex fixed top-0 w-full z-50 justify-between items-center px-4 md:px-8">
                <div className="md:hidden my-auto cursor-pointer" onClick={handleToggle}>
                    {menu ? <X size="24" color="gray" /> : <Menu size="24" color="gray" />}
                </div>
                <div className="flex justify-center flex-1">
                    <Link href="/home">
                        <Image src="/LogoInk3d.webp" alt="Logo Ink3d" width={130} height={130} className="object-contain w-auto h-auto max-w-[100px]" />
                    </Link>
                </div>
                <div className="md:hidden ml-auto mr-4">
                    <LucideSearch size="24" color="gray" className="cursor-pointer" onClick={handleSearchToggle} />
                </div>
                <div className="md:hidden ml-4">
                    <Link href="/cart">
                        <ShoppingCart size="24" color="gray" />
                    </Link>
                </div>
                <div className={`hidden md:flex my-auto mx-5 px-1 py-1 bg-white text-gray-500 w-1/3 gap-1 rounded-full ${searchOpen ? "w-1/2" : "w-1/3"} transition-all`}>
                    <LucideSearch size="20" color="gray" className="my-auto" />
                    <input type="text" className="w-full p-2 pl-4 rounded-full border-none focus:outline-none" placeholder="Estoy buscando..." />
                </div>
                <div className="hidden md:flex items-center gap-6 ml-6"> 
                    <Link href="/magazine" className="text-white"><p>Magazine</p></Link>
                    <Link href="/sales" className="text-white"><p>Ofertas</p></Link>
                    <Link href="/categories" className="text-white"><p>Categorías</p></Link>
                    {!isAuthenticated ? (
                        <>
                            <Link href="/auth/login" className="text-white"><p>Iniciar sesión</p></Link>
                            <Link href="/auth/signup" className="text-white"><p>Crear cuenta</p></Link>
                        </>
                    ) : (
                        <>
                            <Link href="/account" className="text-white"><p>Mi cuenta</p></Link>
                            <Link href="/orders" className="text-white"><p>Mis compras</p></Link>
                            <Link href="/favs" className="text-white"><p>Favoritos</p></Link>
                            {user?.name && (
                                <Link href="/manager" className="text-white"><p>Panel</p></Link>
                            )}
                        </>
                    )}
                    <Link href="/cart" className="my-auto ml-4">
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