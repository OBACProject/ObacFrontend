"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import Main from './main';
export default function Page() {
    const searchParam =  useSearchParams();
    const groupdId =  searchParam.get("groupId")
  return (
    <div className='pl-16'>
    <div className='w-full px-10'>
        {
            groupdId ? (
                <Main groupId={Number(groupdId)}/>
            ):
            (
                <div className='py-5 flex justify-center text-xl text-black  w-full'>
                    Loading...
                </div>
            )
        } </div>
    </div>
  )
}