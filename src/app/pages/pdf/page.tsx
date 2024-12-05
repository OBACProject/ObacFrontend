"use client";
import GenStudentNameList from "@/app/components/PDF/genStudentNameList";
import GenTranscript from "@/app/components/PDF/genTranscript";
import { useState } from "react";


export default function page() {
  const [num, setNum] = useState<number>(20);
    const [FirstName , SetFname ] =   useState<string>("Patarajarin")
    const [LastName , SetLname ] =   useState<string>("Napakarn")
  return (
    <div className="mt-40 grid place-items-center">
      <button
        className="mt-40 px-10 py-2 text-white bg-blue-500 rounded-md "
        onClick={() => GenTranscript({ score: num })}
      >
        Gen PDF file
      </button>
      <button className="mt-10 px-10 py-2 text-white bg-blue-500 rounded-md " onClick={()=> GenStudentNameList({FirstName:FirstName, LastName:LastName})}>Get Student Name list</button>
    </div>
  );
}
