import React from "react";
import Form from "./Form";

export default function page() {
  return (
    <div className="py-4">
      <div className="flex justify-center">
        <p className="py-2 bg-gray-700 rounded-3xl w-fit px-10 text-xl text-white ">
          รายวิชาที่สอน
        </p>
      </div>
      <Form />
    </div>
  );
}
