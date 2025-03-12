"use client";

import React, { useState, useRef, useEffect } from "react";
import { LogOut, Settings, User, HelpCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import Image from "next/image";

interface UserMenuProps {
  avatarUrl: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ avatarUrl }) => {
  const { logout, getIsAdmin, token } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const handleLogout = () => {
    logout();
    setDropdownVisible(false);
  };

  const closeDropdown = () => setDropdownVisible(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar que abre/cierra el menú */}
      <div className="cursor-pointer" onClick={toggleDropdown}>
        <Image
          src={avatarUrl}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      {/* Menú desplegable */}
      {dropdownVisible && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-[100]">
          <div className="p-4">
            {getIsAdmin(token) && (
              <Link onClick={closeDropdown} href="/manager" className="flex gap-2 items-center text-gray-700 hover:text-black">
                <Settings size={20} /> 
                <span>Panel de administrador</span>
              </Link>
            )}
            <Link onClick={closeDropdown} href="/profile" className="flex gap-2 items-center text-gray-700 hover:text-black mt-2">
              <User size={20} />
              <span>Mi perfil</span>
            </Link>
            <Link onClick={closeDropdown} href="/orders" className="flex gap-2 items-center text-gray-700 hover:text-black mt-2">
              <ShoppingBag size={20} />
              <span>Mis compras</span>
            </Link>
            <Link onClick={closeDropdown} href="/help" className="flex gap-2 items-center text-gray-700 hover:text-black mt-2">
              <HelpCircle size={20} />
              <span>Ayuda</span>
            </Link>
            <button onClick={handleLogout} className="flex gap-2 items-center text-gray-700 hover:text-black mt-2 w-full text-left">
              <LogOut size={20} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
