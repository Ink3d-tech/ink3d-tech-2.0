// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";


// interface FormData {
//   author: string;
//   title: string;
//   description: string;
//   image: string; 
// }

// export default function FormMagazine() {
//   const [formData, setFormData] = useState<FormData>({
//     author: "",
//     title: "",
//     description: "",
//     image: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   const formDataToSend = {
//     title: formData.title,
//     content: formData.description,
//     image: formData.image, 
//     author: formData.author,
//   };

//   try {
//     const { data } = await axios.post(
//       "${API_BACK}/api/magazine",
//       formDataToSend, 
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Artículo publicado:", data);

//     // Resetear formulario después de enviar
//     setFormData({ author: "", title: "", description: "", image: "" });

//   } catch (error: any) {
//     console.error("Error al enviar el formulario:", error.response?.data || error.message);
//   }
// };

//   // Editar artículo (simulado)
//   const handleEdit = () => {
//     alert("Función de edición en desarrollo...");
//   };

//   // Eliminar artículo (simulado)
//   const handleDelete = () => {
//     alert("Función de eliminación en desarrollo...");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-md">
//       <label className="block">
//         Autor:
//         <input 
//           type="text" 
//           name="author" 
//           value={formData.author} 
//           onChange={handleChange} 
//           className="border p-2 w-full" 
//           required 
//         />
//       </label>

//       <label className="block">
//         Título:
//         <input 
//           type="text" 
//           name="title" 
//           value={formData.title} 
//           onChange={handleChange} 
//           className="border p-2 w-full" 
//           required 
//         />
//       </label>

//       <label className="block">
//         Descripción:
//         <textarea 
//           name="description" 
//           value={formData.description} 
//           onChange={handleChange} 
//           className="border p-2 w-full bg-pink" 
//           required 
//         ></textarea>
//       </label>

//       <label className="block">
//         📷 URL de Imagen:
//         <input 
//           type="text" 
//           name="image" 
//           value={formData.image} 
//           onChange={handleChange} 
//           className="border p-2 w-full" 
//           placeholder="https://example.com/image.jpg" 
//           required 
//         />
//       </label>

//       {/* Botones de acción */}
//       <div className="flex gap-3 mt-3">
//         <button 
//           type="submit" 
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//         >
//           Publicar
//         </button>
//         <button 
//           type="button" 
//           onClick={handleDelete} 
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//         >
//           Eliminar
//         </button>
//         <button 
//           type="button" 
//           onClick={handleEdit} 
//           className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
//         >
//           Editar
//         </button>
//       </div>
//     </form>
//   );
// }


"use client";
import { useState } from "react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";

interface FormData {
  author: string;
  title: string;
  description: string;
  image: string;
}

export default function FormMagazine() {
  const [formData, setFormData] = useState<FormData>({
    author: "",
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = {
      title: formData.title,
      content: formData.description,
      image: formData.image,
      author: formData.author,
    };

    try {
      await axios.post(`${API_BACK}/api/magazine`, formDataToSend, {
        headers: { "Content-Type": "application/json" },
      });

      setFormData({ author: "", title: "", description: "", image: "" });
    } catch (error: unknown) {
      // No mostrar nada, pero podrías descomentar el siguiente log en desarrollo:
      // console.error("Error al enviar el formulario:", error);
    }
  };

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-md">
      <label className="block">
        Autor:
        <input type="text" name="author" value={formData.author} onChange={handleChange} className="border p-2 w-full" required />
      </label>

      <label className="block">
        Título:
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="border p-2 w-full" required />
      </label>

      <label className="block">
        Descripción:
        <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full" required />
      </label>

      <label className="block">
        📷 URL de Imagen:
        <input type="text" name="image" value={formData.image} onChange={handleChange} className="border p-2 w-full" placeholder="https://example.com/image.jpg" required />
      </label>

      <div className="flex gap-3 mt-3">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Publicar</button>
        <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Eliminar</button>
        <button type="button" onClick={handleEdit} className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition">Editar</button>
      </div>
    </form>
  );
}
