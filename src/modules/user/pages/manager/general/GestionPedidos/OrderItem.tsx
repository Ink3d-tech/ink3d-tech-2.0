// import React from "react";
// interface OrderDetail {
//   price: string;
//   quantity: number;
//   productId: string;
// }
// interface User {
//   id: string;
//   name: string;
// }
// interface OrderResponse {
//   id: string;
//   status: string;
//   orderDetails: OrderDetail[];
//   user: User;
// }
// interface OrderItemProps {
//   order: OrderResponse;
// }
// const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
//   return (
//     <li key={order.id} className="mb-5 p-4 border border-gray-300 rounded-lg">
//       <div>
//         <h2 className="text-lg font-semibold mb-2">Orden ID: {order.id}</h2>
//         <p><strong>Estado:</strong> {order.status}</p>
//         <p><strong>Nombre del Usuario:</strong> {order.user.name}</p>
        
//         <h3 className="font-semibold mt-3">Detalles de los productos:</h3>
//         <ul className="pl-5">
//           {order.orderDetails.map((detail, index) => (
//             <li key={index}>
//               <p><strong>Producto ID:</strong> {detail.productId} - <strong>Cantidad:</strong> {detail.quantity}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </li>
//   );
// };
// export default OrderItem;






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface Product {
//   id: string;
//   name: string;
// }

// export const fetchProductName = async (productId: string): Promise<string> => {
//   try {
//     const response = await axios.get<Product>(`${API_BACK}/products/${productId}`);
//     return response.data.name;
//   } catch (error) {
//     console.error("Error al obtener el nombre del producto:", error);
//     return "Producto no encontrado";
//   }
// };


// interface OrderDetail {
//   price: string;
//   quantity: number;
//   productId: string;
// }

// interface User {
//   id: string;
//   name: string;
// }

// interface OrderResponse {
//   id: string;
//   status: string;
//   orderDetails: OrderDetail[];
//   user: User;
// }

// interface OrderItemProps {
//   order: OrderResponse;
// }

// const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
//   const [productNames, setProductNames] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchNames = async () => {
//       const names = await Promise.all(
//         order.orderDetails.map(async (detail) => {
//           return await fetchProductName(detail.productId); 
//         })
//       );
//       setProductNames(names); 
//     };

//     fetchNames();
//   }, [order.orderDetails]);

//   return (
//     <li key={order.id} className="mb-5 p-4 border border-gray-300 rounded-lg">
//       <div>
//         <h2 className="text-lg font-semibold mb-2">Orden ID: {order.id}</h2>
//         <p><strong>Estado:</strong> {order.status}</p>
//         <p><strong>Nombre del Usuario:</strong> {order.user.name}</p>
        
//         <h3 className="font-semibold mt-3">Detalles de los productos:</h3>
//         <ul className="pl-5">
//           {order.orderDetails.map((detail, index) => (
//             <li key={index}>
//               <p><strong>Producto:</strong> {productNames[index] || "Cargando..."} - <strong>Cantidad:</strong> {detail.quantity}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </li>
//   );
// };

// export default OrderItem;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface Product {
//   id: string;
//   name: string;
// }

// export const fetchProductName = async (productId: string): Promise<string> => {
//   try {
//     const response = await axios.get<Product>(`${API_BACK}/products/${productId}`);
//     return response.data.name;
//   } catch (error) {
//     console.error("Error al obtener el nombre del producto:", error);
//     return "Producto no encontrado";
//   }
// };
// interface OrderDetail {
//   price: string;
//   quantity: number;
//   productId: string;
// }

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
// }

// export interface OrderResponse {
//   id: string;
//   status: string;
//   totalPrice: string;
//   currency: string;
//   createdAt: string;
//   updatedAt: string;
//   orderDetails: OrderDetail[];
//   discountCode: string | null;
//   externalReference: string;
//   user: User;
// }

// interface OrderItemProps {
//   order: OrderResponse;
// }

// const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
//   const [productNames, setProductNames] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchNames = async () => {
//       const names = await Promise.all(
//         order.orderDetails.map(async (detail) => {
//           return await fetchProductName(detail.productId); // Llama a la API para obtener el nombre del producto
//         })
//       );
//       setProductNames(names); // Actualiza el estado con los nombres de los productos
//     };

//     fetchNames();
//   }, [order.orderDetails]);

//   // Formateo de fechas
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleString(); // Muestra la fecha y hora en un formato legible
//   };

//   return (
//     <li key={order.id} className="mb-5 p-4 border border-gray-300 rounded-lg">
//       <div>
//         <h2 className="text-lg font-semibold mb-2">Orden ID: {order.id}</h2>
//         <p><strong>Estado:</strong> {order.status}</p>
//         <p><strong>Nombre del Usuario:</strong> {order.user.name}</p>
//         <p><strong>Email del Usuario:</strong> {order.user.email}</p>
//         <p><strong>Teléfono:</strong> {order.user.phone}</p>
//         <p><strong>Dirección:</strong> {order.user.address}, {order.user.city}, {order.user.country}</p>

//         <p><strong>Total:</strong> {order.currency} {order.totalPrice}</p>
//         <p><strong>Fecha de Creación:</strong> {formatDate(order.createdAt)}</p>
//         <p><strong>Fecha de Última Actualización:</strong> {formatDate(order.updatedAt)}</p>

//         <h3 className="font-semibold mt-3">Detalles de los productos:</h3>
//         <ul className="pl-5">
//           {order.orderDetails.map((detail, index) => (
//             <li key={index}>
//               <p><strong>Producto:</strong> {productNames[index] || "Cargando..."} - <strong>Cantidad:</strong> {detail.quantity}</p>
//             </li>
//           ))}
//         </ul>

//         <p><strong>Referencia Externa:</strong> {order.externalReference}</p>
//         <p><strong>Código de Descuento:</strong> {order.discountCode || "No aplicó descuento"}</p>
//       </div>
//     </li>
//   );
// };

// export default OrderItem;







import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";

interface Product {
  id: string;
  name: string;
}

export const fetchProductName = async (productId: string): Promise<string> => {
  try {
    const response = await axios.get<Product>(`${API_BACK}/products/${productId}`);
    return response.data.name;
  } catch (error) {
    console.error("Error al obtener el nombre del producto:", error);
    return "Producto no encontrado";
  }
};

interface OrderDetail {
  price: string;
  quantity: number;
  productId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

export interface OrderResponse {
  id: string;
  status: string;
  totalPrice: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
  orderDetails: OrderDetail[];
  discountCode: string | null;
  externalReference: string;
  user: User;
}

interface OrderItemProps {
  order: OrderResponse;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const [productNames, setProductNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchNames = async () => {
      const names = await Promise.all(
        order.orderDetails.map(async (detail) => {
          return await fetchProductName(detail.productId); // Llama a la API para obtener el nombre del producto
        })
      );
      setProductNames(names); // Actualiza el estado con los nombres de los productos
    };

    fetchNames();
  }, [order.orderDetails]);

  // Formateo de fechas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Muestra la fecha y hora en un formato legible
  };

  return (
<li key={order.id} className="mb-4 p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">
  <div className="space-y-3">
    {/* Título y Estado */}
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-800">{order.id}</h2>
      <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${order.status === 'failed' ? 'bg-red-500' : order.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}`}>
        {order.status.toUpperCase()}
      </span>
    </div>

    {/* Información del Usuario */}
    <div className="space-y-1 text-gray-600">
      <p><strong className="font-medium text-gray-800">Nombre:</strong> {order.user.name}</p>
      <p><strong className="font-medium text-gray-800">Email:</strong> {order.user.email}</p>
      <p><strong className="font-medium text-gray-800">Teléfono:</strong> {order.user.phone}</p>
      <p><strong className="font-medium text-gray-800">Dirección:</strong> {order.user.address}, {order.user.city}, {order.user.country}</p>
    </div>

    {/* Información de la Orden */}
    <div className="space-y-1 text-gray-700">
      <p><strong className="font-medium text-gray-800">Total:</strong> {order.currency} {order.totalPrice}</p>
      <p><strong className="font-medium text-gray-800">Fecha de Creación:</strong> {formatDate(order.createdAt)}</p>
      <p><strong className="font-medium text-gray-800">Última Actualización:</strong> {formatDate(order.updatedAt)}</p>
    </div>

    {/* Detalles de los Productos */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mt-3">Detalles de los Productos:</h3>
      <ul className="space-y-1 pl-5">
        {order.orderDetails.map((detail, index) => (
          <li key={index} className="bg-gray-50 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="text-gray-700 font-medium">{productNames[index] || "Cargando..."}</span>
            <span className="text-xs text-gray-500">Cantidad: {detail.quantity}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Información Adicional */}
    <div className="mt-3 text-gray-600">
      <p><strong className="font-medium text-gray-800">Referencia Externa:</strong> {order.externalReference}</p>
      <p><strong className="font-medium text-gray-800">Código de Descuento:</strong> {order.discountCode || "No aplicó descuento"}</p>
    </div>
  </div>
</li>

  );
};

export default OrderItem;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface Product {
//   id: string;
//   name: string;
// }

// export const fetchProductName = async (productId: string): Promise<string> => {
//   try {
//     const response = await axios.get<Product>(${API_BACK}/products/${productId});
//     return response.data.name;
//   } catch (error) {
//     console.error("Error al obtener el nombre del producto:", error);
//     return "Producto no encontrado";
//   }
// };


// interface OrderDetail {
//   price: string;
//   quantity: number;
//   productId: string;
// }

// interface User {
//   id: string;
//   name: string;
// }

// interface OrderResponse {
//   id: string;
//   status: string;
//   orderDetails: OrderDetail[];
//   user: User;
// }

// interface OrderItemProps {
//   order: OrderResponse;
// }

// const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
//   const [productNames, setProductNames] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchNames = async () => {
//       const names = await Promise.all(
//         order.orderDetails.map(async (detail) => {
//           return await fetchProductName(detail.productId); 
//         })
//       );
//       setProductNames(names); 
//     };

//     fetchNames();
//   }, [order.orderDetails]);

//   return (
//     <li key={order.id} className="mb-5 p-4 border border-gray-300 rounded-lg">
//       <div>
//         <h2 className="text-lg font-semibold mb-2">Orden ID: {order.id}</h2>
//         <p><strong>Estado:</strong> {order.status}</p>
//         <p><strong>Nombre del Usuario:</strong> {order.user.name}</p>
// <h3 className="font-semibold mt-3">Detalles de los productos:</h3>
//         <ul className="pl-5">
//           {order.orderDetails.map((detail, index) => (
//             <li key={index}>
//               <p><strong>Producto:</strong> {productNames[index] || "Cargando..."} - <strong>Cantidad:</strong> {detail.quantity}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </li>
//   );
// };