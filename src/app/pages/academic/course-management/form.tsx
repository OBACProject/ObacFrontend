"use client";
import React, { useState } from "react";
import MenuBar from "./menuBar"; // Adjust the import path as needed
import { useRouter } from "next/navigation";

type DropdownData = {
  id: string;
  label: string;
};

export default function Form() {
  const router = useRouter();
  const [faculty, setFaculty] = useState<string | null>();
  const [level, setLevel] = useState<string | null>();
  const [group, setGroup] = useState<string | null>();
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
  const [noneData, setNone] = useState<DropdownData[]>([
    { id: "01", label: "ไม่มีข้อมูล" },
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
  const [level2, setLevel2] = useState<DropdownData[]>([
    { id: "1", label: "1" },
    { id: "2", label: "2" },
  ]);

  const [subjectA_lv1, setSAL1] = useState<DropdownData[]>([
    { id: "1", label: "ปวช1.1" },
    { id: "2", label: "ปวช1.2" },
    { id: "3", label: "ปวช1.3" },
  ]);
  const [subjectA_lv2, setSAL2] = useState<DropdownData[]>([
    { id: "1", label: "ปวช2.1" },
    { id: "2", label: "ปวช2.2" },
  ]);
  const [subjectA_lv3, setSAL3] = useState<DropdownData[]>([
    { id: "1", label: "ปวช3.1" },
    { id: "2", label: "ปวช3.2" },
  ]);

  const [subjectB_lv1, setSBL1] = useState<DropdownData[]>([
    { id: "1", label: "ปวช1.3" },
    { id: "2", label: "ปวช1.4" },
  ]);
  const [subjectB_lv2, setSBL2] = useState<DropdownData[]>([
    { id: "1", label: "ปวช2.3" },
    { id: "2", label: "ปวช2.4" },
  ]);
  const [subjectB_lv3, setSBL3] = useState<DropdownData[]>([
    { id: "1", label: "ปวช3.3" },
  ]);

  const [subjectC_lv1, setSCL1] = useState<DropdownData[]>([
    { id: "1", label: "ปวช1.5" },
    { id: "2", label: "ปวช1.6" },
  ]);
  const [subjectC_lv2, setSCL2] = useState<DropdownData[]>([
    { id: "1", label: "ปวช2.5" },
    { id: "2", label: "ปวช2.6" },
  ]);
  const [subjectC_lv3, setSCL3] = useState<DropdownData[]>([
    { id: "1", label: "ปวช3.4" },
  ]);

  const [subjectD_lv1, setSDL1] = useState<DropdownData[]>([
    { id: "1", label: "ปวช1.7" },
    { id: "2", label: "ปวช1.8" },
  ]);
  const [subjectD_lv2, setSDL2] = useState<DropdownData[]>([
    { id: "1", label: "ปวช2.7" },
    { id: "2", label: "ปวช2.8" },
  ]);
  const [subjectD_lv3, setSDL3] = useState<DropdownData[]>([
    { id: "1", label: "ปวช3.5" },
  ]);

  const [subjectE_lv1, setSEL1] = useState<DropdownData[]>([
    { id: "1", label: "ปวช1.9" },
  ]);
  const [subjectE_lv2, setSEL2] = useState<DropdownData[]>([
    { id: "1", label: "ปวช2.9" },
  ]);
  const [subjectE_lv3, setSEL3] = useState<DropdownData[]>([
    { id: "1", label: "ปวช3.6" },
  ]);

  const [subjectF_lv1, setSFL1] = useState<DropdownData[]>([
    { id: "1", label: "ปวส1.1" },
    { id: "2", label: "ปวส1.2" },
    { id: "3", label: "ปวส1.3" },
  ]);
  const [subjectF_lv2, setSFL2] = useState<DropdownData[]>([
    { id: "1", label: "ปวส2.1" },
    { id: "2", label: "ปวส2.2" },
  ]);

  const [subjectG_lv1, setSGL1] = useState<DropdownData[]>([
    { id: "1", label: "ปวส1.4" },
    { id: "2", label: "ปวส1.5" },
  ]);
  const [subjectG_lv2, setSGL2] = useState<DropdownData[]>([
    { id: "1", label: "ปวส2.3" },
  ]);

  const [subjectH_lv1, setSHL1] = useState<DropdownData[]>([
    { id: "1", label: "ปวส1.6" },
    { id: "2", label: "ปวส1.7" },
  ]);
  const [subjectH_lv2, setSHL2] = useState<DropdownData[]>([
    { id: "1", label: "ปวส2.4" },
    { id: "2", label: "ปวส2.5" },
  ]);

  const [subjectI_lv1, setSIL1] = useState<DropdownData[]>([
    { id: "1", label: "ปวส1.8" },
  ]);
  const [subjectI_lv2, setSIL2] = useState<DropdownData[]>([
    { id: "1", label: "ปวส2.6" },
  ]);

  const [subjectJ_lv1, setSJL1] = useState<DropdownData[]>([
    { id: "1", label: "ปวส1.9" },
  ]);
  const [subjectJ_lv2, setSJL2] = useState<DropdownData[]>([
    { id: "1", label: "ปวส2.7" },
  ]);

  const [selectedEducation, setSelectedEducation] = useState<string>("");

  const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEducation(e.target.value);
  };

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFaculty(e.target.value);
  };
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value);
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroup(e.target.value);
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

  const EndDropdownData =
    faculty == "01" && level == "1"
      ? subjectA_lv1
      : faculty == "01" && level == "2"
      ? subjectA_lv2
      : faculty == "01" && level == "3"
      ? subjectA_lv3
      : faculty == "02" && level == "1"
      ? subjectB_lv1
      : faculty == "02" && level == "2"
      ? subjectB_lv2
      : faculty == "02" && level == "3"
      ? subjectB_lv3
      : faculty == "03" && level == "1"
      ? subjectC_lv1
      : faculty == "03" && level == "2"
      ? subjectC_lv2
      : faculty == "03" && level == "3"
      ? subjectC_lv3
      : faculty == "04" && level == "1"
      ? subjectD_lv1
      : faculty == "04" && level == "2"
      ? subjectD_lv2
      : faculty == "04" && level == "3"
      ? subjectD_lv3
      : faculty == "05" && level == "1"
      ? subjectE_lv1
      : faculty == "05" && level == "2"
      ? subjectE_lv2
      : faculty == "05" && level == "3"
      ? subjectE_lv3
      : faculty == "11" && level == "1"
      ? subjectF_lv1
      : faculty == "11" && level == "2"
      ? subjectF_lv2
      : faculty == "12" && level == "1"
      ? subjectG_lv1
      : faculty == "12" && level == "2"
      ? subjectG_lv2
      : faculty == "13" && level == "1"
      ? subjectH_lv1
      : faculty == "13" && level == "2"
      ? subjectH_lv2
      : faculty == "14" && level == "1"
      ? subjectI_lv1
      : faculty == "14" && level == "2"
      ? subjectI_lv2
      : faculty == "15" && level == "1"
      ? subjectJ_lv1
      : faculty == "15" && level == "2"
      ? subjectJ_lv2
      : [];

  const handleSearch = () => {
    router.push(`/pages/academic/course-management/${group}`);
  };
  return (
    <>
      <MenuBar />
      <div>
        <div className="shadow-md shadow-gray-200 border-b-[1px] border-gray-200 py-5 lg:px-32 sm:px-20 md:px-32 ">
          <div
            className="grid lg:grid-cols[25%_25%_25%_25%] md:grid-cols-4 
        "
          >
            <div className="gridborder-2 lg:place-items-center sm:place-items-start">
              <label className="block pl-1 mb-2 text-md font-semibold line-clamp-1 text-gray-900">
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
                  <option className="text-start" key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid lg:place-items-center sm:place-items-start ">
              <label className="pl-1 mb-2 text-md font-semibold line-clamp-1 text-gray-900">
                หลักสูตรการศึกษา
              </label>
              <select
                id="faculty"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block text-center py-2 px-4 cursor-pointer"
                onChange={handleFacultyChange}
                disabled={!selectedEducation}
              >
                <option value="" selected>
                  -- เลือก --
                </option>
                {secondDropdownData.map((item) => (
                  <option className="text-start" key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid lg:place-items-center sm:place-items-start">
              <label className="block pl-1 mb-2 text-md font-semibold text-gray-900">
                ชั้นปี
              </label>
              <select
                id="level"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block text-center py-2 px-4 cursor-pointer"
                disabled={!selectedEducation}
                onChange={handleLevelChange}
              >
                <option value="" selected>
                  -- เลือก --
                </option>
                {thridDropdownData.map((item) => (
                  <option className="text-start" key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid lg:place-items-start sm:place-items-start">
              <label className="line-clamp-1 pl-1 mb-2 text-md font-semibold text-gray-900">
                กลุ่มการเรียน
              </label>
              <select
                id="level"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block text-center py-2 px-4 cursor-pointer"
                disabled={!faculty || !level}
                onChange={handleGroupChange}
              >
                <option value="" selected>
                  -- เลือก --
                </option>
                {EndDropdownData.map((item) => (
                  <option
                    className="text-start"
                    key={item.id}
                    value={item.label}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full mt-5 pr-28 grid lg:place-content-end sm:place-items-center">
            <button
              className={`${
                group ? "bg-blue-500" : "bg-blue-200"
              } text-md mr-16 rounded-sm py-2 px-16 text-white `}
              disabled={!group}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
