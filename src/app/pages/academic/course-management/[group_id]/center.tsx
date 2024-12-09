import React from 'react'
import Form from './form'
import MenuBar from './menuBar';

interface Props{
    slug:string;
}

export default function Center({slug}:Props) {
  return (
    <div>
        <MenuBar id={slug}/>
        <Form id={slug}/>
    </div>
  )
}
