import React from 'react'

export default function page() {
  return (
    <div className='w-full'>
        <div className='grid place-items-center border-t-2 border-white py-8 text-bole text-2xl px-20 bg-blue-900 text-white'>
            ประวัติวิทยาลัยเอกวิทย์
        </div>
        <div className='grid place-items-center pb-20'>
            <div>
                <img src='/static/history-01.jpg' width={800} height={1000} />
            </div>
        </div>
    </div>
  )
}
