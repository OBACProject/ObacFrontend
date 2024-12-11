"use client"
import React from 'react'

interface Props{
    id:string;
}

export default function MenuBar({id}:Props) {
  return (
    <div className='px-10 grid text-2xl place-items-center py-10 bg-blue-800 text-white'>ตารางเรียนของกลุ่มเรียน ปวส 2.1</div>
  )
}
