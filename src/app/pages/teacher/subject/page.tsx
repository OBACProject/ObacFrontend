import React from "react";
import Form from "./Form";

export default function page() {
  return (
    <div className="w-full">
      <div className="flex  py-5 justify-center">
        <p className="py-2 bg-gray-700 rounded-3xl w-fit px-10 text-xl text-white ">
          รายวิชาที่สอน
        </p>
      </div>
      <Form />
    </div>
  );
}
