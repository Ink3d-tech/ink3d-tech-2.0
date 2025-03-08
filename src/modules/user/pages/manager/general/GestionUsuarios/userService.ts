// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   isActive: boolean;
//   image?: string | null;
// }

// export interface UsersResponse {
//   allUsers: User[];
// }
// export const fetchUsers = async (
//   searchQuery: string,
//   token: string
// ): Promise<UsersResponse> => {
//   try {
//     const response = await axios.get<UsersResponse>(`${API_BACK}/users`, {
//       params: {
//         search: searchQuery,  
//         page: 0,             
//         limit: 1000,          
//       },
//       headers: {
//         Authorization: `Bearer ${token}`,  
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error al cargar los usuarios:", error);
//     throw error;
//   }
// };

// export const fetchTotalUsers = async (token: string): Promise<number> => {
//   try {
//     const response = await axios.get<{ totalUsers: number }>(`${API_BACK}/users/total`, {
//       headers: {
//         Authorization: `Bearer ${token}`, 
//       },
//     });
//     return response.data.totalUsers;
//   } catch (error) {
//     console.error("Error al obtener el número total de usuarios:", error);
//     throw error;
//   }
// };



import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv"; // Ajusta este import según tu configuración

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  image?: string | null;
}

export interface UsersResponse {
  allUsers: User[];
}

export const fetchUsers = async (
  searchQuery: string,
  token: string
): Promise<UsersResponse> => {
  try {
    const response = await axios.get<UsersResponse>(`${API_BACK}/users`, {
      params: {
        search: searchQuery,
        page: 0,
        limit: 1000,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
    throw error;
  }
};

export const fetchTotalUsers = async (token: string): Promise<number> => {
  try {
    const response = await axios.get<{ totalUsers: number }>(`${API_BACK}/users/total`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.totalUsers;
  } catch (error) {
    console.error("Error al obtener el número total de usuarios:", error);
    throw error;
  }
};




