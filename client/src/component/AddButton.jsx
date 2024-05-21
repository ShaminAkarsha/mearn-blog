import React from 'react'
import { HiPlus } from 'react-icons/hi'

export default function AddButton() {
  return (
    <button className='border p-2 md:p-3 text-center justify-center rounded-full bg-blue-500'>
        <HiPlus className='text-xl md:text-2xl font-extrabold items-center text-white'/>
    </button>
  )
}
