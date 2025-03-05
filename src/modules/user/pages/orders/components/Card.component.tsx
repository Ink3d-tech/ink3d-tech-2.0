"use client"

import { useAuth } from "../../../../auth/shared/context/Auth.context";

export const CardUser = () => {
    const { user } = useAuth();

    return (
        user ? (
            <div>
              <p>Email: {user.email}</p>
              <p>Name: {user.name}</p>
            </div>
        ) : (
            <div className="animate-pulse mt-2">
              <p className="w-32 h-4 bg-gray-300 rounded mb-2"></p>
              <p className="w-60 h-4 bg-gray-300 rounded"></p>
            </div>
        )
    )
}