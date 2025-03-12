"use client"

import { Mixin } from "@/modules/auth/shared/components/MixinAlert";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import { UpdateDataProfileInterface } from "@/modules/auth/shared/interfaces/User.interface";
import { Edit2, User, Mail, Phone, MapPin, Building, Globe } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDate } from "../orders/components/CardOrder.component";

export const ProfileView = () => {
    const {  user } = useAuth()

    const { updateDataUser } = useAuth()
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UpdateDataProfileInterface>({
      phone: user.phone,
      address: user.address,
      city: user.city,
      country: user.country,
      image: user.image,
      email: user.email,
      name: user.name
    });
  
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        await updateDataUser(formData);
        setIsEditing(false);

        setTimeout(()=>{ window.location.reload() }, 500)
        
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
      setFormData(user);
    }, [user]);
  
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Mi perfil</h1>
          <p className="text-gray-600 mt-2">Gestionar su información personal</p>
        </div>
  
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
              <div className="relative">
                <Image
                  src={"/LogoInk3d.webp"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  width={200}
                  height={200}
                />
                <div className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full shadow-lg">
                  <Edit2 className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-600">Miembro desde {formatDate(user.createdAt).split(" ")[4]}</p>
              </div>
            </div>
  
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name ?? "Sin asignar"}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      required
                    />
                  </div>
  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email ?? "Sin asignar"}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      required
                    />
                  </div>
  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone ?? "Sin asignar"}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      required
                    />
                  </div>
  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Domicilio
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address ?? "Sin asignar"}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      required
                    />
                  </div>
  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city ?? "Sin asignar"}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      required
                    />
                  </div>
  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Pais
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country ?? "Sin asignar"}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
  
                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <User className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium">{user.name ?? "Sin asignar"}</p>
                    </div>
                  </div>
  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{user.email ?? "Sin asignar"}</p>
                    </div>
                  </div>
  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{user.phone ?? "Sin asignar"}</p>
                    </div>
                  </div>
  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">{user.address ?? "Sin asignar"}</p>
                    </div>
                  </div>
  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Building className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">City</p>
                      <p className="font-medium">{user.city ?? "Sin asignar"}</p>
                    </div>
                  </div>
  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Country</p>
                      <p className="font-medium">{user.country ?? "Sin asignar"}</p>
                    </div>
                  </div>
                </div>
  
                <div className="flex justify-end pt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  