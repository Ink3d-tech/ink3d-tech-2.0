"use client";

// Habra que agregar los Links y corregir las rutas que evalua pathname
// en cuanto sepamos bien las rutas

import { FileText, Gamepad, HelpCircle, Home, List, Search, ShoppingBag, User 
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HamBurgerButtonsProps {
    handleToggle: () => void;
}

export default function HamBurgerButtons({ handleToggle }: HamBurgerButtonsProps) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col mb-10 pt-5 px-8 gap-5 bg-white">
            <Link href={"/home"} onClick={handleToggle} className="flex gap-5">
                {pathname === "/home" ? <Home color="#0865F0" size={24} /> : <Home size={24} color="black" />}
                <p className="font-semibold">Inicio</p>
            </Link>
            <Link href={"/search"} onClick={handleToggle} className="flex gap-5">
                {pathname === "/search" ? <Search color="#0865F0" size={24} /> : <Search size={24} color="black" />}
                <p className="font-semibold">Buscar</p>
            </Link>
            {/* <div onClick={handleToggle} className="flex gap-5">
                {pathname === "/notifications" ? <Bell color="#0865F0" size={24} /> : <Bell size={24} color="black" />}
                <p className="font-semibold">Notificaciones</p>
            </div> */}
            <Link href={"/orders"} onClick={handleToggle} className="flex gap-5">
                {pathname === "/orders" ? <ShoppingBag color="#0865F0" size={24} /> : <ShoppingBag size={24} color="black" />}
                <p className="font-semibold">Mis compras</p>
            </Link >
            {/* <div onClick={handleToggle} className="flex gap-5">
                {pathname === "/favs" ? <Heart color="#0865F0" size={24} /> : <Heart size={24} color="black" />}
                <p className="font-semibold">Favoritos</p>
            </div> */}
            <Link href={"/sales"} onClick={handleToggle} className="flex gap-5">
                {pathname === "/sales" ? <Gamepad color="#0865F0" size={24} /> : <Gamepad size={24} color="black" />}
                <p className="font-semibold">Juega y Gana</p>
            </Link>
            <Link href={"/profile"} onClick={handleToggle} className="flex gap-5">
                {pathname === "/profile" ? <User color="#0865F0" size={24} /> : <User size={24} color="black" />}
                <p className="font-semibold">Mi perfil</p>
            </Link>
            <Link href={"/help"}>
                <div onClick={handleToggle} className="flex gap-5">
                    {pathname === "/help" ? <HelpCircle color="#0865F0" size={24} /> : <HelpCircle size={24} color="black" />}
                    <p className="font-semibold">Ayuda</p>
                </div>
            </Link>
            <div className="flex gap-5 border-b-2 border-gray-300"></div>
            {/* <div onClick={handleToggle} className="flex gap-5">
                {pathname === "/fashion" ? <Shirt color="#0865F0" size={24} /> : <Shirt size={24} color="black" />}
                <p className="font-semibold">Moda</p>
            </div>
            <div onClick={handleToggle} className="flex gap-5">
                {pathname === "/globe" ? <Globe2Icon color="#0865F0" size={24} /> : <Globe2Icon size={24} color="black" />}
                <p className="font-semibold">Compra internacional</p>
            </div>
            <div onClick={handleToggle} className="flex gap-5">
                {pathname === "/bestsellers" ? <Star color="#0865F0" size={24} /> : <Star size={24} color="black" />}
                <p className="font-semibold">Más vendidos</p>
            </div> */}
            <Link href={"/magazine"} onClick={handleToggle} className="flex gap-5">
                {pathname === "/magazine" ? <FileText color="#0865F0" size={24} /> : <FileText size={24} color="black" />}
                <p className="font-semibold">Magazine </p>
            </Link>

            <Link href={"/categories"} onClick={handleToggle} className="flex gap-5">
                {pathname === "/categories" ? <List color="#0865F0" size={24} /> : <List size={24} color="black" />}
                <p className="font-semibold">Categorías</p>
            </Link>
            <div className="flex gap-5 border-b-2 border-gray-300"></div>
            <Link href={"/aboutus"}>
                <p className="font-semibold">Acerca de INK3D</p>
            </Link>
        </div>
    );
}


