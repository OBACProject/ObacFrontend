import React from "react";
import Form from "./Form";

export default function Page() {
  return (
    <div className="pt-5 bg-gray-100 lg:pb-10 min-h-[calc(80dvh-2rem)]  lg:px-10">
      <div className="w-full grid place-items-center pt-5">
        <h1 className="bg-gray-700 text-white py-2 px-10 rounded-full  text-lg font-prompt mb-4 ">
          รายวิชาที่สอน
        </h1>
      </div>
      <Form />
    </div>
  );
}
