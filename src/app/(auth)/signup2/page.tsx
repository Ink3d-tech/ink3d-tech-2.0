"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    let errorMsg = "";
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errorMsg = "Correo inválido";
    }
    if (name === "name" && value.length < 3) {
      errorMsg = "Mínimo 3 caracteres";
    }
    if (name === "password" && value.length < 6) {
      errorMsg = "Mínimo 6 caracteres";
    }
    if (name === "confirmPassword" && value !== form.password) {
      errorMsg = "Las contraseñas no coinciden";
    }

    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      Object.values(errors).some((err) => err !== "") ||
      Object.values(form).some((val) => val === "")
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Corrige los errores antes de continuar",
      });
      return;
    }

    try {
      const response = await fetch(
        "https://project-ink3d-back-1.onrender.com/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en el registro");
      }

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Tu cuenta ha sido creada con éxito",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        router.push("/login"); // 🔥 Redirige al home después del registro exitoso
      });

    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error.message
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 bg-black border border-gray-500 rounded-lg shadow-md mt-16 py-8 mb-12">
        
        <div className="flex justify-center mb-6">
          <Image src="/LogoInk3d.png" alt="Logo" width={160} height={80} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-white">Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-2 p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="text-white">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-2 p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="text-white">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-2 p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div>
            <label className="text-white">Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full mt-2 p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-500 transition"
          >
            Registrarse
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-400 text-white p-3 rounded hover:bg-gray-700 transition"
            onClick={() => Swal.fire("Función no disponible aún")}
          >
            <FcGoogle size={20} /> Registrarse con Google
          </button>

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
