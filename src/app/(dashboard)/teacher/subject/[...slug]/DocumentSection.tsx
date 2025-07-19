'use client'
import { genStudentNameInSubject, genStudentScoreInSubject } from '@/lib/PDFGenarate/generateFile';
import { ChevronRight } from 'lucide-react';
import React from 'react'

export default function DocumentSection() {
  return (
    <div className="px-5 py-5 grid">
              <div className="relative group inline-block">
                {/* ปุ่มหลัก */}
                <button className="px-5 rounded-md flex items-center gap-2 justify-center h-fit py-1.5 bg-white text-blue-600 group-hover:bg-gray-100 duration-300">
                  ดาวโหลดน์เอกสาร
                  <ChevronRight className="text-blue-600 h-6 w-6 group-hover:rotate-90 duration-300" />
                </button>
    
                {/* ปุ่มอื่นๆ ที่จะโผล่มาเมื่อ hover */}
                <div className="absolute top-fit mt-2 left-0 hidden group-hover:flex flex-col gap-1 z-10">
                  <button
                    className="px-4 py-1.5 rounded-md bg-white text-blue-600 shadow-lg hover:bg-gray-50 "
                    onClick={() => {
                      genStudentNameInSubject();
                    }}
                  >
                    รายชื่อนักเรียน PDF
                  </button>
                  <button className="px-4 py-1.5 rounded-md bg-white text-blue-600 shadow-lg hover:bg-gray-50" onClick={()=>{
                    genStudentScoreInSubject();
                  }}>
                    ใบคะแนน PDF
                  </button>
                  <button className="px-4 py-1.5 rounded-md bg-white text-blue-600 shadow-lg hover:bg-gray-50">
                    รายชื่อ Excel
                  </button>
                </div>
              </div>
            </div>
  )
}
