"use client";

import { fetchUsers, User } from "./userService";
import { API_BACK } from "@/shared/config/api/getEnv";
import axios from "axios";
import UserOrders from "./UserOrders";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import SkeletonTable from "./SkeletonUser";

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage] = useState(10);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const loadUsers = useCallback(async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("No se encontró el token de autenticación.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const usersResponse = await fetchUsers(searchQuery, token);
      const filteredUsers = usersResponse.allUsers;
      const sortedUsers = [
        ...filteredUsers.filter(user => user.role === "admin"),
        ...filteredUsers.filter(user => user.role !== "admin"),
      ];
      const offset = (currentPage - 1) * usersPerPage;
      setUsers(sortedUsers.slice(offset, offset + usersPerPage));
      setTotalUsers(sortedUsers.length);
    } catch (err) {
      setError("Error al cargar los usuarios. Asegúrate de tener permisos de administrador.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, currentPage, usersPerPage]);



  // Función para activar o desactivar un usuario
  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    if (!token) {
      setError("No se encontró el token de autenticación.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url = currentStatus
        ? `${API_BACK}/users/${userId}/deactivate`
        : `${API_BACK}/users/${userId}/activate`;

      await axios.patch(url, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });


      loadUsers();
    } catch (err) {
      setError("Error al actualizar el estado del usuario.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    setCurrentPage(1);
    loadUsers();
  };

  const goToPage = (page: number) => {
    if (page > 0 && page <= Math.ceil(totalUsers / usersPerPage)) {
      setCurrentPage(page);
    }
  };

  const handlePageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    goToPage(Number(e.target.value));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Gestión de Usuarios</h2>
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre o email"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
        />
        <button
          onClick={handleSearchClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Buscar
        </button>
      </div>
      {loading && <SkeletonTable/>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Usuario</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Rol</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">Órdenes</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100 transition">
                  <td className="py-4 px-4 flex items-center gap-4">
                    <Image
                      src={user.image || `/avatar.webp`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                      width={800}
                      height={800}
                    />
                    <span className="font-medium uppercase">{user.name}</span>
                  </td>
                  <td className="py-4 px-4 lowercase">{user.email.toLowerCase()}</td>
                  <td className="py-4 px-4 uppercase">{user.role}</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleUserStatus(user.id, user.isActive)}
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${user.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                    >
                      {user.isActive ? "Activo" : "Inactivo"}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setSelectedUserName(user.name);
                      }}
                    >
                      Ver Órdenes
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No hay usuarios disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        <span>
          Página {currentPage} de {Math.ceil(totalUsers / usersPerPage)}
        </span>

        <select
          value={currentPage}
          onChange={handlePageSelect}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
        >
          {Array.from({ length: Math.ceil(totalUsers / usersPerPage) }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>

        <button
          onClick={() => goToPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          disabled={currentPage === Math.ceil(totalUsers / usersPerPage)}
        >
          Siguiente
        </button>
      </div>

      {selectedUserId && (
        <div className="mt-6 p-6 border rounded-lg bg-gray-50 shadow-md">
          <button
            className="text-blue-600 underline mb-3"
            onClick={() => setSelectedUserId(null)}
          >
            🔙 Cerrar órdenes
          </button>
          <h3 className="text-2xl font-bold mb-2">Órdenes de {selectedUserName}</h3>
          <UserOrders userId={selectedUserId} />
        </div>
      )}
    </div>
  );
}


