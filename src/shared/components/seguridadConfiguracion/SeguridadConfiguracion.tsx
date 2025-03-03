import { useState } from "react";

const SeguridadConfiguracion = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("es");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setError("");
    alert("✅ Contraseña actualizada correctamente.");
  };

  return (
    <div className={`p-6 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h2 className="text-3xl font-semibold mb-6 text-red-500">
        ⚙️ {language === "es" ? "Seguridad y Configuración" : "Security & Settings"}
      </h2>

      {/* Cambio de Contraseña */}
      <div className="bg-black p-4 rounded-md shadow-md mb-6 text-black">
        <h3 className=" text-white text-lg font-semibold mb-2">🔑 {language === "es" ? "Cambio de Contraseña (Admin)" : "Admin Password Change"}</h3>
        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder={language === "es" ? "Contraseña actual" : "Current Password"}
            className="p-2 border rounded-md"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={language === "es" ? "Nueva contraseña" : "New Password"}
            className="p-2 border rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={language === "es" ? "Confirmar nueva contraseña" : "Confirm New Password"}
            className="p-2 border rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md">
            {language === "es" ? "Actualizar Contraseña" : "Update Password"}
          </button>
        </form>
      </div>

      {/* Modo Oscuro */}
      <div className="bg-black p-4 rounded-md shadow-md mb-6 text-black">
        <h3 className=" text-white text-lg font-semibold mb-2">🌙 {language === "es" ? "Modo Oscuro" : "Dark Mode"}</h3>
        <label className="flex items-center gap-4">
          <span>{darkMode ? (language === "es" ? "Activado" : "Enabled") : (language === "es" ? "Desactivado" : "Disabled")}</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="toggle-checkbox"
          />
        </label>
      </div>

      {/* Selección de Idioma */}
      <div className=" bg-black p-4 rounded-md shadow-md text-black">
        <h3 className=" text-white text-lg font-semibold mb-2">🌍 {language === "es" ? "Idioma" : "Language"}</h3>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
};

export default SeguridadConfiguracion;
