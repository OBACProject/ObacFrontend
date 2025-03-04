"use client";

import { fetchPromoteStudent, GetGropGradeAbove } from "@/api/grad/gradAPI";
import { fetchGetAllStudentGroup } from "@/api/student/studentApi";
import { GetGropGradeAboveModel } from "@/dto/gradDto";
import { StudentGroup } from "@/dto/studentDto";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const getStudentGroupData = async () => {
  try {
    const response = await fetchGetAllStudentGroup();
    return response;
  } catch (err) {
    return [];
  }
};

const getGropGradeAbove = async (
  grade: number,
  term: string,
  year: number,
  groupId: number
) => {
  try {
    const response = await GetGropGradeAbove(grade, term, year, groupId);
    return response;
  } catch (err) {
    return null;
  }
};

export default function Main() {
  const [groups, setGroups] = useState<StudentGroup[]>([]);
  const [newGroup, setNewGroup] = useState<GetGropGradeAboveModel | null>(null);
  const [groupID, setGroupID] = useState<number>(0);
  const [grads, setGrad] = useState(2.0);
  const [term, setTerm] = useState<string>("1");
  const [year, setYear] = useState<number>(2024);
  const [nextGroupNameA, setNextGroupNameA] = useState<string>();
  const [nextGroupNameB, setNextGroupNameB] = useState<string>();
  const [promoteTrigger, SetPromoteTrigger] = useState<boolean>(false);
  const [confirmPromoteTrigger, setConfirmPromoteTrigger] =
    useState<boolean>(false);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [resetPromote , setResetPromote] = useState<boolean>(false);

  useEffect(() => {
    getStudentGroupData().then((d: StudentGroup[]) => {
      setGroups(d);
    });
  }, []);

  const groupOptions = groups.map((item) => ({
    value: item.studentGroupId,
    label: `${item.class}.${item.studentGroupName}`,
  }));

  const handleGroupChange = (
    selectedOption: { value: number; label: string } | null
  ) => {
    if (selectedOption) {
      const selectedGroup = groups.find(
        (item) => item.studentGroupId === selectedOption.value
      );
      if (selectedGroup) {
        setResetPromote(false)
        setGroupID(selectedGroup.studentGroupId);
      }
    } else {
      setGroupID(0);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseFloat(e.target.value);

    if (isNaN(newValue)) return;
    if (newValue < 1) newValue = 1;
    if (newValue > 4) newValue = 4;

    setGrad(newValue);
  };

  const onFilterGroup = async () => {
    setSearchTrigger(true);
    try {
      await getGropGradeAbove(grads, term, Number(year), groupID).then(
        (item: GetGropGradeAboveModel | null) => {
          setNewGroup(item);
        }
      );
      setSearchTrigger(false);
    } catch (err) {
      console.error("Error in onFilterGroup:", err);
      setSearchTrigger(false);
    }
  };

  const onPromoteStudentGroup = async () => {
    setConfirmPromoteTrigger(true);
    if (newGroup) {
      const nextGroupName = `${nextGroupNameA}/${nextGroupNameB}`;
      const studentIds = newGroup.student.map((student) =>
        Number(student.studentId)
      );

      let updatedYear = Number(year);
      let updatedTerm = term;

      if (term === "1") {
        updatedTerm = "2";
        setTerm("2");
      } else {
        updatedTerm = "1";
        updatedYear += 1;
        setTerm("1");
        setYear(updatedYear);
      }
      try {
        const randomPrefix = `${String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        )}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
        const randomNumber = Math.floor(100 + Math.random() * 900);
        console.log("Promoting Students with Data:", {
          studentIds: studentIds,
          newGroupName: nextGroupName,
          newGroupCode: `${randomPrefix}-${randomNumber}`,
          class: newGroup.class,
          programId: newGroup?.programId,
          year: Number(year),
          term: term,
          level: Number(nextGroupNameA),
        });

        const response = await fetchPromoteStudent({
          studentIds: studentIds,
          newGroupName: nextGroupName,
          newGroupCode: `${randomPrefix}-${randomNumber}`,
          class: newGroup.class,
          programId: newGroup?.programId,
          year: Number(year),
          term: term,
          level: newGroup?.level,
        });
        if (response && response.ok !== false) {
          SetPromoteTrigger(false);
          toast.success("เลื่อนชั้นเรียนสำเร็จ");
          setNextGroupNameA("")
          setNextGroupNameB("")
          setResetPromote(true)
        } else {
          toast.error("เกิดข้อผิดพลาดในการเลื่อนชั้นเรียน");
        }
        setConfirmPromoteTrigger(false);
      } catch (err) {
        console.log(err);
        toast.error("ดึงข้อมูลชั้นเรียนไม่สำเร็จ");
        setConfirmPromoteTrigger(false);
      }
    } else {
      toast.error("ดึงข้อมูลชั้นเรียนไม่สำเร็จ");
      setConfirmPromoteTrigger(false);
    }
  };
  return (
    <div className="pl-16 py-5">
      <div className="flex justify-center">
        <div
          style={{ userSelect: "none" }}
          className="px-10 rounded-3xl text-lg py-2 bg-gray-600 text-white "
        >
          ปรับเลื่อนชั้นเรียน
        </div>
      </div>
      <div className="w-full flex items-center gap-4 justify-start py-5 px-10 ">
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
            onChange={(e) => setYear(Number(e.target.value))}
            value={year}
          >
            <option value={2024}>2568</option>
            <option value={2024}>2567</option>
            <option value={2024}>2566</option>
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
        <Select
          options={groupOptions}
          value={groupOptions.find(
            (option) => option.value === groupID || null
          )}
          onChange={handleGroupChange}
          isSearchable
          placeholder="-- เลือกกลุ่มนักเรียน --"
        />
        <button
          className="px-5 text-white py-1.5 rounded-md  flex items-center justify-center gap-2 text-center w-fit bg-blue-500 hover:bg-blue-700"
          onClick={onFilterGroup}
          style={{ userSelect: "none" }}
          disabled={!year || !term || !grads || !groupID}
        >
          <Search className="w-5 h-5" />
          {searchTrigger ? <p>กำลังค้นหา...</p> : <p>ค้นหา</p>}
        </button>
      </div>

      <div className="px-10  py-0">
        {newGroup ? (
          <div className="grid gap-4">
            <div className="py-1 px-5 text-gray-600 font-semibold w-fit border-2 border-gray-400  rounded-md bg-white ">
              ชั้นเรียนปัจจุบัน {newGroup.class}.{newGroup.groupName}
            </div>
            <div className="flex gap-3 items-center">
              <li className="text-[18px] text-gray-700 ">ระบุชั้นเรียนต่อไป</li>
              {/* <select
                className="px-4 py-1 rounded-md border border-gray-300 "
                value={nextClass}
                onChange={(e) => {
                  setNextClass(e.target.value);
                }}
              >
                <option defaultValue=""> เลือกชั้น </option>
                <option value="ปวช">ปวช.</option>
                <option value="ปวส">ปวส.</option>
              </select> */}
              <p className="px-2 py-1 bg-gray-200 rounded-md">{newGroup.class}</p>
              :
              <select
                className="px-4 py-1 rounded-md border border-gray-300 "
                value={nextGroupNameA}
                onChange={(e) => {
                  setNextGroupNameA(e.target.value);
                }}
              >
                <option defaultValue=""> เลือกปี </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <p className="text-xl  text-black">/</p>
              
              <select
                className="px-4 py-1 rounded-md border border-gray-300 "
                value={nextGroupNameB}
                onChange={(e) => {
                  setNextGroupNameB(e.target.value);
                }}
              >
                <option defaultValue=""> เลือกห้อง </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div>
              <div className="border-2 border-gray-400 bg-blue-200 text-black grid h-fit grid-cols-[10%_20%_30%_40%] ">
                <div className="py-1 text-lg text-center">ลำดับ</div>
                <div className="py-1 text-lg text-center">รหัสนักศึกษา</div>
                <div className="py-1 text-lg text-center">ชื่อ - นามสกุล</div>
                <div className="py-1 text-lg text-center">เกรดเทอมล่าสุด</div>
              </div>
              {newGroup.student.map((item, index) => (
                <div
                  key={index}
                  className="border border-t-0 border-gray-400 bg-white text-black grid h-fit grid-cols-[10%_20%_15%_15%_40%]"
                >
                  <div className="text-center py-1 border-r border-gray-400">
                    {index + 1}
                  </div>
                  <div className="text-center py-1 border-r border-gray-400">
                    {item.studentCode}
                  </div>
                  <div className="text-start py-1 pl-8">{item.firstName}</div>
                  <div className="text-start py-1 border-r border-gray-400">
                    {item.lastName}
                  </div>
                  <div className="text-center py-1">{item.gpa.toFixed(2)}</div>
                </div>
              ))}
              <div className="w-full py-5 flex justify-end">
                <button
                  style={{ userSelect: "none" }}
                  disabled={ !nextGroupNameA || !nextGroupNameB}
                  className={`${resetPromote ? "hidden":"block" } px-10 py-1 rounded-md text-white bg-gray-400 enabled:bg-green-400 enabled:hover:bg-green-600`}
                  onClick={() => {
                    SetPromoteTrigger(true);
                  }}
                >
                  เลื่อนชั้นนักเรียน
                </button>
              </div>
            </div>
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
      {promoteTrigger && (
        <div
          className="fixed duration-1000 animate-appearance-in inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
          onClick={() => SetPromoteTrigger(false)}
        >
          <div
            className=" bg-white shadow-lg shadow-gray-400   rounded-lg w-fit z-100 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="py-2 text-center text-xl "
              style={{ userSelect: "none" }}
            >
              ยืนยัน
            </div>
            <div className="px-5">
              <p className="text-center text-sm text-gray-600">
                โปรดตรวจสอบข้อมูลการเลื่อนชั้นและรายละเอียด
                <br />
                อื่นๆของนักเรียนว่าข้อมูลถูกต้อง
              </p>
              <p className="pt-2 w-full text-center">
                {newGroup?.class}.{newGroup?.groupName} &gt;&gt; {newGroup?.class}.
                {nextGroupNameA}/{nextGroupNameB}
              </p>
            </div>
            <div className="flex w-full justify-center gap-5 item-center py-5 px-10">
              <button
                className="px-5 duration-500 text-center w-fit h-fit py-1 hover:bg-gray-500 rounded-md text-white bg-gray-400 "
                onClick={() => SetPromoteTrigger(false)}
              >
                ยกเลิก
              </button>
              <button
                className="px-5 duration-500 text-center w-fit py-1 h-fit  rounded-md text-white bg-blue-500 hover:bg-blue-600"
                onClick={onPromoteStudentGroup}
                disabled={!newGroup}
              >
                {confirmPromoteTrigger ? <p>รอสักครู่...</p> : <p>ยืนยัน</p>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
