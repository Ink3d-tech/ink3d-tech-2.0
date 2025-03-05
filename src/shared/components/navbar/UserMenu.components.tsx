"use client";

import React, { useState } from "react";
import { LogOut, Settings, User, HelpCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import Image from "next/image";

interface UserMenu {
  avatarUrl: string;
}

const UserMenu: React.FC<UserMenu> = ({ avatarUrl }) => {
  const { logout } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const handleLogout = () => {
    logout();
    setDropdownVisible(false); 
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onClick={toggleDropdown}
      >
        <Image
          src={avatarUrl}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      {dropdownVisible && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-[100]">
          <div className="p-4">
            <Link
              href="/manager"
              className="flex gap-2 items-center text-gray-700 hover:text-black"
            >
              <Settings size={20} /> 
              <span>Panel de administrador</span>
            </Link>
            <Link
              href="/account"
              className="flex gap-2 items-center text-gray-700 hover:text-black mt-2"
            >
              <User size={20} />
              <span>Mi cuenta</span>
            </Link>
            <Link
              href="/orders"
              className="flex gap-2 items-center text-gray-700 hover:text-black mt-2"
            >
              <ShoppingBag size={20} />
              <span>Mis compras</span>
            </Link>
            <Link
              href="/help"
              className="flex gap-2 items-center text-gray-700 hover:text-black mt-2"
            >
              <HelpCircle size={20} />
              <span>Ayuda</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex gap-2 items-center text-gray-700 hover:text-black mt-2 w-full text-left"
            >
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
