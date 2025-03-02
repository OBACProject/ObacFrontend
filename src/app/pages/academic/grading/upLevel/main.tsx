"use client";

import { fetchGetAllStudentGroup } from "@/api/student/studentApi";
import { StudentGroup } from "@/dto/studentDto";
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

export default function Main() {
  const [groups, setGroups] = useState<StudentGroup[]>([]);
  const [groupID, setGroupID] = useState<number>(0);
  const [value, setValue] = useState(2.0);
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

    setValue(newValue);
  };

  const [newGroup, setNewGroup] = useState<StudentGroup[]>([
    {
      studentGroupId: 1,
      studentGroupName: "S1",
      class: "ปวช1.1",
      program: "test",
      studentCount: 45,
    },
  ]);

  const OnFilterGroup = () => {
    try {
      setNewGroup([
        {
          studentGroupId: 1,
          studentGroupName: "S1",
          class: "ปวช1.1",
          program: "test",
          studentCount: 45,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="pl-16 py-5">
      <div className="flex justify-center">
        <div className="px-10 rounded-3xl text-lg py-2 bg-gray-600 text-white ">
          ปรับเลื่อนชั้นเรียน
        </div>
      </div>
      <div className="w-full flex items-center gap-4 justify-center py-5 ">
        <div className="flex items-center gap-2">
          <label className="text-black text-[16px]">เกรดขั้นต่ำ</label>
          <input
            type="number"
            className="border-2 py-1 border-gray-200 rounded-sm w-[80px] text-center"
            value={value.toFixed(2)}
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
          className="px-5 text-white py-1.5 rounded-md text-center w-fit bg-blue-500 hover:bg-blue-700"
          onClick={() => {
            OnFilterGroup;
          }}
        >
          ค้นหา
        </button>
      </div>

      <div className="px-10  py-5">
        {newGroup.length > 0 ? (
          <div className="px-10 grid gap-4">
            <div className="flex gap-2 item-center">
              <label className="text-lg ">ชั้นต่อไป</label>
              <select className="px-4 py-1 rounded-md border border-gray-300 ">
                <option>--None--</option>
                <option>ปวช.2/2</option>
                <option>ปวช.2/3</option>
                <option>ปวช.2/1</option>
                <option>ปวช.2/1</option>
                <option>ปวช.2/1</option>
              </select>
            </div>
            <div>
              <div className="border-2 border-gray-400 bg-blue-200 text-black grid h-fit grid-cols-[10%_20%_20%_20%_30%] ">
                <div className="py-1 text-lg text-center">ลำดับ</div>
                <div className="py-1 text-lg text-center">รหัสนักศึกษา</div>
                <div className="py-1 text-lg text-center">ชื่อ-นามสกุล</div>
                <div className="py-1 text-lg text-center">ชั้นเรียน</div>
                <div className="py-1 text-lg text-center">หลักสูตร</div>
              </div>
              {newGroup.map((item, index) => (
                <div className="border-2 border-t-0 border-gray-400 bg-white text-black grid h-fit grid-cols-[10%_20%_20%_20%_30%]">
                  <div className="text-center py-1">{index + 1}</div>
                  <div className="text-center py-1">studentId</div>
                  <div className="text-center py-1">Name</div>
                  <div className="text-center py-1">class</div>
                  <div className="text-center py-1">Program</div>
                </div>
              ))}
              <div className="w-full py-5 flex justify-end">
                <button className="px-10 py-1 rounded-md text-white bg-green-400 hover:bg-green-600">
                  บันทึก
                </button>
                </div>
            </div>
          </div>
        ) : (
          <div className="w-full border-2 grid place-items-center border-gray-300 border-dashed rounded-md py-10 text-gray-500 text-2xl font-semibold">
            ยังไม่ได้เลือก
          </div>
        )}
      </div>
    </div>
  );
}
