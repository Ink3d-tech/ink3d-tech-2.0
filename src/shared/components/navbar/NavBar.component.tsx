"use client";

import React, { useState, useEffect } from "react";
import HamburguerMenu from "./HamburguerMenu.components";
import { Menu, X, ShoppingCart, HelpCircle, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import UserMenu from "./UserMenu.components";

export default function NavBar() {
    const { isAuthenticated } = useAuth();
    const [menu, setMenu] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleToggle = () => setMenu((prevMenu) => !prevMenu);
    const toggleSearch = () => setSearchVisible((prev) => !prev);

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

    if (!isClient) {
        return null;
    }

    return (
        <div>
            <div className="bg-black text-white h-20 flex  w-full z-50 items-center px-4 md:px-8 justify-between">
                <div className="md:hidden cursor-pointer" onClick={handleToggle}>
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

                <div className="hidden md:flex items-center gap-6 px-12">
                    <Link href="/magazine" className="text-white">Magazine</Link>
                    <Link href="/categories" className="text-white">Categorías</Link>
                    <Link href="/sales" className="text-white">Ofertas</Link>
                
                </div>

                <div className="hidden md:flex items-center gap-6">
                    {isAuthenticated ? (
                        <UserMenu avatarUrl="/avatar.webp" />
                    ) : (
                        <>
                            <Link href="/login" className="text-white">Iniciar sesión</Link>
                            <Link href="/signup" className="text-white">Crear cuenta</Link>
                        </>
                    )}
                    <div className="relative flex items-center">
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
                                className="ml-2 p-2 rounded-md bg-white border w-48 transition-all duration-300 ease-in-out"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        )}
                    </div>
                    <Link href="/cart">
                        <ShoppingCart size="24" color="gray" />
                    </Link>
                </div>
            </div>

            <div className={`fixed top-3 right-0 min-w-[250px] h-[56px]  z-50 flex items-center gap-4 md:hidden`}>
                <div className="relative flex items-center ml-auto">
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
                            className="ml-2 p-2 rounded-md bg-white border w-48 transition-all duration-300 ease-in-out"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    )}
                </div>
                <Link href="/cart">
                    <ShoppingCart size="24" color="gray" />
                </Link>
            </div>

            <div
                className={`fixed top-20 left-0 min-w-full h-[calc(100vh-56px)] bg-white z-50 overflow-y-auto transform transition-transform duration-300 ${menu ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <HamburguerMenu handleToggle={handleToggle} />
            </div>

            {/* Icono de ayuda */}
            <div className="absolute top-0 right-0 mt-4 mr-4">
                <Link href="/help">
                    <HelpCircle size="24" color="gray" className="cursor-pointer" />
                </Link>
            </div>
        </div>
    );
}
