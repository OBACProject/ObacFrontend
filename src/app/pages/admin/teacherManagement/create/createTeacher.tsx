"use client";

import { Combobox } from "@/app/components/combobox/combobox";
import { LabelInput } from "@/app/components/input/input";
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
          {/* input name */}
          <div className="flex w-1/3">
            <LabelInput label="name" type="text" htmlFor="name" />
          </div>
          {/* input surname */}
          <div className="flex w-1/3">
            <LabelInput label="surname" type="text" htmlFor="surname" />
          </div>
          {/* input email */}
          <div className="flex w-1/3">
            <LabelInput type="email" label="email" htmlFor="email" />
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
          {/* input email */}
          <div className="flex w-1/6">
            <LabelInput type="text" label="age" htmlFor="age" />
          </div>
          <div className="flex w-1/6">
            {/* <Combobox
              options={dockData
                .filter((dock: DockDto) => dock.warehouseId === warehouseId)
                .map((dock) => ({
                  value: dock.dockName,
                  label: dock.dockName,
                }))}
              buttonLabel="Select a Dock"
              onSelect={(selectedDock) => DockInputChange(selectedDock)}
              defaultValue={suggestSelectDock}
            /> */}
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
            {/* <LabelInput type="text" label="faculty" htmlFor="faculty" /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
