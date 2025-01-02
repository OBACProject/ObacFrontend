import React from 'react'

export default function page() {
  return (
    <div className='w-full '>
        <div className='w-full flex justify-center'>
             <div className="relative my-14 py-10 flex justify-center items-center w-full border-blue-300  max-w-lg">
            <div className="absolute mix-blend-multiply filter blur-xl top-0 -left-4 w-72 h-72 bg-sky-300 opacity-70 rounded-full animate-blob"></div>
            <div className="absolute mix-blend-multiply filter blur-xl top-0 -right-4 w-72 h-72  bg-blue-300 opacity-70 rounded-full  animate-blob animation-delay-2000"></div>
            <div className="absolute mix-blend-multiply filter blur-xl -bottom-8 left-20 w-72 h-72 bg-gray-400 opacity-70 rounded-full  animate-blob animation-delay-4000"></div>
             <h1 className="text-5xl animate-fadeIn text-blue-950 my-5 font-bold px-10 py-1 bg-white  z-10 rounded-lg">
            Events
          </h1>
          </div>
        </div>

        <div className='w-full my-20 flex justify-center'>
            
          <div className='w-[95%] bg-white rounded-lg border border-gray-200 shadow-lg text-3xl text-center'>
            <div className='w-full bg-blue-950 rounded-t-lg py-2 text-white'>Event Detail</div>
            <div className='py-20'>
              รอ นรินทร์ มาทำอยู่น๊ะจ๊ะ  
            </div>
            
            </div>  
        </div>
        
       
    </div>
  )
}
