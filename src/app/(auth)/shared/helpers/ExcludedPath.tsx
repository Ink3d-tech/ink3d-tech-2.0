"use client"

import { usePathname } from "next/navigation"

const excludedPaths = ["/login", "/signup"]
export default function ExcludedPaths({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    if(!excludedPaths.includes(pathname)) return children
}