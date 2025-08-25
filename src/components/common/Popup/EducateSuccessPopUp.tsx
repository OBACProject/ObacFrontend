"use client";

import { UpdateStudentStatusByStudentGroupId } from "@/api/studentGroup/route";
import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  onClickPopUp: (value: boolean) => void;
  groupID: number;
  GroupFullName: string;
}

export default function EducateSuccessPopUp({
  onClickPopUp,
  groupID,
  GroupFullName,
}: Props) {
  const [onSubmit, setOnSubmit] = useState<boolean>(false);

  const onChangeStatusGroup = async () => {
    if (onSubmit) return;
    setOnSubmit(true);
    try {
      const ok = await UpdateStudentStatusByStudentGroupId(
        groupID,
        "สำเร็จการศึกษา"
      );
      if (ok) {
        toast.success("ปรับสถานะสำเร็จ");
        setTimeout(()=>{
            window.location.reload()
        },500)
      } else {
        toast.error("ไม่สามารถปรับสถานะได้");
      }
    } catch (err) {
      console.log(err);
      toast.error("ปรับสถานะไม่สำเร็จ โปรดลองอีกครั้ง");
    } finally {
      setOnSubmit(false);
    }
  };

  return (
    <div
      className=" fixed duration-1000 animate-appearance inset-0 items-center flex justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClickPopUp(false)}
    >
      <div
        className="shadow-lg bg-white   shadow-gray-400 rounded-lg w-fit duration-500 z-50 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-5  px-4 text-xl  flex gap-4 justify-center items-center w-full text-center">
          <div className="p-1.5 rounded-full  bg-gradient-to-r from-emerald-600 to-green-500">
            <GraduationCap className="w-8 h-8 text-white " />
          </div>
          <p>ปรับสถานะสำเร็จการศึกษา</p>
        </div>
        <div className="py-2 gap-2 grid place-items-center lg:px-20">
          <div className="flex gap-2 items-center justify-center ">
            <p>ปรับสถานะการศึกษาให้ห้อง </p>
            <p className="px-4 py-0.5 bg-green-600 text-white rounded-md ">
              {GroupFullName}
            </p>
          </div>

          <p>เป็นสำเร็จการศึกษาใช่หรือไม่?</p>

          <div className="flex justify-center gap-5 mt-4 mb-5">
            <button
              className="px-8 text-white py-1 hover:bg-gray-300 hover:text-black bg-gray-400 rounded-sm"
              onClick={() => onClickPopUp(false)}
            >
              ยกเลิก
            </button>{" "}
            <button onClick={()=>{
                onChangeStatusGroup()
            }} className="px-8 text-white py-1 bg-blue-500 rounded-sm hover:bg-blue-700">
              ตกลง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
