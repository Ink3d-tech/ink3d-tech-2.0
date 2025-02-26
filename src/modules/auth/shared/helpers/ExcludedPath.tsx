"use client"

import { usePathname } from "next/navigation"

const excludedPaths = ["/", "/home"]
export default function ExcludedPaths({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    if(excludedPaths.includes(pathname)) return children
}