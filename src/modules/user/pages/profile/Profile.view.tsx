"use client";

import { Mixin } from "@/modules/auth/shared/components/MixinAlert";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import { UpdateDataProfileInterface } from "@/modules/auth/shared/interfaces/User.interface";
import {
  Edit2,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDate } from "../orders/components/CardOrder.component";
import SkeletonProfile from "./SkeletonProfile";

export const ProfileView = () => {
  const { user, updateDataUser, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateDataProfileInterface>(() => ({ ...user }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await updateDataUser(formData);
      setIsEditing(false);

      setTimeout(() => { window.location.reload() }, 500)

      Mixin.fire('Perfil actualizado con éxito')
    } catch (error) {
      console.error('Error updating profile:', error);
      Mixin.fire('No se pudo actualizar el perfil. Inténtalo de nuevo.', "", "error");
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (user) setFormData({ ...user });
  }, [user]);

  if (isLoading) return <SkeletonProfile />

  return (
    <div className="relative">
    <div
      className="absolute inset-0 bg-repeat blur-xl"
      style={{
        backgroundImage: "url('/images/textures/8.jpg')",
        backgroundSize: "1000px",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        filter: "blur(10px)",
      }}
    />
    <div className="absolute inset-0 bg-white/30"></div>
    <div className="relative max-w-4xl mx-auto py-12 px-4">
    {/* Fondo con textura y desenfoque */}

    {/* Contenido principal */}
    <div className="relative z-10 mb-52">
      <div className="mb-8 ">
        
        <h1 className="text-4xl font-bold tracking-tight">Mi perfil</h1>
        <p className="text-black mt-2">Gestionar su información personal</p>
      </div>

      <div className=" rounded-2xl shadow-lg border border-gray-100 bg-black">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="relative">
              <Image
                src={"/LogoInk3d.webp"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow-lg"
                width={200}
                height={200}
              />
              {/* <div className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full shadow-lg">
                <Edit2 className="w-4 h-4" />
              </div> */}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <p className="text-white">Miembro desde {formatDate(user.createdAt).split(" ")[4]}</p>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name ?? "Sin asignar"}
                    onChange={handleChange}
                    className="invalid:border-red-500 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    readOnly // Aquí el email es solo lectura
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-100 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone ?? ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all invalid:border-red-500"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    required
                    placeholder="Ingrese su número (10 dígitos)"
                    title="El número debe tener exactamente 10 dígitos numéricos"
                  />
                  <p className="text-red-500 text-sm mt-1 hidden" id="phone-error">
                    Debe ingresar un número de 10 dígitos.
                  </p>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-100 mb-1">
                    Domicilio
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address ?? "Sin asignar"}
                    onChange={handleChange}
                    className="invalid:border-red-500 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-100 mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city ?? "Sin asignar"}
                    onChange={handleChange}
                    className="invalid:border-red-500 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-100 mb-1">
                    Pais
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country ?? "Sin asignar"}
                    onChange={handleChange}
                    className="invalid:border-red-500 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 rounded-xl border border-gray-300 text-gray-100 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl ">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Nombre</p>
                    <p className="font-medium text-white">{user.name ?? "Sin asignar"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl">
                  <Mail className="w-5 h-5 text-white" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium text-white">{user.email ?? "Sin asignar"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl">
                  <Phone className="w-5 h-5 text-white" />
                  <div>
                    <p className="text-sm text-gray-400">Teléfono</p>
                    <p className="font-medium text-white">{user.phone ?? "Sin asignar"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl">
                  <MapPin className="w-5 h-5 text-white" />
                  <div>
                    <p className="text-sm text-gray-400">Dirección</p>
                    <p className="font-medium text-white">{user.address ?? "Sin asignar"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl">
                  <Building className="w-5 h-5 text-white" />
                  <div>
                    <p className="text-sm text-gray-400">Ciudad</p>
                    <p className="font-medium text-white">{user.city ?? "Sin asignar"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl">
                  <Globe className="w-5 h-5 text-white" />
                  <div>
                    <p className="text-sm text-gray-400">País</p>
                    <p className="font-medium text-white">{user.country ?? "Sin asignar"}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-700 transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  Editar Perfil
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
        {/* <div>
          <CardDiscount discountData={discount[0]}/>
        </div> */}
    </div>
    </div>
    </div>
  );
};
