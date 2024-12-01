import React from 'react'
import Form from './Form';
import MenuBar from './MenuBar';


interface Props{
    slug:string;
}


export default function Center({slug}:Props) {
  return (
    <div>
        <MenuBar slug={slug}/>
        <Form slug={slug}/>
    </div>
  )
}
