"use client";

import React, { useState, useEffect } from "react";
import HamburguerMenu from "./HamburguerMenu.components";
import { Menu, X, LucideSearch, ShoppingCart } from "lucide-react"; 
import Link from "next/link";

export default function NavBar() {
    const [logged, setLogged] = useState(false);
    const [menu, setMenu] = useState<boolean>(false);

    const handleToggle = (): void => {
        setMenu(prevMenu => !prevMenu);
    };

    useEffect(() => {
        if (menu) {
            document.body.style.overflow = "hidden"; // Bloquear scroll de la página
        } else {
            document.body.style.overflow = ""; // Restaurar scroll de la página
        }

        return () => {
            document.body.style.overflow = ""; // Restaurar al desmontar
        };
    }, [menu]);

    return (
        <div>
            {/* Navbar */}
            <div className="bg-black text-white h-14 flex fixed top-0 w-full z-50">
                <div className="my-auto mr-auto ml-4 cursor-pointer" onClick={handleToggle}>
                    {menu ? <X size="24" color="gray" /> : <Menu size="24" color="gray" />}
                </div>

                <div className="my-auto mx-5 px-1 py-1 bg-white text-gray-500 w-full flex gap-1">
                    <LucideSearch size="20" color="gray" className="my-auto" />
                    <h2>Estoy buscando...</h2>
                </div>

                
                <Link href={"/cart"} className="my-auto ml-auto mr-4">
                    <ShoppingCart size="24" color="gray" />
                </Link>
                
            </div>

            {/* Menú desplegable con animación */}
            <div 
                className={`fixed top-14 left-0 min-w-full h-[calc(100vh-56px)] bg-white z-50 overflow-y-auto 
                transform transition-transform duration-300 ${menu ? "translate-x-0" : "-translate-x-full"}`}
            >
                <HamburguerMenu handleToggle={handleToggle} />
            </div>
        </div>
    );
}
