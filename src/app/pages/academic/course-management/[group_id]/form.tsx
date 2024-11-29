import React from 'react'
import Group from './group'
import MenuBar from './menuBar';

interface Props{
    slug:string;
}

export default function Form({slug}:Props) {
  return (
    <div>
        <MenuBar id={slug}/>
        <Group id={slug}/>
    </div>
  )
}
