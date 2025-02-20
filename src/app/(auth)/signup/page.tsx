"use client";

import { useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc"; // Icono de Google

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    birthday: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    birthday: "",
    username: "",
    password: "",
  });

  // Función para manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    let errorMsg = "";
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errorMsg = "Correo inválido";
    }
    if (name === "birthday" && new Date(value).getFullYear() < 1900) {
      errorMsg = "Fecha inválida";
    }
    if (name === "username" && value.length < 3) {
      errorMsg = "Mínimo 3 caracteres";
    }
    if (name === "password" && value.length < 6) {
      errorMsg = "Mínimo 6 caracteres";
    }

    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).some((err) => err !== "") || Object.values(form).some((val) => val === "")) {
      alert("Corrige los errores antes de continuar");
      return;
    }
    console.log("Formulario enviado:", form);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 bg-black border border-gray-500 rounded-lg shadow-md mt-16 py-8 mb-12">
        
        {/* Logo dentro del formulario */}
        <div className="flex justify-center mb-6">
          <Image src="/LogoInk3d.png" alt="Logo" width={160} height={80} />
        </div>



        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-white">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-2 p-2 rounded bg-gray-800 text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Birthday */}
          <div>
            <label className="text-white">Fecha de nacimiento</label>
            <input
              type="date"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
              className="w-full mt-2 p-2 rounded bg-gray-800 text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.birthday && <p className="text-red-500 text-sm">{errors.birthday}</p>}
          </div>

          {/* Username */}
          <div>
            <label className="text-white">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full mt-2 p-2 rounded bg-gray-800 text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-white">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-2 p-2 rounded bg-gray-800 text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Submit */}
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-500 transition">
            Registrate
          </button>

          {/* Botón de Google */}
          <button className="w-full flex items-center justify-center gap-2 border border-gray-400 text-white p-3 rounded hover:bg-gray-700 transition">
            <FcGoogle size={20} /> Registrarse con Google
          </button>

          {/* Ir al login */}
          <p className="text-center text-gray-400 text-sm mt-4">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Inicia sesión
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
