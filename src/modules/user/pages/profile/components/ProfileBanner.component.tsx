"use client"

import { useAuth } from '@/modules/auth/shared/context/Auth.context';
import Image from 'next/image'

export default function Banner() {
  const { user } = useAuth()

  return (
    <div className="m-5 bg-white shadow-lg rounded w-96 h-32 flex items-center justify-center">
      <div className="flex flex-row items-center h-full p-4 gap-4">
        <Image 
          src="https://i.pinimg.com/736x/c7/d3/d7/c7d3d75e6878ffdbd0e89a4fe0c5c7ae.jpg" 
          alt="INK3D" 
          width={56} 
          height={56} 
          className="rounded-full object-cover w-14 h-14"
        />
        <div>
          <p className="text-lg font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      </div>
    </div>
  )
}
