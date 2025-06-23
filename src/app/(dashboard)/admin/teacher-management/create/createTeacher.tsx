"use client";

import { Combobox } from "@/components/common/Combobox/combobox";
import { LabelInput } from "@/components/common/Input/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function CreateTeacherPage() {
  //   const [facultyData, setFacultyData] = useState<string[]>([]);
  const facultyData: string[] = [
    "การตลาด",
    "การบัญชี",
    "เทคโนโลยีธุรกิจดิจิทัล",
    "การท่องเที่ยว",
    "ดิจิทัลกราฟฟิก",
  ];

  const genderData: string[] = ["Male", "Female"];
  return (
    <header className="mx-4 sm:mx-10 lg:mx-44 p-4 mt-10 ">
      <div className="flex flex-col">
        <div>
          <Badge className="text-sm sm:text-base" variant="outline">
            เพิ่มบุคคลกรคณะอาจารย์
          </Badge>
        </div>
        {/* name , surname , email */}
        <div className="w-full flex ">
          {/* title name */}
          <div className="flex w-1/6">
            <LabelInput label="title" type="text" htmlFor="title" />
          </div>
          {/* input name */}
          <div className="flex w-1/3">
            <LabelInput label="name" type="text" htmlFor="name" />
          </div>
          {/* input surname */}
          <div className="flex w-1/3">
            <LabelInput label="surname" type="text" htmlFor="surname" />
          </div>
          {/* input gender */}
          <div className="flex w-1/6">
            <div className="flex justify-center items-end w-full">
              <Combobox
                options={genderData.map((gender) => ({
                  value: gender,
                  label: gender,
                }))}
                buttonLabel="Select a Gender"
                onSelect={(selectedGender) =>
                  console.log("Selected:", selectedGender)
                }
              />
            </div>
          </div>
        </div>
        <div className="w-full flex ">
          {/* input name */}
          <div className="flex w-2/6">
            <LabelInput
              label="english name"
              type="text"
              htmlFor="englishName"
            />
          </div>
          {/* input surname */}
          <div className="flex w-2/6">
            <LabelInput
              label="english surname"
              type="text"
              htmlFor="englishSurName"
            />
          </div>
          {/* input age */}
          <div className="flex w-1/6">
            <LabelInput type="number" label="age" htmlFor="age" />
          </div>

          <div className="flex w-1/6">
            <div className="flex justify-center items-end w-full">
              <Combobox
                options={facultyData.map((faculty) => ({
                  value: faculty,
                  label: faculty,
                }))}
                buttonLabel="Select a Faculty"
                onSelect={(selectedFaculty) =>
                  console.log("Selected:", selectedFaculty)
                }
              />
            </div>
          </div>
        </div>
        <div className="w-full flex ">
          {/* input surname */}
          <div className="flex w-1/6">
            <LabelInput
              label="nationality"
              type="text"
              htmlFor="teacherNationality"
            />
          </div>
          <div className="flex w-1/6">
            <LabelInput label="religion" type="text" htmlFor="religion" />
          </div>
          {/* input phone */}
          <div className="flex w-1/3">
            <LabelInput label="phone" type="number" htmlFor="phone" />
          </div>
          <div className="flex w-1/3">
            <LabelInput type="email" label="email" htmlFor="email" />
          </div>
        </div>
        <div className="w-full flex ">
          {/* input name */}
          <div className="flex w-1/3">
            <LabelInput
              label="qualification"
              type="text"
              htmlFor="qualification"
            />
          </div>
          <div className="flex w-1/3">
            <LabelInput
              label="date of joining"
              type="date"
              htmlFor="dateOfJoining"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
