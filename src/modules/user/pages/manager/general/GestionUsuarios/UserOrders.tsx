// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface OrderDetail {
//   quantity: number;
//   productId: string;
//   priceAtPurchase: string;
// }

// interface Order {
//   id: string;
//   status: string;
//   totalPrice: string;
//   currency: string;
//   createdAt: string;
//   orderDetails: OrderDetail[];
//   discountCode: string | null;
// }

// interface OrdersResponse {
//   orders: Order[];
// }

// interface UserOrdersProps {
//   userId: string;
// }

// export default function UserOrders({ userId }: UserOrdersProps) {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

//   const fetchOrders = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.get<OrdersResponse>(`${API_BACK}/users/${userId}/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setOrders(response.data.orders || []);
//     } catch (err) {
//       setError("Error al cargar las órdenes.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) fetchOrders();
//   }, [userId]);

//   return (
//     <div className="mt-4">
//       <h3 className="text-2xl font-bold mb-2">📦 Órdenes del Usuario</h3>

//       {loading && <p>Cargando órdenes...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <table className="w-full bg-gray-100 p-4 rounded-lg">
//         <thead>
//           <tr>
//             <th>ID Orden</th>
//             <th>Estado</th>
//             <th>Total</th>
//             <th>Fecha</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.length > 0 ? (
//             orders.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>{order.status === "pending" ? "⏳ Pendiente" : "✅ Completado"}</td>
//                 <td>
//                   {order.totalPrice} {order.currency}
//                 </td>
//                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={4} className="text-center">
//                 No hay órdenes disponibles.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface OrderDetail {
//   quantity: number;
//   productId: string;
//   priceAtPurchase: string;
// }

// interface Order {
//   id: string;
//   status: string;
//   totalPrice: string;
//   currency: string;
//   createdAt: string;
//   orderDetails: OrderDetail[];
//   userId: string; // Asegúrate de que cada orden tiene un userId
//   discountCode: string | null;
// }

// interface OrdersResponse {
//   orders: Order[] | null; // Cambié a `null` para manejar el caso en que no venga
// }

// interface UserOrdersProps {
//   userId: string;
// }

// export default function UserOrders({ userId }: UserOrdersProps) {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

//   const fetchOrders = async () => {
//     setLoading(true);
//     setError("");

//     if (!token) {
//       setError("Token no encontrado.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get<OrdersResponse>(`${API_BACK}/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Verificar que la respuesta contiene la propiedad `orders` como un arreglo
//       if (response.data?.orders && Array.isArray(response.data.orders)) {
//         // Filtrar las órdenes por userId
//         const filteredOrders = response.data.orders.filter((order) => order.userId === userId);
//         setOrders(filteredOrders);
//       } else {
//         setError("No se encontraron órdenes o la respuesta no es válida.");
//       }
//     } catch (err) {
//       setError("Error al cargar las órdenes.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) fetchOrders();
//   }, [userId]);

//   return (
//     <div className="mt-4">
//       {loading && <p>Cargando órdenes...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <table className="w-full bg-gray-100 p-4 rounded-lg">
//         <thead>
//           <tr>
//             <th>ID Orden</th>
//             <th>Estado</th>
//             <th>Total</th>
//             <th>Fecha</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.length > 0 ? (
//             orders.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>{order.status === "pending" ? "⏳ Pendiente" : "✅ Completado"}</td>
//                 <td>
//                   {order.totalPrice} {order.currency}
//                 </td>
//                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={4} className="text-center">
//                 No hay órdenes disponibles.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }








// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface OrderDetail {
//   quantity: number;
//   productId: string;
//   priceAtPurchase: string;
// }

// interface Order {
//   id: string;
//   status: string;
//   totalPrice: string;
//   currency: string;
//   createdAt: string;
//   orderDetails: OrderDetail[];
//   userId: string; // Este sigue siendo necesario, pero ya no se filtra por él
//   discountCode: string | null;
// }

// interface OrdersResponse {
//   orders: Order[] | null;
// }

// export default function UserOrders() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Obtener el token del usuario logueado
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

//   const fetchOrders = async () => {
//     setLoading(true);
//     setError("");

//     if (!token) {
//       setError("Token no encontrado.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Aquí hacemos la solicitud para obtener todas las órdenes, no filtrar por usuario
//       const response = await axios.get<OrdersResponse>(`${API_BACK}/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Verificamos si la respuesta contiene las órdenes
//       if (response.data?.orders && Array.isArray(response.data.orders)) {
//         setOrders(response.data.orders); // Asignamos todas las órdenes a estado
//       } else {
//         setError("No se encontraron órdenes o la respuesta no es válida.");
//       }
//     } catch (err) {
//       setError("Error al cargar las órdenes.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders(); // Esto se ejecuta cuando el componente se monta
//   }, []);

//   return (
//     <div className="mt-4">
//       {loading && <p>Cargando órdenes...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <table className="w-full bg-gray-100 p-4 rounded-lg">
//         <thead>
//           <tr>
//             <th>ID Orden</th>
//             <th>Estado</th>
//             <th>Total</th>
//             <th>Fecha</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.length > 0 ? (
//             orders.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>{order.status === "pending" ? "⏳ Pendiente" : "✅ Completado"}</td>
//                 <td>
//                   {order.totalPrice} {order.currency}
//                 </td>
//                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={4} className="text-center">
//                 No hay órdenes disponibles.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface OrderDetail {
//   quantity: number;
//   productId: string;
//   priceAtPurchase: string;
// }

// interface Order {
//   id: string;
//   status: string;
//   totalPrice: string;
//   currency: string;
//   createdAt: string;
//   orderDetails: OrderDetail[];
//   userId: string;
//   discountCode: string | null;
// }

// interface OrdersResponse {
//   orders: Order[] | null;
// }

// interface UserOrdersProps {
//   userId: string; // Aunque no lo usemos para filtrar, lo dejamos para la interfaz
// }

// export default function UserOrders({ userId }: UserOrdersProps) {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

//   const fetchOrders = async () => {
//     setLoading(true);
//     setError("");

//     if (!token) {
//       setError("Token no encontrado.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Aquí hacemos la solicitud para obtener todas las órdenes, sin filtrar por userId
//       const response = await axios.get<OrdersResponse>(`${API_BACK}/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Verificamos si la respuesta contiene las órdenes
//       if (response.data?.orders && Array.isArray(response.data.orders)) {
//         setOrders(response.data.orders); // Asignamos todas las órdenes al estado
//       } else {
//         setError("No se encontraron órdenes o la respuesta no es válida.");
//       }
//     } catch (err) {
//       setError("Error al cargar las órdenes.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders(); // Esto se ejecuta cuando el componente se monta
//   }, []);

//   return (
//     <div className="mt-4">
//       {loading && <p>Cargando órdenes...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <table className="w-full bg-gray-100 p-4 rounded-lg">
//         <thead>
//           <tr>
//             <th>ID Orden</th>
//             <th>Estado</th>
//             <th>Total</th>
//             <th>Fecha</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.length > 0 ? (
//             orders.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>{order.status === "pending" ? "⏳ Pendiente" : "✅ Completado"}</td>
//                 <td>
//                   {order.totalPrice} {order.currency}
//                 </td>
//                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={4} className="text-center">
//                 No hay órdenes disponibles.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface OrderDetail {
//   quantity: number;
//   productId: string;
//   priceAtPurchase: string;
// }

// interface Order {
//   id: string;
//   status: string;
//   totalPrice: string;
//   currency: string;
//   createdAt: string;
//   orderDetails: OrderDetail[];
//   userId: string;
//   discountCode: string | null;
// }

// interface OrdersResponse {
//   orders: Order[] | null;
// }

// interface UserOrdersProps {
//   userId: string;
// }

// export default function UserOrders({ userId }: UserOrdersProps) {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
//   console.log("Token encontrado:", token);  // Verifica si el token existe

//   const fetchOrders = async () => {
//     setLoading(true);
//     setError("");

//     if (!token) {
//       setError("Token no encontrado.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get<OrdersResponse>(`${API_BACK}/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Respuesta de la API:", response.data);  // Verifica qué datos devuelve la API

//       if (response.data?.orders && Array.isArray(response.data.orders)) {
//         setOrders(response.data.orders);
//       } else {
//         setError("No se encontraron órdenes o la respuesta no es válida.");
//       }
//     } catch (err) {
//       setError("Error al cargar las órdenes.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders(); // Esto se ejecuta cuando el componente se monta
//   }, []);

//   return (
//     <div className="mt-4">
//       {loading && <p>Cargando órdenes...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <table className="w-full bg-gray-100 p-4 rounded-lg">
//         <thead>
//           <tr>
//             <th>ID Orden</th>
//             <th>Estado</th>
//             <th>Total</th>
//             <th>Fecha</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.length > 0 ? (
//             orders.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>{order.status === "pending" ? "⏳ Pendiente" : "✅ Completado"}</td>
//                 <td>
//                   {order.totalPrice} {order.currency}
//                 </td>
//                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={4} className="text-center">
//                 No hay órdenes disponibles.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface OrderDetail {
//   quantity: number;
//   productId: string;
//   priceAtPurchase: string;
// }

// interface Order {
//   id: string;
//   status: string;
//   totalPrice: string;
//   currency: string;
//   createdAt: string;
//   orderDetails: OrderDetail[];
//   userId: string;
//   discountCode: string | null;
// }

// interface OrdersResponse {
//   orders: Order[] | null;  // Las órdenes pueden ser un arreglo o null
// }

// interface UserOrdersProps {
//   userId: string;
// }

// export default function UserOrders({ userId }: UserOrdersProps) {
//   const [orders, setOrders] = useState<Order[]>([]);  // Aseguramos que orders es siempre un arreglo
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
//   console.log("Token encontrado:", token);  // Verifica si el token existe

//   const fetchOrders = async () => {
//     setLoading(true);
//     setError("");

//     if (!token) {
//       setError("Token no encontrado.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get<OrdersResponse>(`${API_BACK}/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Respuesta de la API:", response.data);  // Verifica qué datos devuelve la API

//       // Si la API devuelve un array de órdenes, lo asignamos al estado
//       if (response.data?.orders && Array.isArray(response.data.orders)) {
//         setOrders(response.data.orders);
//       } else {
//         // Si no hay órdenes o la respuesta no es válida, mostramos un mensaje de error
//         setError("No se encontraron órdenes o la respuesta no es válida.");
//       }
//     } catch (err) {
//       // Si hay un error en la solicitud, mostramos un mensaje de error
//       setError("Error al cargar las órdenes.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders(); // Esto se ejecuta cuando el componente se monta
//   }, []);  // Solo se ejecuta una vez cuando el componente se monta

//   return (
//     <div className="mt-4">
//       {loading && <p>Cargando órdenes...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <table className="w-full bg-gray-100 p-4 rounded-lg">
//         <thead>
//           <tr>
//             <th>ID Orden</th>
//             <th>Estado</th>
//             <th>Total</th>
//             <th>Fecha</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.length > 0 ? (
//             orders.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>{order.status === "pending" ? "⏳ Pendiente" : "✅ Completado"}</td>
//                 <td>
//                   {order.totalPrice} {order.currency}
//                 </td>
//                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={4} className="text-center">
//                 No hay órdenes disponibles.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface OrderDetail {
//   quantity: number;
//   productId: string;
//   priceAtPurchase: string;
// }

// interface Order {
//   id: string;
//   status: string;
//   totalPrice: string;
//   currency: string;
//   createdAt: string;
//   orderDetails: OrderDetail[];
//   userId: string;
//   discountCode: string | null;
// }

// interface OrdersResponse {
//   orders: Order[] | Order | null;  // Puede ser un solo objeto o un array de órdenes
// }

// interface UserOrdersProps {
//   userId: string;
// }

// export default function UserOrders({ userId }: UserOrdersProps) {
//   const [orders, setOrders] = useState<Order[]>([]);  // Aseguramos que orders sea siempre un arreglo
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
//   console.log("Token encontrado:", token);  // Verifica si el token existe

//   const fetchOrders = async () => {
//     setLoading(true);
//     setError("");

//     if (!token) {
//       setError("Token no encontrado.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get<OrdersResponse>(`${API_BACK}/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Respuesta de la API:", response.data);  // Verifica qué datos devuelve la API

//       // Si la API devuelve un solo objeto de orden, lo convertimos en un array para facilitar el renderizado
//       const ordersData = response.data?.orders ? (Array.isArray(response.data.orders) ? response.data.orders : [response.data.orders]) : [];
      
//       if (ordersData.length > 0) {
//         setOrders(ordersData);
//       } else {
//         setError("No se encontraron órdenes o la respuesta no es válida.");
//       }
//     } catch (err) {
//       setError("Error al cargar las órdenes.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders(); // Esto se ejecuta cuando el componente se monta
//   }, []);  // Solo se ejecuta una vez cuando el componente se monta

//   return (
//     <div className="mt-4">
//       {loading && <p>Cargando órdenes...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <table className="w-full bg-gray-100 p-4 rounded-lg">
//         <thead>
//           <tr>
//             <th>ID Orden</th>
//             <th>Estado</th>
//             <th>Total</th>
//             <th>Fecha</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.length > 0 ? (
//             orders.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>{order.status === "pending" ? "⏳ Pendiente" : "✅ Completado"}</td>
//                 <td>
//                   {order.totalPrice} {order.currency}
//                 </td>
//                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={4} className="text-center">
//                 No hay órdenes disponibles.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface OrderDetail {
//   quantity: number;
//   productId: string;
//   priceAtPurchase: string;
// }

// interface Order {
//   id: string;
//   status: string;
//   totalPrice: string;
//   currency: string;
//   createdAt: string;
//   orderDetails: OrderDetail[];
//   userId: string;
//   discountCode: string | null;
// }

// interface OrdersResponse {
//   orders: Order | null;  // Cambié a un solo objeto de orden
// }

// interface UserOrdersProps {
//   userId: string;
// }

// export default function UserOrders({ userId }: UserOrdersProps) {
//   const [order, setOrder] = useState<Order | null>(null);  // Cambio para manejar un solo pedido
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
//   console.log("Token encontrado:", token);  // Verifica si el token existe

//   const fetchOrders = async () => {
//     setLoading(true);
//     setError("");

//     if (!token) {
//       setError("Token no encontrado.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get<OrdersResponse>(`${API_BACK}/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Respuesta de la API:", response.data);  // Verifica qué datos devuelve la API

//       // Si la API devuelve una sola orden, se asigna directamente
//       if (response.data?.orders) {
//         setOrder(response.data.orders);
//       } else {
//         setError("No se encontró la orden o la respuesta no es válida.");
//       }
//     } catch (err) {
//       setError("Error al cargar la orden.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders(); // Esto se ejecuta cuando el componente se monta
//   }, []);  // Solo se ejecuta una vez cuando el componente se monta

//   return (
//     <div className="mt-4">
//       {loading && <p>Cargando órdenes...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {order ? (
//         <table className="w-full bg-gray-100 p-4 rounded-lg">
//           <thead>
//             <tr>
//               <th>ID Orden</th>
//               <th>Estado</th>
//               <th>Total</th>
//               <th>Fecha</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr key={order.id}>
//               <td>{order.id}</td>
//               <td>{order.status === "pending" ? "⏳ Pendiente" : "✅ Completado"}</td>
//               <td>
//                 {order.totalPrice} {order.currency}
//               </td>
//               <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//             </tr>
//           </tbody>
//         </table>
//       ) : (
//         <p>No hay órdenes disponibles.</p>
//       )}
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface OrderDetail {
//   quantity: number;
//   productId: string;
//   priceAtPurchase: string;
// }

// interface Order {
//   id: string;
//   status: string;
//   totalPrice: string;
//   currency: string;
//   createdAt: string;
//   orderDetails: OrderDetail[];
//   userId: string;
//   discountCode: string | null;
// }

// interface OrdersResponse {
//   orders: Order | null;  // Cambié a un solo objeto de orden
// }

// interface UserOrdersProps {
//   userId: string;
// }

// export default function UserOrders({ userId }: UserOrdersProps) {
//   const [order, setOrder] = useState<Order | null>(null);  // Cambio para manejar un solo pedido
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
//   console.log("Token encontrado:", token);  // Verifica si el token existe

//   const fetchOrders = async () => {
//     setLoading(true);
//     setError("");

//     if (!token) {
//       setError("Token no encontrado.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get<OrdersResponse>(`${API_BACK}/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Respuesta de la API:", response.data);  // Verifica qué datos devuelve la API

//       // Si la API devuelve una sola orden, se asigna directamente
//       if (response.data?.orders) {
//         setOrder(response.data.orders);
//       } else {
//         setError("No se encontró la orden o la respuesta no es válida.");
//       }
//     } catch (err) {
//       setError("Error al cargar la orden.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders(); // Esto se ejecuta cuando el componente se monta
//   }, []);  // Solo se ejecuta una vez cuando el componente se monta

//   return (
//     <div className="mt-4">
//       {loading && <p>Cargando órdenes...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {order ? (
//         <table className="w-full bg-gray-100 p-4 rounded-lg">
//           <thead>
//             <tr>
//               <th>ID Orden</th>
//               <th>Estado</th>
//               <th>Total</th>
//               <th>Productos</th>  {/* Cambié "Fecha" por "Productos" */}
//             </tr>
//           </thead>
//           <tbody>
//             <tr key={order.id}>
//               <td>{order.id}</td>
//               <td>{order.status === "pending" ? "⏳ Pendiente" : "✅ Completado"}</td>
//               <td>
//                 {order.totalPrice} {order.currency}
//               </td>
//               <td>
//                 {/* Aquí mostramos los detalles de los productos */}
//                 {order.orderDetails.map((detail) => (
//                   <div key={detail.productId}>
//                     Producto ID: {detail.productId} - Cantidad: {detail.quantity} - Precio: {detail.priceAtPurchase} {order.currency}
//                   </div>
//                 ))}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       ) : (
//         <p>No hay órdenes disponibles.</p>
//       )}
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface OrderDetail {
//   quantity: number;
//   productId: string;
//   priceAtPurchase: string;
// }

// interface Order {
//   id: string;
//   status: string;
//   totalPrice: string;
//   currency: string;
//   createdAt: string;
//   orderDetails: OrderDetail[];  // Esto es una lista de productos en la orden
//   userId: string;
//   discountCode: string | null;
// }

// interface OrdersResponse {
//   orders: Order | null;  // Un solo objeto de orden
// }

// interface UserOrdersProps {
//   userId: string;
// }

// export default function UserOrders({ userId }: UserOrdersProps) {
//   const [order, setOrder] = useState<Order | null>(null);  // Cambio para manejar un solo pedido
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
//   console.log("Token encontrado:", token);  // Verifica si el token existe

//   const fetchOrders = async () => {
//     setLoading(true);
//     setError("");

//     if (!token) {
//       setError("Token no encontrado.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get<OrdersResponse>(`${API_BACK}/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Respuesta de la API:", response.data);  // Verifica qué datos devuelve la API

//       // Si la API devuelve una sola orden, se asigna directamente
//       if (response.data?.orders) {
//         setOrder(response.data.orders);
//       } else {
//         setError("No se encontró la orden o la respuesta no es válida.");
//       }
//     } catch (err) {
//       setError("Error al cargar la orden.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders(); // Esto se ejecuta cuando el componente se monta
//   }, []);  // Solo se ejecuta una vez cuando el componente se monta

//   return (
//     <div className="mt-4">
//       {loading && <p>Cargando órdenes...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {order ? (
//         <table className="w-full bg-gray-100 p-4 rounded-lg">
//           <thead>
//             <tr>
//               <th>ID Orden</th>
//               <th>Estado</th>
//               <th>Total</th>
//               <th>Productos</th>  {/* Cambié "Fecha" por "Productos" */}
//             </tr>
//           </thead>
//           <tbody>
//             <tr key={order.id}>
//               <td>{order.id}</td>
//               <td>{order.status === "pending" ? "⏳ Pendiente" : "✅ Completado"}</td>
//               <td>
//                 {order.totalPrice} {order.currency}
//               </td>
//               <td>
//                 {/* Aquí mostramos los detalles de los productos */}
//                 {order.orderDetails.length > 0 ? (
//                   order.orderDetails.map((detail, index) => (
//                     <div key={index}>
//                       Producto ID: {detail.productId} - Cantidad: {detail.quantity} - Precio: {detail.priceAtPurchase} {order.currency}
//                     </div>
//                   ))
//                 ) : (
//                   <p>No hay productos en esta orden.</p>
//                 )}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       ) : (
//         <p>No hay órdenes disponibles.</p>
//       )}
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface OrderDetail {
//   quantity: number;
//   productId: string;
//   priceAtPurchase: string;
// }

// interface Order {
//   id: string;
//   status: string;
//   totalPrice: string;
//   currency: string;
//   createdAt: string;
//   orderDetails: OrderDetail[];  // Esto es una lista de productos en la orden
//   userId: string;
//   discountCode: string | null;
// }

// interface OrdersResponse {
//   orders: Order[];  // Cambié esto para que devuelvas un array de órdenes
// }

// interface UserOrdersProps {
//   userId: string;
// }

// export default function UserOrders({ userId }: UserOrdersProps) {
//   const [orders, setOrders] = useState<Order[]>([]);  // Cambio para manejar varias órdenes
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
//   console.log("Token encontrado:", token);  // Verifica si el token existe

//   const fetchOrders = async () => {
//     setLoading(true);
//     setError("");

//     if (!token) {
//       setError("Token no encontrado.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get<OrdersResponse>(`${API_BACK}/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { userId }, // Se filtra por userId
//       });

//       console.log("Respuesta de la API:", response.data);  // Verifica qué datos devuelve la API

//       // Si la API devuelve órdenes, se asignan directamente
//       if (response.data?.orders) {
//         setOrders(response.data.orders);
//       } else {
//         setError("No se encontraron órdenes para este usuario.");
//       }
//     } catch (err) {
//       setError("Error al cargar las órdenes.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchOrders(); // Esto se ejecuta cuando el componente se monta o cuando cambia el userId
//     }
//   }, [userId]);  // Solo se ejecuta cuando cambia el userId

//   return (
//     <div className="mt-4">
//       {loading && <p>Cargando órdenes...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {orders.length > 0 ? (
//         <table className="w-full bg-gray-100 p-4 rounded-lg">
//           <thead>
//             <tr>
//               <th>ID Orden</th>
//               <th>Estado</th>
//               <th>Total</th>
//               <th>Productos</th>  {/* Cambié "Fecha" por "Productos" */}
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>{order.status === "pending" ? "⏳ Pendiente" : "✅ Completado"}</td>
//                 <td>
//                   {order.totalPrice} {order.currency}
//                 </td>
//                 <td>
//                   {/* Aquí mostramos los detalles de los productos */}
//                   {order.orderDetails.length > 0 ? (
//                     order.orderDetails.map((detail, index) => (
//                       <div key={index}>
//                         Producto ID: {detail.productId} - Cantidad: {detail.quantity} - Precio: {detail.priceAtPurchase} {order.currency}
//                       </div>
//                     ))
//                   ) : (
//                     <p>No hay productos en esta orden.</p>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No hay órdenes disponibles.</p>
//       )}
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";

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

interface UserOrdersProps {
  userId: string;
}

export default function UserOrders({ userId }: UserOrdersProps) {
  const [orders, setOrders] = useState<OrderResponse[]>([]); // Estado para almacenar las órdenes
  const [loading, setLoading] = useState<boolean>(true); // Estado para cargar datos
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    // Recuperamos el token desde localStorage
    const token = localStorage.getItem('token'); // Asegúrate de que el nombre es correcto

    if (!token) {
      setError('No se ha encontrado el token de autenticación.');
      setLoading(false);
      return;
    }

    // Función para obtener las órdenes
    const fetchOrders = async () => {
      try {
        const response = await axios.get<OrderResponse[]>(`${API_BACK}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Filtramos las órdenes para obtener solo las del usuario actual
        const userOrders = response.data.filter(order => order.user.id === userId);
        
        setOrders(userOrders); // Guardamos las órdenes filtradas en el estado
        setLoading(false); // Dejamos de cargar los datos
      } catch (err) {
        setError("Hubo un error al obtener las órdenes.");
        setLoading(false); // Dejamos de cargar si hubo error
      }
    };

    fetchOrders(); // Llamamos la función para obtener los pedidos
  }, [userId]); // Dependemos de userId para hacer el efecto cuando cambia

  // Renderizado condicional según el estado de carga o error
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Lista de Órdenes</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {orders.map((order) => (
          <li key={order.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <div>
              <h2 style={{ fontSize: '1.2em', marginBottom: '8px' }}>Orden ID: {order.id}</h2>
              <p><strong>Estado:</strong> {order.status}</p>
              <p><strong>Nombre del Usuario:</strong> {order.user.name}</p>

              <h3>Detalles de los productos:</h3>
              <ul style={{ paddingLeft: '20px' }}>
                {order.orderDetails.map((detail, index) => (
                  <li key={index}>
                    <p><strong>Producto ID:</strong> {detail.productId} - <strong>Cantidad:</strong> {detail.quantity}</p>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
