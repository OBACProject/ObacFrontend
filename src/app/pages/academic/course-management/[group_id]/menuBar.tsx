"use client"
import React from 'react'

interface Props{
    id:string;
}

export default function MenuBar({id}:Props) {
  return (
    <div className='px-10 py-10 bg-blue-500 text-white'>MenuBar</div>
  )
}
