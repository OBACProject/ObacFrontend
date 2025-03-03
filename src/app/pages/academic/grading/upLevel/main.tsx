"use client";

import { GetGropGradeAbove } from "@/api/grad/gradAPI";
import { fetchGetAllStudentGroup } from "@/api/student/studentApi";
import { GetGropGradeAboveModel } from "@/dto/gradDto";
import { StudentGroup } from "@/dto/studentDto";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Select from "react-select";

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
  const [year, setYear] = useState<string>("2024");
  const [nextLevel, setNextLevel] = useState<string>();

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
    try {
      await getGropGradeAbove(grads, term, Number(year), groupID).then(
        (item: GetGropGradeAboveModel | null) => {
          setNewGroup(item);
        }
      );
      console.log(newGroup);
    } catch (err) {
      console.error("Error in onFilterGroup:", err);
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
            onChange={(e) => setYear(e.target.value)}
            value={year}
          >
            <option value="2024">2568</option>
            <option value="2024">2567</option>
            <option value="2024">2566</option>
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
          ค้นหา
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
              <select
                className="px-4 py-1 rounded-md border border-gray-300 "
                value={nextLevel}
                onChange={(e) => {
                  setNextLevel(e.target.value);
                }}
              >
                <option defaultValue=""> เลือก </option>
                <option value="ปวช.2/2">ปวช.2/2</option>
                <option value="ปวช.2/3">ปวช.2/3</option>
                <option value="ปวช.2/1">ปวช.2/1</option>
                <option value="ปวช.2/1">ปวช.2/1</option>
                <option value="ปวช.2/1">ปวช.2/1</option>
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
                  disabled={!nextLevel}
                  className="px-10 py-1 rounded-md text-white bg-gray-400 enabled:bg-green-400 enabled:hover:bg-green-600"
                >
                  เลื่อนชั้น
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
    </div>
  );
}
