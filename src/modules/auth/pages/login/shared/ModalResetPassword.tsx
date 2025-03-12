import { Mixin } from "@/modules/auth/shared/components/MixinAlert";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import { X, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ModalResetPassword({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [formData, setFormData] = useState({ email: "" });

  const { sendEmailResetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Enviar el correo para recuperar la contraseña
    await sendEmailResetPassword(formData.email);
    console.log("Form submitted:", formData);
    Mixin.fire("Correo enviado", "", "success");
    setFormData({ email: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-4">
        <div className="border-b border-gray-100 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-xl font-bold">Recuperar contraseña</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Asegúrate de que este formulario no esté dentro de otro formulario */}
        <form onSubmit={handleSubmit} className="p-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingrese su correo electrónico"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold 
                      hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200
                      flex items-center justify-center gap-2"
          >
            Recuperar contraseña
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
