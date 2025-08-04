"use client";
import { DeleteEnrollmentGradeAndScheduleByScheduleSubjectId } from "@/api/schedule/route";
import { TeacherScheduleItem } from "@/dto/teacherDto";
import { toast } from "react-toastify";

interface PropsDelete {
  onClosePopup: (open: boolean) => void;
  scheduleData: TeacherScheduleItem;
}

export default function DeleteScheduleTeacherPopup({
  onClosePopup,
  scheduleData,
}: PropsDelete) {
  const onDeleteSchedule = async () => {
    try {
      DeleteEnrollmentGradeAndScheduleByScheduleSubjectId(
        scheduleData.scheduleSubjectId
      );
      toast.success("ลบสำเร็จ");
      onClosePopup(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      console.log("Error in API Please Check in Route.", err);
      toast.error("ลบไม่สำเร็จ");
    }
  };

  return (
    <div
      className="fixed duration-1000 animate-appearance inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClosePopup(false)}
    >
      <div
        className="bg-white shadow-lg shadow-gray-400 rounded-lg w-[400px] z-100 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-4 w-full font-prompt text-center text-2xl font-semibold">
          ยืนยันการลบ
        </div>
        <div className="grid place-items-center py-1">
          <p className="w-[300px] text-center">
            ลบวิชา {scheduleData.subjectName}
          </p>
          <p className="text-gray-600 w-[300px] text-center">
            ตรวจสอบให้แน่ใจก่อนลบ
          </p>
        </div>
        <div className="flex gap-5 justify-center py-5 w-full">
          <button
            className="text-sm w-[90px] py-1.5 bg-gray-300 hover:bg-gray-400 rounded-md text-black"
            onClick={() => onClosePopup(false)}
          >
            ยกเลิก
          </button>
          <button
            className="text-sm w-[90px] py-1.5 bg-red-500 hover:bg-red-600 rounded-md text-white"
            onClick={() => {
              onDeleteSchedule();
            }}
          >
            ลบ
          </button>
        </div>
      </div>
    </div>
  );
}
