import React from 'react'
import ProfileCard from './profileCard'
import DetailCard from './detailCard'

export default function ProfileForm() {
  return (
    <div className='text-xl pl-20 '>
      <div className='grid place-items-center  text-center py-6 bg-gray-100'>
        ข้อมูลอาจารย์
          </div>
      <div className='text-xl border-2  border-gray-200 py-5 px-5'>
        <div className='lg:grid lg:gap:0 lg:grid-cols-2 lg:px-34  sm:grid sm:grid-rows-4 sm:gap-4'>
          <ProfileCard isLoading={true} imgPath={null}/>
          <DetailCard isLoading={true}/>
        </div>
      </div>
    </div>
  )
}
