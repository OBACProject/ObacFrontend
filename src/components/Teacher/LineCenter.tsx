import React from 'react'

interface Props {
    color:string
}

export default function LineCenter({color}:Props) {
  return (
    <div className='w-full flex justify-center py-2'>
        <hr className={`${color} w-[90%]`}/>
    </div>
  )
}
