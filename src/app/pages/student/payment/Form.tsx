import { Badge } from "@/components/ui/badge";
import React from "react";

export default function Form() {
  return (
    <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-44 px-16 lg:px-4 py-8">
      <Badge className="mx-10 lg:text-xl text-md border-[1px] border-gray-300  text-center w-fit md:px-10 lg:px-10 py-1 rounded-md text-white bg-blue-950">
        ชำระค่าธรรมเนียมการศึกษา
      </Badge>
      <div className="lg:mx-44 sm:mx-10 mx-4 mt-4 border bg-white border-gray-200 shadow-md shadow-gray-200  rounded-lg">
        <div className="py-2 w-full text-center bg-blue-700 bg-opacity-15 text-blue-950 text-lg font-semibold  rounded-t-lg">
          ข้อมูลการจ่ายค่าธรรมเนียมการศึกษา  
        </div>
        <div className="py-5 w-full grid place-items-center">
            no avaliable.
        </div>
        
      </div>
    </div>
  );
}
