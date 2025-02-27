import Image from 'next/image'
import React from 'react'

export default function Banner() {

  const logo = "/png-clipart-round-multicolored-logo-vanamo-logo-icons-logos-emojis-tech-companies-thumbnail.png"

  const name = 'Nacho Alonso';
  const email = 'nachoalonso@gmail.com';

  return (
    <div className='m-5 bg-white shadow-shadow-gray shadow-lg rounded w-96 h-32'>
        <div className='flex flex-row items-center h-full p-4 gap-4'>
          <Image src={logo} alt='inked' width={56} height={56}/>
          <div>
            <p className=''>{name}</p>
            <p className='text-sm font-extralight'>{email}</p>
          </div>
        </div>
    </div>
  )
}
