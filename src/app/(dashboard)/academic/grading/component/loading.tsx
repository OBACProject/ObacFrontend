
import { LoaderCircle } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center h-full">
      <div className="text-center">
        <div className="w-full bg-white border-[1px] border-blue-400 rounded-xl py-5 lg:py-10 flex gap-5 lg:gap-10 items-center justify-center h-fit">
          <LoaderCircle className="w-12 h-12 text-blue-400 animate-spin" />
          <h1 className="text-xl text-gray-600 font-prompt">กำลังโหลดข้อมูล... </h1>
        </div>
      </div>
    </div>
  )
}
