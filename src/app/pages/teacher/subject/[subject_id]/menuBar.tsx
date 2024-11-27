import React from "react";
interface Props {
    slug: string;
}
export default function MenuBar({slug}:Props) {
  return (
    <div className="bg-blue-500 px-5 py-10">
      <div className="text-xl text-white ">Menu Bar 
        <span className="text-2xl font-semibold"> Subject Code is : {slug}</span>
      </div>
    </div>
  );
}
