"use client";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ChevronUp, CircleUserRound } from "lucide-react";
import { exampleStudentData } from "@/resource/students/infoStudent";
import React, { useState } from "react";
import { LabelText } from "@/app/components/labelText/labelText";

export default function Form() {
  const [isGeneralInfoVisible, setGeneralInfoVisible] = useState(true);

  const toggleGeneralInfo = () => {
    setGeneralInfoVisible((prev) => !prev);
  };
  const [isFatherInfoVisible, setIsFatherInfoVisible] = useState(true);

  const toggleFatherInfo = () => {
    setIsFatherInfoVisible((prev) => !prev);
  };

  const [isMotherInfoVisible, setIsMotherInfoVisible] = useState(true);

  const toggleMotherInfo = () => {
    setIsMotherInfoVisible((prev) => !prev);
  };

  const [isEducationInfoVisible, setIsEducationInfoVisible] = useState(true);

  const toggleEducationInfo = () => {
    setIsEducationInfoVisible((prev) => !prev);
  };

  const [isAddressInfoVisible, setIsAddressInfoVisible] = useState(true);
  const toggleAddressInfo = () => {
    setIsAddressInfoVisible((prev) => !prev);
  };

  const [isPresentAddressInfoVisible, setIsPresentAddressInfoVisible] =
    useState(true);
  const togglePresentAddressInfo = () => {
    setIsPresentAddressInfoVisible((prev) => !prev);
  };
  return (
    <header className="mx-4 sm:mx-10 md:mx-20 lg:mx-44 px-16 lg:px-4 py-8">
      <div className="px-5 py-4 text-lg sm:text-xl ">
        <div className="px-5 flex gap-2 items-center">
          <div className="text-xl  border-[1px] border-gray-300  text-center w-fit px-10 py-1 rounded-md text-white bg-blue-950">
            ประวัตินิสิต
          </div>
          <div className="ml-4 text-lg">
            สถานะ : 
          </div>
          <div className="px-6 py-1 text-sm bg-sky-100 text-blue-600 rounded-md">
            กำลังศึกษา
          </div>
        </div>
        <div className=" flex flex-col">
          <div
            className="w-full flex justify-start  gap-4
                px-5 py-4 text-sm"
          >
            {/* icon */}
            <div className="flex justify-start items-center  w-full border-[1px] border-gray-200  px-10 gap-10 py-4 shadow-md shadow-gray-200 bg-gradient-to-r from-sky-100 via-gray-100 to-sky-100 rounded-md">
              <div className="flex justify-start items-center w-fit">
                <button className="flex items-start gap-6 ">
                  <CircleUserRound
                    style={{ width: "5rem", height: "5rem" }}
                    className="text-blue-950 "
                  />
                </button>
              </div>
              {/* Info Student */}
              <div className="flex flex-col gap-2 p-2 w-8/12 font-semibold">
                <div className="text-xl text-gray-700">{exampleStudentData.generalInfo.studentID}</div>
                <div>
                  {exampleStudentData.generalInfo.titleName}{" "}
                  {exampleStudentData.generalInfo.name}
                  {exampleStudentData.generalInfo.surname}
                </div>
                <div className="flex gap-10">
                  <Badge className="py-1 px-4 shadow-none bg-blue-950">
                    <div>{exampleStudentData.educationalInfo.faculty}</div>
                  </Badge>
                  <Badge className="py-1 px-4 shadow-none bg-blue-950">
                    <div>{exampleStudentData.educationalInfo.program}</div>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 flex w-full">
          <div className="w-full">
            <Tabs
              defaultValue="profile"
              className="w-full z-10 flex  transition shadow-lg shadow-gray-200 border-[1px] border-gray-200 rounded-md bg-white overflow-hidden"
            >
              <TabsList className="rounded-sm pb-20 bg-blue-50 flex flex-col gap-2 w-3/12 pt-4 sticky h-auto items-start justify-start bg-gradient-to-b from-sky-100 via-gray-100 to-sky-100 ">
                <TabsTrigger value="profile" className="px-4 py-2  w-full">
                  ข้อมูลทั่วไป
                </TabsTrigger>
                <TabsTrigger value="education" className="px-4 py-2  w-full">
                  ข้อมูลการศึกษา
                </TabsTrigger>
                <TabsTrigger value="address" className="px-4 py-2  w-full">
                  ข้อมูลที่อยู่
                </TabsTrigger>
              </TabsList>

              <div className="w-full flex  items-start z-10 border-l-2 border-slate-200 ">
                <TabsContent
                  value="profile"
                  className="flex-grow   text-sm"
                >
                  <div className="">
                    <h1
                      className="py-3  px-5 font-bold  cursor-pointer text-base flex justify-between "
                      onClick={toggleGeneralInfo}
                    >
                      ข้อมูลการทั่วไป
                      <span className="text-lg ">
                        {isGeneralInfoVisible ? <ChevronDown /> : <ChevronUp />}
                      </span>
                    </h1>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isGeneralInfoVisible ? "max-h-[1000px]" : "max-h-0"
                      }`}
                    >
                      <div className="relative gap-2 w-full items-center flex flex-col">
                        <LabelText
                          topic="รหัสนิสิต"
                          data={exampleStudentData.generalInfo.studentID}
                        />
                        <LabelText
                          topic="ชื่อ-นามสกุล"
                          data={[
                            exampleStudentData.generalInfo.titleName,
                            exampleStudentData.generalInfo.name,
                            exampleStudentData.generalInfo.surname,
                          ]}
                        />
                        <LabelText
                          topic="เพศ"
                          data={exampleStudentData.generalInfo.gender}
                        />
                        <LabelText
                          topic="วันเกิด"
                          data={exampleStudentData.generalInfo.birthData}
                        />
                        <LabelText
                          topic="สัญชาติ"
                          data={exampleStudentData.generalInfo.nationality}
                        />
                        <LabelText
                          topic="เบอร์โทรติดต่อ"
                          data={exampleStudentData.generalInfo.Tel}
                        />
                        <LabelText
                          topic="Email"
                          data={exampleStudentData.generalInfo.Contract.email}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="">
                    <h1
                      className="py-3 px-5 font-bold cursor-pointer text-base flex justify-between"
                      onClick={toggleFatherInfo}
                    >
                      ข้อมูลบิดา
                      <span className="text-lg">
                        {isFatherInfoVisible ? <ChevronDown /> : <ChevronUp />}
                      </span>
                    </h1>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isFatherInfoVisible ? "max-h-[1000px]" : "max-h-0"
                      }`}
                    >
                      {isFatherInfoVisible && (
                        <div className="relative gap-2 w-full items-center flex flex-col">
                          <LabelText
                            topic="บัตรประชาชน"
                            data={
                              exampleStudentData.fatherInfo.identificationCard
                            }
                          />
                          <LabelText
                            topic="ชื่อ-นามสกุล"
                            data={[
                              exampleStudentData.fatherInfo.titleName,
                              exampleStudentData.fatherInfo.name,
                              exampleStudentData.fatherInfo.surname,
                            ]}
                          />
                          <LabelText
                            topic="job"
                            data={exampleStudentData.fatherInfo.job}
                          />
                          <LabelText
                            topic="เบอร์โทรติดต่อ"
                            data={exampleStudentData.fatherInfo.tel}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="">
                    <h1
                      className="py-3 px-5 font-bold cursor-pointer flex justify-between text-base"
                      onClick={toggleMotherInfo}
                    >
                      ข้อมูลมารดา
                      <span className="text-lg">
                        {isMotherInfoVisible ? <ChevronDown /> : <ChevronUp />}
                      </span>
                    </h1>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isMotherInfoVisible ? "max-h-[1000px]" : "max-h-0"
                      }`}
                    >
                      {isMotherInfoVisible && (
                        <div className="relative gap-2 w-full items-center flex flex-col">
                          <LabelText
                            topic="บัตรประชาชน"
                            data={
                              exampleStudentData.motherInfo.identificationCard
                            }
                          />
                          <LabelText
                            topic="ชื่อ-นามสกุล"
                            data={[
                              exampleStudentData.motherInfo.titleName,
                              exampleStudentData.motherInfo.name,
                              exampleStudentData.motherInfo.surname,
                            ]}
                          />
                          <LabelText
                            topic="job"
                            data={exampleStudentData.motherInfo.job}
                          />
                          <LabelText
                            topic="เบอร์โทรติดต่อ"
                            data={exampleStudentData.motherInfo.tel}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="education"
                  className="flex-grow ml-6 p-2 text-sm"
                >
                  <div className="p-2">
                    <h1
                      className="p-2 font-bold cursor-pointer flex justify-between text-base"
                      onClick={toggleEducationInfo}
                    >
                      ข้อมูลการศึกษา
                      <span className="text-lg">
                        {isEducationInfoVisible ? (
                          <ChevronDown />
                        ) : (
                          <ChevronUp />
                        )}
                      </span>
                    </h1>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isEducationInfoVisible ? "max-h-[1000px]" : "max-h-0"
                      }`}
                    >
                      <div className="relative gap-2 w-full items-center flex flex-col">
                        <LabelText
                          topic="หลักสูตร"
                          data={exampleStudentData.educationalInfo.faculty}
                        />
                        <LabelText
                          topic="สาขา"
                          data={exampleStudentData.educationalInfo.program}
                        />
                        <LabelText
                          topic="ระดับการศึกษา"
                          data={
                            exampleStudentData.educationalInfo.educationLevel
                          }
                        />
                        <LabelText
                          topic="สถานภาพนิสิต"
                          data={
                            exampleStudentData.educationalInfo.educationStatus
                          }
                        />
                        <LabelText
                          topic="ปวช. / ปวส."
                          data={exampleStudentData.educationalInfo.class}
                        />
                        <LabelText
                          topic="ที่อยู่สถาบัน"
                          data={[
                            exampleStudentData.educationalInfo.address.address,
                            exampleStudentData.educationalInfo.address
                              .subDistrict,
                            exampleStudentData.educationalInfo.address.district,
                            exampleStudentData.educationalInfo.address.province,
                            exampleStudentData.educationalInfo.address
                              .postalCode,
                          ]}
                        />
                        <LabelText
                          topic="เบอร์โทรสภาพสถาบัน"
                          data={exampleStudentData.educationalInfo.tel}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="address"
                  className="flex-grow ml-6 p-2 text-sm"
                >
                  <div className="p-2">
                    <h1
                      className="p-2 font-bold cursor-pointer flex justify-between text-base"
                      onClick={toggleAddressInfo}
                    >
                      ที่อยู่ตามทะเบียนบ้าน
                      <span className="text-lg">
                        {isAddressInfoVisible ? <ChevronDown /> : <ChevronUp />}
                      </span>
                    </h1>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isAddressInfoVisible ? "max-h-[1000px]" : "max-h-0"
                      }`}
                    >
                      <div className="relative gap-2 w-full items-center flex flex-col">
                        <LabelText
                          topic="ที่อยู่บ้าน"
                          data={exampleStudentData.addressInfo.address}
                        />
                        <LabelText
                          topic="ตำบล"
                          data={exampleStudentData.addressInfo.subDistrict}
                        />
                        <LabelText
                          topic="อำเภอ"
                          data={exampleStudentData.addressInfo.district}
                        />
                        <LabelText
                          topic="จังหวัด"
                          data={exampleStudentData.addressInfo.province}
                        />
                        <LabelText
                          topic="รหัสไปรษณีย์"
                          data={exampleStudentData.addressInfo.postalCode}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <h1
                      className="p-2 font-bold cursor-pointer flex justify-between text-base"
                      onClick={togglePresentAddressInfo}
                    >
                      ที่อยู่ปัจจุบัน
                      <span className="text-lg">
                        {isPresentAddressInfoVisible ? (
                          <ChevronDown />
                        ) : (
                          <ChevronUp />
                        )}
                      </span>
                    </h1>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isPresentAddressInfoVisible
                          ? "max-h-[1000px]"
                          : "max-h-0"
                      }`}
                    >
                      <div className="relative gap-2 w-full items-center flex flex-col">
                        <LabelText
                          topic="ที่อยู่บ้าน"
                          data={exampleStudentData.presentAddressInfo.address}
                        />
                        <LabelText
                          topic="ตำบล"
                          data={
                            exampleStudentData.presentAddressInfo.subDistrict
                          }
                        />
                        <LabelText
                          topic="อำเภอ"
                          data={exampleStudentData.presentAddressInfo.district}
                        />
                        <LabelText
                          topic="จังหวัด"
                          data={exampleStudentData.presentAddressInfo.province}
                        />
                        <LabelText
                          topic="รหัสไปรษณีย์"
                          data={
                            exampleStudentData.presentAddressInfo.postalCode
                          }
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </header>
  );
}
