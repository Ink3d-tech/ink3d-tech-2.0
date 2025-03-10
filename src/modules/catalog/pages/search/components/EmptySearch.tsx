"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function EmptySearch() {

    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" && searchQuery.trim() !== "") {
                router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
            }
        };

    return (
        <div className="text-center py-10">
                <h2 className="text-2xl font-bold mb-12">Encuentra tus productos</h2>
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="p-2 rounded-md bg-white text-black border w-3/4 transition-all duration-300 ease-in-out"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>
    )
}
