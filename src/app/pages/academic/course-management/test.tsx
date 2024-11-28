"use client";
import React, { useState } from "react";
import MenuBar from "./menuBar"; // Adjust the import path as needed

type DropdownData = {
  id: string;
  label: string;
};

export default function Test() {
  const [faculty, setFaculty] = useState<string>("");
  const [level , setLevel] = useState<string>('');
  const [group , setGroup] = useState<string>('')
  const [education, setEducation] = useState<DropdownData[]>([
    {
      id: "1",
      label: "ปวช.",
    },
    {
      id: "2",
      label: "ปวส.",
    },
  ]);
  const [faculty1, setFaculty1] = useState<DropdownData[]>([
    { id: "01", label: "OBAC Subject A" },
    { id: "02", label: "OBAC Subject B" },
    { id: "03", label: "OBAC Subject C" },
    { id: "04", label: "OBAC Subject D" },
    { id: "05", label: "OBAC Subject E" },
  ]);

  const [faculty2, setFaculty2] = useState<DropdownData[]>([
    { id: "11", label: "OBAC Subject F" },
    { id: "12", label: "OBAC Subject G" },
    { id: "13", label: "OBAC Subject H" },
    { id: "14", label: "OBAC Subject I" },
    { id: "15", label: "OBAC Subject J" },
  ]);

  const [level1, setLevel1] = useState<DropdownData[]>([
    { id: "1", label: "1" },
    { id: "2", label: "2" },
    { id: "3", label: "3" },
  ]);
  const [level2 , setLevel2] = useState<DropdownData[]>([
    { id: "1", label: "1" },
    { id: "2", label: "2" },
  ])

  const [selectedEducation, setSelectedEducation] = useState<string>("");

  const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEducation(e.target.value);
  };

  const secondDropdownData =
    selectedEducation === "1"
      ? faculty1
      : selectedEducation === "2"
      ? faculty2
      : [];
  const thridDropdownData = 
  selectedEducation === "1"
  ? level1
  : selectedEducation === "2"
  ? level2
  : [];

  return (
    <>
      <MenuBar />
      <div>
        <div className="grid grid-cols-[25%_25%_25%_25%] shadow-md shadow-gray-200 rounded-sm border-b-[1px] border-gray-200 py-5 px-5">
          <div>
            <label className="block pl-1 mb-2 text-md font-semibold text-gray-900">
              ระดับการศึกษา
            </label>
            <select
              id="education"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block text-center py-2 px-4 cursor-pointer"
              onChange={handleEducationChange}
            >
              <option value="" selected>
                -- เลือก --
              </option>
              {education.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block pl-1 mb-2 text-md font-semibold text-gray-900">
              หลักสูตร
            </label>
            <select
              id="faculty"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block text-center py-2 px-4 cursor-pointer"
              disabled={!selectedEducation}
            >
              <option value="" selected>
                -- เลือก --
              </option>
              {secondDropdownData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
            
          <div>
            <label className="block pl-1 mb-2 text-md font-semibold text-gray-900">
              ชั้นปี
            </label>
            <select
              id="level"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block text-center py-2 px-4 cursor-pointer"
              disabled={!selectedEducation}
            >
              <option value="" selected>
                -- เลือก --
              </option>
              {thridDropdownData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>
    </>
  );
}
