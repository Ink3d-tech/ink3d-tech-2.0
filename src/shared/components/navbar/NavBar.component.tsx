"use client";

import React, { useState, useEffect, useRef } from "react";
import HamburguerMenu from "./HamburguerMenu.components";
import { Menu, X, ShoppingCart, HelpCircle, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import UserMenu from "./UserMenu.components";
import { useRouter } from "next/navigation";

export default function NavBar() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [menu, setMenu] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const menuRef = useRef<HTMLDivElement>(null); // Referencia SOLO al menú
    const buttonRef = useRef<HTMLDivElement>(null); // Referencia al botón de menú

    const handleToggle = () => setMenu((prevMenu) => !prevMenu);
    const toggleSearch = () => setSearchVisible((prev) => !prev);
    const closeMenu = () => setMenu(false);
    
    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && searchQuery.trim() !== "") {
            router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };


    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            document.body.style.overflow = menu ? "hidden" : "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menu, isClient]);

    useEffect(() => {
        if (isClient) {
            const handleResize = () => {
                if (window.innerWidth >= 768) setMenu(false);
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [isClient]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // Evitar que se cierre si el usuario hace clic en el botón de menú
            if (buttonRef.current?.contains(target)) return;

            // Cerrar menú solo si el clic fue fuera de su contenedor
            if (menuRef.current && !menuRef.current.contains(target)) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div>
            <div className="bg-black text-white h-20 flex w-full z-50 items-center px-4 md:px-8 justify-between relative">
                <div ref={buttonRef} className="md:hidden cursor-pointer" onClick={handleToggle}>
                    {menu ? <X size="24" color="gray" /> : <Menu size="24" color="gray" />}
                </div>

                {/* Logo */}
                <div className="flex-1 flex justify-center md:justify-start">
                    <Link href="/home">
                        <Image
                            src="/LogoInk3d.webp"
                            alt="Logo Ink3d"
                            width={130}
                            height={130}
                            className="object-contain w-auto h-auto max-w-[100px]"
                        />
                    </Link>
                </div>

                {/* Íconos en móviles */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4 md:hidden">
                    <Search size="24" color="gray" onClick={toggleSearch} className="cursor-pointer" />
                    <Link href="/cart">
                        <ShoppingCart size="24" color="gray" />
                    </Link>
                </div>

                {/* Menú en escritorio */}
                <div className="hidden md:flex items-center gap-6 px-6">
                    <Link href="/magazine" className="text-white">Magazine</Link>
                    <Link href="/categories" className="text-white">Categorías</Link>
                    <Link href="/sales" className="text-white">Ofertas</Link>
                </div>

                <div className="hidden md:flex items-center gap-6 ">
                    <Search
                        size="24"
                        color="gray"
                        onClick={toggleSearch}
                        className="cursor-pointer"
                    />
                    {searchVisible && (
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="p-2 rounded-md bg-white text-black border w-32 lg:w-48 transition-all duration-300 ease-in-out"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    )}
                    <Link href="/cart">
                        <ShoppingCart size="24" color="gray" />
                    </Link>
                    <Link href="/help">
                        <HelpCircle size="24" color="gray" className="cursor-pointer" />
                    </Link> 
                        {isAuthenticated ? (
                            <UserMenu avatarUrl="/avatar.webp" />
                        ) : (
                            <>
                                <Link href="/login" className="text-white ">Iniciar sesión</Link>
                                <Link href="/signup" className="text-white px-4">Crear cuenta</Link>
                            </>
                        )}
                </div>
            </div>

            <div
                ref={menuRef} 
                className={`fixed top-20 left-0 min-w-full h-[calc(100vh-56px)] bg-white z-50 overflow-y-auto transform transition-transform duration-300 ${menu ? "translate-x-0" : "-translate-x-full"}`}
            >
                <HamburguerMenu handleToggle={handleToggle} />
            </div>
        </div>
    );
}
