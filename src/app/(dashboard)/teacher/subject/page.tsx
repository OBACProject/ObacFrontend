import React from "react";
import Form from "./Form";

export default function Page() {
  return (
    <div className="py-5">
      <div className="w-full grid place-items-center ">
        <h1 className="bg-gray-700 text-white py-2 px-10 rounded-full  text-lg font-prompt mb-4 ">
          รายวิชาที่สอน
        </h1>
      </div>
      <Form/>
    </div>
  );
}
