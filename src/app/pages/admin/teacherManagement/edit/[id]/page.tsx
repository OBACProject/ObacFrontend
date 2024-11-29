"use client";

import { Combobox } from "@/app/components/combobox/combobox";
import { LabelInput } from "@/app/components/input/input";
import { Badge } from "@/components/ui/badge";
import { TeacherData, getTeacherDataById } from "@/resource/admin/teacherData";
import { get } from "http";
import { useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const facultyData: string[] = [
    "การตลาด",
    "การบัญชี",
    "เทคโนโลยีธุรกิจดิจิทัล",
    "การท่องเที่ยว",
    "ดิจิทัลกราฟฟิก",
  ];

  const genderData: string[] = ["Male", "Female"];

  // getID a data from API
  const teacherDataById: TeacherData | null = getTeacherDataById(id) ?? null;
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const imageFromBackend = teacherDataById?.teacherProfilePicture;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!teacherDataById) {
    // Handle missing data case
    return (
      <header className="mx-4 sm:mx-10 lg:mx-44 p-4 mt-10 ">
        <div className="flex flex-col">
          <div>
            <h1>No Teacher Data Found for ID: {id}</h1>
          </div>
        </div>
      </header>
    );
  }
  console.log(teacherDataById);
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
            <LabelInput
              label="title"
              type="text"
              htmlFor="title"
              editData={teacherDataById.teacherRank}
            />
          </div>
          {/* input name */}
          <div className="flex w-1/3">
            <LabelInput
              label="name"
              type="text"
              htmlFor="name"
              editData={teacherDataById.thaiName}
            />
          </div>
          {/* input surname */}
          <div className="flex w-1/3">
            <LabelInput
              label="surname"
              type="text"
              htmlFor="surname"
              editData={teacherDataById.thaiLastName}
            />
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
                defaultValue={teacherDataById.teacherGender}
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
              editData={teacherDataById.teacherFirstName}
            />
          </div>
          {/* input surname */}
          <div className="flex w-2/6">
            <LabelInput
              label="english surname"
              type="text"
              htmlFor="englishSurName"
              editData={teacherDataById.teacherLastName}
            />
          </div>
          {/* input age */}
          {/* editData={teacherDataById.} */}
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
                defaultValue={teacherDataById.teacherFaculty}
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
              editData={teacherDataById.teacherNationality}
            />
          </div>
          <div className="flex w-1/6">
            <LabelInput
              label="religion"
              type="text"
              htmlFor="religion"
              editData={teacherDataById.teacherReligion}
            />
          </div>
          {/* input phone */}
          <div className="flex w-1/3">
            <LabelInput
              label="phone"
              type="number"
              htmlFor="phone"
              editData={teacherDataById.teacherPhone}
            />
          </div>
          <div className="flex w-1/3">
            <LabelInput
              type="email"
              label="email"
              htmlFor="email"
              editData={teacherDataById.teacherEmail}
            />
          </div>
        </div>
        <div className="w-full flex ">
          {/* input name */}
          <div className="flex w-1/3">
            <LabelInput
              label="qualification"
              type="text"
              htmlFor="qualification"
              editData={teacherDataById.teacherQualification}
            />
          </div>
          <div className="flex w-1/3">
            <LabelInput
              label="date of joining"
              type="date"
              htmlFor="dateOfJoining"
              editData={teacherDataById.teacherDateOfJoining}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
