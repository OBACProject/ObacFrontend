"use client";

import { GetGropGradeAbove } from "@/api/grad/gradAPI";
import { fetchPromoteStudentGroup } from "@/api/student/studentApi";
import { fetchGetStudentGroupsByTermYear } from "@/api/student/studentApi";
import { GetGropGradeAboveModel } from "@/dto/gradDto";
import { GetStudentGroupsByTermYearDto, StudentGroup } from "@/dto/studentDto";
import { ArrowUpDown, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const GetStudentGroupsByTermYear = async (term: string, year: number) => {
  try {
    return await fetchGetStudentGroupsByTermYear(term, year);
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
  const dateTime = new Date();
  const currentMonth = dateTime.getMonth();
  const currentYear =
    currentMonth > 5
      ? dateTime.getFullYear() + 543
      : dateTime.getFullYear() + 543 - 1;
  const defaultTerm = currentMonth > 5 ? "1" : "2";
  const [groups, setGroups] = useState<GetStudentGroupsByTermYearDto[]>([]);
  const [newGroup, setNewGroup] = useState<GetGropGradeAboveModel | null>(null);
  const [groupID, setGroupID] = useState<number>(0);
  const [grads, setGrad] = useState(2);
  const [term, setTerm] = useState<string>(defaultTerm);
  const [year, setYear] = useState<number>(currentYear);
  const [nextGroupNameA, setNextGroupNameA] = useState<string>();
  const [nextGroupNameB, setNextGroupNameB] = useState<string>();
  const [promoteTrigger, SetPromoteTrigger] = useState<boolean>(false);
  const [confirmPromoteTrigger, setConfirmPromoteTrigger] =
    useState<boolean>(false);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [resetPromote, setResetPromote] = useState<boolean>(false);
  const [isSearch, setIsSeacrh] = useState<boolean>(false);

  useEffect(() => {
    if (term && year) {
      GetStudentGroupsByTermYear(term, year)
        .then((data: GetStudentGroupsByTermYearDto[] | undefined) => {
          if (data) {
            setGroups(data);
          } else {
            setGroups([]);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch student groups:", err);
          setGroups([]);
        });
    }
  }, []);

  const groupOptions = groups.map((item) => ({
    value: item.groupId,
    label: `${item.class}.${item.groupName}`,
  }));

  const handleGroupChange = (
    selectedOption: { value: number; label: string } | null
  ) => {
    if (selectedOption) {
      const selectedGroup = groups.find(
        (item) => item.groupId === selectedOption.value
      );
      if (selectedGroup) {
        setResetPromote(false);
        setGroupID(selectedGroup.groupId);
      }
    } else {
      setGroupID(0);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setGrad(value);
    } else {
      setGrad(0.0);
    }
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
      setIsSeacrh(true);
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
        const bodyReq = {
          studentIds: studentIds,
          groupId: groupID,
          newGroupName: nextGroupName,
          newGroupCode: `${randomPrefix}-${randomNumber}`,
          year: Number(year),
          term: term,
        }
        console.log(bodyReq)
        const response = await fetchPromoteStudentGroup({
          studentIds: studentIds,
          groupId: groupID,
          newGroupName: nextGroupName,
          newGroupCode: `${randomPrefix}-${randomNumber}`,
          year: Number(year),
          term: term,
        });
        console.log(response)
        if (response && response.ok !== false) {
          SetPromoteTrigger(false);
          toast.success("เลื่อนชั้นเรียนสำเร็จ");
          setNextGroupNameA("");
          setNextGroupNameB("");
          setResetPromote(true);
          setTimeout(()=>{
            window.location.reload();
          },1500)
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
      <div className="flex justify-start px-10">
        <div
          style={{ userSelect: "none" }}
          className="px-10 rounded-3xl text-xl shadow-md border border-gray-100 flex gap-2 items-center py-2 -500 text-blue-600 font-prompt_Light "
        >
          <ArrowUpDown className="w-8 h-8" />
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
            <option value={currentYear}>{currentYear}</option>
            <option value={currentYear - 1}>{currentYear - 1}</option>
            <option value={currentYear - 2}>{currentYear - 2}</option>
            <option value={currentYear - 3}>{currentYear - 3}</option>
            <option value={currentYear - 4}>{currentYear - 4}</option>
          </select>
        </div>
        <div className="flex items-center gap-2" style={{ userSelect: "none" }}>
          <label className="text-black text-[16px]">เกรดขั้นต่ำ</label>
          <input
            type="number"
            className="border py-1 border-gray-200 rounded-sm w-[80px] text-center"
            value={grads}
            onChange={handleChange}
            step={0.25}
            min={0.0}
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
          disabled={!year || !term || !groupID}
        >
          <Search className="w-5 h-5" />
          {searchTrigger ? <p>กำลังค้นหา...</p> : <p>ค้นหา</p>}
        </button>
      </div>

      <div className="px-10  py-0">
        {isSearch ? (
          <div>
            {newGroup ? (
              <div className="grid gap-4">
                <div className="py-1 px-5 text-gray-600 font-medium w-fit border border-gray-200  rounded-md bg-white  shadow-sm shadow-gray-100 flex item-center gap-2">
                  <p>ชั้นเรียนปัจจุบัน</p>
                  <p className="font-semibold text-blue-800">
                    {newGroup.class}.{newGroup.groupName}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <li className="text-[18px] text-gray-700 ">
                    ระบุชั้นเรียนต่อไป
                  </li>
                  <p className="px-2 py-1 text-green-500 font-semibold bg-slate-100 rounded-md">
                    {newGroup.class}
                  </p>
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
                  <div className="grid shadow-lg h-fit grid-cols-[10%_20%_30%_40%] bg-white border-t-2 border-b-2 border-gray-400  text-gray-800   text-lg">
                    <div className="py-1 text-lg text-center">ลำดับ</div>
                    <div className="py-1 text-lg text-center">รหัสนักศึกษา</div>
                    <div className="py-1 text-lg text-center">
                      ชื่อ - นามสกุล
                    </div>
                    <div className="py-1 text-lg text-center">
                      เกรดเทอมล่าสุด
                    </div>
                  </div>
                  {newGroup.student.map((item, index) => (
                    <div
                      key={index}
                      className="border border-t-0 border-gray-300 bg-white text-black grid h-fit grid-cols-[10%_20%_15%_15%_40%] shadow-md"
                    >
                      <div className="text-center py-1 border-r border-gray-300">
                        {index + 1}
                      </div>
                      <div className="text-center py-1 border-r border-gray-300">
                        {item.studentCode}
                      </div>
                      <div className="text-start py-1 pl-8">
                        {item.firstName}
                      </div>
                      <div className="text-start py-1 border-r border-gray-300">
                        {item.lastName}
                      </div>
                      <div className="text-center py-1">
                        {item.gpa.toFixed(2)}
                      </div>
                    </div>
                  ))}
                  <div className="w-full py-5 flex justify-end">
                    <button
                      style={{ userSelect: "none" }}
                      disabled={!nextGroupNameA || !nextGroupNameB}
                      className={`${
                        resetPromote ? "hidden" : "block"
                      } px-10 py-1 rounded-md text-white bg-gray-400 enabled:bg-green-500 enabled:hover:bg-green-600`}
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
      {promoteTrigger && (
        <div
          className="fixed duration-1000 animate-appearance inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
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
                {newGroup?.class}.{newGroup?.groupName} &gt;&gt;{" "}
                {newGroup?.class}.{nextGroupNameA}/{nextGroupNameB}
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
