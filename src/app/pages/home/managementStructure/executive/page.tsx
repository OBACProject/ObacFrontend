import React from "react";
import "@app/styles/globals.css";

export default function page() {
  return (
    <div className="w-full">
      <div className="grid place-items-center  py-8 text-bole text-2xl px-20 bg-blue-900 text-white">
        คณะผู้บริหารวิทยาลัย
      </div>
      <div className="grid place-items-center pb-20">
        <div>
          <img src="/static/static-01.jpg" width={800} height="full" />
        </div>
      </div>
    </div>
  );
}
