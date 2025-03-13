import React from "react";
interface OrderDetail {
  price: string;
  quantity: number;
  productId: string;
}
interface User {
  id: string;
  name: string;
}
interface OrderResponse {
  id: string;
  status: string;
  orderDetails: OrderDetail[];
  user: User;
}
interface OrderItemProps {
  order: OrderResponse;
}
const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  return (
    <li key={order.id} className="mb-5 p-4 border border-gray-300 rounded-lg">
      <div>
        <h2 className="text-lg font-semibold mb-2">Orden ID: {order.id}</h2>
        <p><strong>Estado:</strong> {order.status}</p>
        <p><strong>Nombre del Usuario:</strong> {order.user.name}</p>
        
        <h3 className="font-semibold mt-3">Detalles de los productos:</h3>
        <ul className="pl-5">
          {order.orderDetails.map((detail, index) => (
            <li key={index}>
              <p><strong>Producto ID:</strong> {detail.productId} - <strong>Cantidad:</strong> {detail.quantity}</p>
            </li>
          ))}
        </ul>
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