import BackButton from '@/shared/components/buttons/BackButton.component'
import { HelpCircle } from 'lucide-react'
import React from 'react'

export default function Refund() {
  return (
    <div>
      <BackButton tab='Ordenes'/>
      <div className='p-40'>
        <div className='flex flex-col justify-center p-10 bg-white'>
          <div className='flex items-center gap-4 mb-4'>
          <HelpCircle/>
            <h2 className='text-2xl'>Ordenes</h2>
          </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint excepturi
              unde, libero nesciunt nisi pariatur rem molestias laborum optio dolorum 
              facilis cupiditate repudiandae doloribus consectetur dolores voluptatem, vel eum corporis.</p>
        </div>
      </div>
    </div>
  )
}
