"use client";
import { GetGropGradeBelow } from "@/api/grad/gradAPI";
import { GetGropGradeBelowModel } from "@/dto/gradDto";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
interface IndividualStudentInfoData {
  studentId: number;
  studentName: string;
}

export default function Main() {
  const [students, setStudent] = useState<GetGropGradeBelowModel[]>([]);
  const [groupID, setGroupID] = useState<number>(0);
  const [grads, setGrad] = useState(2.0);
  const [term, setTerm] = useState<string>("1");
  const [year, setYear] = useState<string>("2024");
  const [classSelect, setClassSelect] = useState<string>("");
  const [currentYearSelect, setCurrentYearSelect] = useState<number>(0);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) return;
    if (newValue < 1) newValue = 1;
    if (newValue > 4) newValue = 4;
    setGrad(newValue);
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [classType, year] = e.target.value.split("&");
    setClassSelect(classType);
    setCurrentYearSelect(Number(year));
  };
  const router = useRouter();
  const onFilterGroup = async () => {
    try {
      setSearchTrigger(true);
      await GetGropGradeBelow(
        classSelect,
        currentYearSelect,
        grads,
        term,
        Number(year)
      ).then((item: GetGropGradeBelowModel[]) => {
        setStudent(item);
      });
      setIsSearch(true);
      setSearchTrigger(false);
    } catch (err) {
      console.error("Error in onFilterGroup:", err);
      setSearchTrigger(false);
      setIsSearch(true);
    }
  };

  const handleStudentName = (id: number, fname: string, lname: string) => {
    const data: IndividualStudentInfoData = {
      studentId: id,
      studentName: fname + " " + lname,
    };
    localStorage.setItem("selectedStudentData", JSON.stringify(data));
    localStorage.setItem("activeTabStudent", "individualStudentInfo");

    router.push("/pages/academic/grading/management/individual");
  };

  return (
    <div className="py-5">
      <div className="w-full justify-center flex">
        <div className="px-10 rounded-3xl text-lg bg-gray-600 text-white py-1 text-center w-fit">
          นักเรียนที่ไม่ผ่านเกณฑ์
        </div>
      </div>

      <div className="w-full py-4 px-10 flex items-center justify-start gap-4">
        <div
          className="flex justify-center items-center gap-2 "
          style={{ userSelect: "none" }}
        >
          <div className="text-gray-600">ภาคเรียน</div>
          <select
            className="border border-gray-200 rounded-sm py-1 px-4"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div
          className="flex justify-center items-center gap-2 "
          style={{ userSelect: "none" }}
        >
          <div className="text-gray-600">ปีการศึกษา</div>
          <select
            className="border border-gray-200 rounded-sm py-1 px-4"
            onChange={(e) => setYear(e.target.value)}
            value={year}
          >
            <option value="2024">2568</option>
            <option value="2023">2567</option>
            <option value="2022">2566</option>
          </select>
        </div>
        <div className="flex items-center gap-2" style={{ userSelect: "none" }}>
          <label className="text-black text-[16px]">เกรดขั้นต่ำ</label>
          <input
            type="number"
            className="border py-1 border-gray-200 rounded-sm w-[80px] text-center"
            value={grads.toFixed(2)}
            onChange={handleChange}
            step={0.25}
            min={1.0}
            max={4.0}
          />
        </div>
        <select
          className="border border-gray-200 rounded-sm py-1 px-4"
          onChange={handleClassChange}
          value={`${classSelect}&${currentYearSelect}`}
        >
          <option value="">เลือก</option>
          <option value="ปวช&1">ปวช.1</option>
          <option value="ปวช&2">ปวช.2</option>
          <option value="ปวช&3">ปวช.3</option>
          <option value="ปวส&1">ปวส.1</option>
          <option value="ปวส&2">ปวส.2</option>
        </select>
        <button
          className="px-5 text-white py-1.5 rounded-md  flex items-center justify-center gap-2 text-center w-fit bg-blue-500 hover:bg-blue-700"
          onClick={onFilterGroup}
          style={{ userSelect: "none" }}
          disabled={
            !classSelect || !currentYearSelect || !term || !year || !grads
          }
        >
          <Search className="w-5 h-5" />
          {searchTrigger ? <p>กำลังค้นหา...</p> : <p>ค้นหา</p>}
        </button>
      </div>
      <div className="px-10  py-0">
        {isSearch ? (
          <div>
            {students.length > 0 ? (
              <div className="grid gap-4">
                <div className="py-1 px-5 text-gray-600 font-semibold w-fit border-2 border-gray-400  rounded-md bg-white flex gap-3">
                  จำนวนนักเรียนที่ไม่ผ่านเกณฑ์ <p>{students.length}</p>คน
                </div>
                <div>
                  <div className="border-2 border-gray-400 bg-blue-200 text-black grid h-fit grid-cols-[10%_20%_30%_40%] ">
                    <div className="py-1 text-lg text-center">ลำดับ</div>
                    <div className="py-1 text-lg text-center">รหัสนักศึกษา</div>
                    <div className="py-1 text-lg text-center">
                      ชื่อ - นามสกุล
                    </div>
                    <div className="py-1 text-lg text-center">
                      เกรดเทอมล่าสุด
                    </div>
                  </div>
                  {students.map((item, index) => (
                    <div
                      onClick={() => {
                        handleStudentName(
                          item.studentId,
                          item.firstName,
                          item.lastName
                        );
                      }}
                      key={index}
                      className="border border-t-0 hover:bg-blue-50 cursor-pointer border-gray-400 bg-white text-black grid h-fit grid-cols-[10%_20%_15%_15%_40%]"
                    >
                      <div className="text-center py-1 border-r border-gray-400">
                        {index + 1}
                      </div>
                      <div className="text-center py-1 border-r border-gray-400">
                        {item.studentCode}
                      </div>
                      <div className="text-start py-1 pl-8">
                        {item.firstName}
                      </div>
                      <div className="text-start py-1 border-r border-gray-400">
                        {item.lastName}
                      </div>
                      <div className="text-center py-1">
                        {item.gpa.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                style={{ userSelect: "none" }}
                className="w-full  border-2 grid place-items-center border-gray-300 border-dashed rounded-md py-10 text-gray-500 text-2xl font-semibold"
              >
                ไม่พบข้อมูล
              </div>
            )}
          </div>
        ) : (
          <div
            style={{ userSelect: "none" }}
            className="w-full  border-2 grid place-items-center border-gray-300 border-dashed rounded-md py-10 text-gray-500 text-2xl font-semibold"
          >
            ยังไม่ได้เลือก
          </div>
        )}
      </div>
    </div>
  );
}
