import React from "react";
import "@app/styles/globals.css";

export default function page() {
  return (

    <div className="w-full py-5">
      <div className="grid place-items-center py-10  text-2xl  bg-gradient-to-r from-blue-950 via-sky-500 to-slate-500  text-white ">
        <p className="text-5xl ">คณะผู้บริหารวิทยาลัย</p>
      </div>
      <div className="grid place-items-center pb-20">
        <div className="">
          <img src="/static/static-01.jpg" width={800} height="full" />
        </div>
      </div>
    </div>
  );
}
