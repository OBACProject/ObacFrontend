"use client";
import { DeleteSubjectById, UpdateSubject } from "@/api/subject/route";
import { SubjectItem } from "@/dto/subjectDto";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type EditPopUpProps = {
  onClosePopUp: (value: boolean) => void;
  data: SubjectItem;
};

export const EditSubjectPopUp = ({ onClosePopUp, data }: EditPopUpProps) => {
  const [deleteTrigger, setDeleteTrigger] = useState<boolean>(false);
  const [subjectName, setSubjectName] = useState<string>(data.name);
  const [subjectCode, setSubjectCode] = useState<string>(data.code);
  const [credits, setCredit] = useState<number>(data.credits);
  const [hour, setHour] = useState<number>(data.hour);
  const [term, setTerm] = useState<string>(data.term);
  const [classLevel, setClassLevel] = useState<number>(data.level);
  const [classType, setClassType] = useState<string>(data.class);
  const [curriculumYear, setCurriculumYear] = useState<number>(
    data.curriculumYear
  );
  const [description, setDescription] = useState<string | null>(
    data.description
  );
  const [isActive, setIsActive] = useState<boolean>(data.isActive);
  const levelOptions = classType === "ปวช" ? ["1", "2", "3"] : ["1", "2"];

  const onUpdate = async () => {
    const payload = {
      id: data.id,
      name: subjectName,
      code: subjectCode,
      credits: credits,
      term: term,
      level: classLevel,
      class: classType,
      curriculumYear: curriculumYear,
      description: description || "",
      isActive: isActive,
      hour: hour,
    };
    try {
      await UpdateSubject(payload);
      toast.success("แก้ไขวิชาสำเร็จ");
      onClosePopUp(false);
      // window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("แก้ไขวิชาไม่สำเร็จ");
    }
  };

  const onDelete = async () => {
    try {
      const success = await DeleteSubjectById(data.id);
      if (success) {
        toast.success("ลบสำเร็จ");
        setDeleteTrigger(false);
        onClosePopUp(false);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error("ลบไม่สำเร็จ ลองอีกครั้ง");
      }
    } catch (err) {
      console.log(err);
      toast.error("เกิดข้อผิดพลาด ลองอีกครั้ง");
    }
  };

  return (
    <div
      className="fixed duration-1000 animate-appearance inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClosePopUp(false)}
    >
      <div
        className="bg-white rounded-md   z-100 shadow-lg shadow-gray-500 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-center items-center gap-4 rounded-t-md text-center text-xl  ">
          <p className="py-4  text-gray-800">แก้ไขวิชาเรียน</p>
        </div>
        <div className="w-full px-16  py-5 grid place-items-center gap-4">
          <div className="flex w-full items-center gap-2">
            <label>รหัสวิชา : </label>
            <input
              onChange={(e) => setSubjectCode(e.target.value)}
              value={subjectCode}
              className="w-[200px] px-5 py-1 border border-gray-200 rounded-sm"
            />
          </div>

          <div className="flex w-full items-center gap-2">
            <label>ชื่อวิชา : </label>
            <input
              onChange={(e) => setSubjectName(e.target.value)}
              value={subjectName}
              className="w-[200px] px-5 py-1 border border-gray-200 rounded-sm"
            />
          </div>
          <div className="flex w-full justify-center items-center gap-4">
            <div className="flex w-full items-center gap-2">
              <label>หน่วยกิต</label>
              <input
                onChange={(e) => setCredit(Number(e.target.value))}
                value={credits}
                type="number"
                className="w-[60px] px-5 py-1 border border-gray-200 rounded-sm"
              />
            </div>
            <div className="flex w-full items-center gap-2">
              <label>สถานะ</label>
              <button
                onClick={() => setIsActive(!isActive)}
                className={`relative w-[46px] h-6 flex items-center rounded-full py-1 px-1transition-all duration-300 ${
                  isActive ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                    isActive ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="flex w-full gap-3 items-center">
            <p>สายชั้น</p>
            <select
              className="border-[1px] border-gray-300 px-4 py-0.5 rounded-md"
              value={classType}
              onChange={(e) => {
                const selected = e.target.value;
                setClassType(selected);
                if (selected === "ปวช" && String(classLevel) === "3") return;
                setClassLevel(Number("1"));
              }}
            >
              <option value="ปวช">ปวช.</option>
              <option value="ปวส">ปวส.</option>
            </select>

            <p className="ml-3">ปี</p>
            <select
              className="border-[1px] border-gray-300 px-4 py-0.5 rounded-md"
              value={classLevel}
              onChange={(e) => setClassLevel(Number(e.target.value))}
            >
              {levelOptions.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full items-center gap-2">
            <label>ปีหลักสูตร </label>
            <input
              onChange={(e) => setCurriculumYear(Number(e.target.value))}
              value={curriculumYear}
              className="w-[200px] px-5 py-1 border border-gray-200 rounded-sm"
            />
          </div>
          <div className="flex w-full items-center gap-2">
            <label>ชั่วโมงเรียน </label>
            <input
              onChange={(e) => setHour(Number(e.target.value))}
              value={hour}
              className="w-[200px] px-5 py-1 border border-gray-200 rounded-sm"
            />
          </div>
          <div className="grid w-full place-items-start gap-2">
            <label>คำอธิบาย </label>
            <textarea
              rows={2}
              onChange={(e) => setDescription(e.target.value)}
              value={description || ""}
              className="w-[200px] px-5 py-1 border border-gray-200 rounded-sm"
            />
          </div>
        </div>

        <div className="py-5 w-full flex gap-5 justify-center">
          <button
            className="px-5 w-[80px] bg-gray-300 text-black py-1 rounded-sm hover:bg-gray-400"
            onClick={() => onClosePopUp(false)}
          >
            ยกเลิก
          </button>
          <button
            className="px-5 w-[80px] bg-red-400 text-white py-1 rounded-sm  hover:bg-red-600"
            onClick={() => {
              setDeleteTrigger(true);
            }}
          >
            ลบ
          </button>
          <button
            className="px-5 w-[80px] bg-blue-400 text-white py-1 rounded-sm  hover:bg-blue-600"
            onClick={onUpdate}
          >
            บันทึก
          </button>
        </div>
      </div>
      {deleteTrigger && (
        <div
          className="fixed duration-1000 animate-appearance inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
          onClick={() => setDeleteTrigger(false)}
        >
          <div
            className="bg-white rounded-md   lg:w-[300px]  z-100 shadow-lg shadow-gray-500 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="">
              <h1 className="py-5 w-full text-center text-xl">ยืนยันการลบ</h1>
              <div className="flex justify-center gap-5 py-5 w-full">
                <button
                  className="px-4 bg-gray-300 rounded-md hover:bg-gray-400 py-1 text-black"
                  onClick={() => setDeleteTrigger(false)}
                >
                  ยกเลิก
                </button>
                <button
                  className="px-4 bg-red-500 rounded-md text-white hover:bg-red-600 py-1 "
                  onClick={onDelete}
                >
                  ตกลง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
