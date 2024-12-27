import React from "react";

export default function page() {
  return (
    <div className="w-full">
      <div className="grid place-items-center  py-8 text-bole text-2xl px-20 bg-blue-900 text-white">
        ข้อมูลการติดต่อ
      </div>
      <div className="grid place-items-center">
        <div className="mt-5 border-[1px] border-gray-300 w-11/12 py-5 px-10 bg-white shadow-md rounded-md grid grid-cols-2 ">
          <div>
            <div className="text-2xl py-2 underline font-semibold text-gray-700">
              ฝ่ายวิชาการ
            </div>
            <div className="text-xl text-gray-600">
              <span className="text-black font-semibold">Tel.&nbsp;&nbsp;</span>
              091-864-9154
            </div>
            <hr className="my-5 w-4/5" />
          </div>

          <div>
            <div className="text-2xl py-2 text-gray-700 underline font-semibold">
              ฝ่ายปกครอง
            </div>
            <div className="text-xl text-gray-600">
              <span className="font-semibold text-black ">
                Tel.&nbsp;&nbsp;
              </span>
              091-864-9154
            </div>
            <hr className="my-5 w-4/5" />
          </div>
          <div>
            <div className="text-2xl py-2 underline font-semibold text-gray-700">
              ฝ่ายบริหาร
            </div>
            <div className="text-xl text-gray-600">
              <span className="font-semibold text-black ">
                Tel.&nbsp;&nbsp;
              </span>
              091-864-9154
            </div>
            <hr className="my-5 w-4/5" />
          </div>

          <div>
            <div className="text-2xl py-2 underline font-semibold text-gray-700">
              ฝ่ายแนะแนว
            </div>
            <div className="text-xl text-gray-600">
              <span className="font-semibold text-black ">
                Tel.&nbsp;&nbsp;
              </span>
              091-864-9154
            </div>
            <hr className="my-5 w-4/5" />
          </div>
        </div>
      </div>

      <div className="grid place-items-center">
        <div className="mt-5 border-[1px] border-gray-300 w-11/12 py-5 px-10 bg-white shadow-md rounded-md grid grid-cols-2 ">
          <div>
            <div className="text-2xl py-2 underline font-semibold text-gray-700">
              Facebook
            </div>
            <div className="text-xl text-gray-600">เอกวิทย์ยชาการวิทยาลัย</div>
            <hr className="my-5 w-4/5" />
          </div>

          <div>
            <div className="text-2xl py-2 text-gray-700 underline font-semibold">
              Instagram
            </div>
            <div className="text-xl text-gray-600">akkawitwittayalai.og</div>
            <hr className="my-5 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
