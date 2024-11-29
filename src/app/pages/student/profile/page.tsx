"use client";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ChevronUp, CircleUserRound } from "lucide-react";
import { exampleStudentData } from "@/resource/students/infoStudent";
import React, { useState } from "react";
import { LabelText } from "@/app/components/labelText/labelText";

export default function page() {
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
    <header className="mx-4 sm:mx-10 lg:mx-44 p-4 mt-10 ">
      <div className="p-4 text-lg sm:text-xl flex flex-col w-auto">
        <div>
          <Badge className="text-sm sm:text-base" variant="outline">
            ประวัตินิสิต
          </Badge>
        </div>
        <div className="mt-4 flex flex-col">
          <div
            className="w-full flex justify-center mt-2 gap-10
            p-4 text-sm"
          >
            {/* icon */}
            <div className="flex justify-center items-center w-10/12 border-2 border-blue-800 p-4 shadow-sm rounded-md">
              <div className="flex justify-center items-center w-4/12">
                <button className="flex items-start gap-6 ">
                  <CircleUserRound
                    style={{ width: "5rem", height: "5rem" }}
                    className="text-[#0C2943]"
                  />
                </button>
              </div>
              {/* Info Student */}
              <div className="flex flex-col gap-4 p-2 w-8/12 font-semibold">
                <div>{exampleStudentData.generalInfo.studentID}</div>
                <div>
                  {exampleStudentData.generalInfo.titleName}{" "}
                  {exampleStudentData.generalInfo.name}
                  {exampleStudentData.generalInfo.surname}
                </div>
                <div className="flex gap-10">
                  <Badge>
                    <div>{exampleStudentData.educationalInfo.faculty}</div>
                  </Badge>
                  <Badge>
                    <div>{exampleStudentData.educationalInfo.program}</div>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* tab of info */}
        <div className="mt-4 flex w-full">
          {/* tab panel control */}
          <div className="w-full">
            <Tabs
              defaultValue="profile"
              className="w-full z-10 flex min-h-dvh border-2 border-black rounded-md"
            >
              {/* Tabs List */}
              <TabsList className="rounded-sm  flex flex-col w-3/12 sticky h-40  ">
                <TabsTrigger value="profile" className="p-4 w-full">
                  ข้อมูลทั่วไป
                </TabsTrigger>
                <TabsTrigger value="education" className="p-4 w-full">
                  ข้อมูลการศึกษา
                </TabsTrigger>
                <TabsTrigger value="address" className="p-4 w-full">
                  ข้อมูลที่อยู่
                </TabsTrigger>
              </TabsList>

              {/* Tabs Content */}
              <div className="w-9/12 flex bg-sky-50 z-10 border-l-4 border-slate-200 p-4">
                <TabsContent
                  value="profile"
                  className="flex-grow ml-6 p-2 text-sm"
                >
                  <div className="p-2">
                    <h1
                      className="p-2 font-bold cursor-pointer text-base flex justify-between"
                      onClick={toggleGeneralInfo}
                    >
                      ข้อมูลการทั่วไป
                      <span className="text-lg">
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
                  <div className="p-2">
                    <h1
                      className="p-2 font-bold cursor-pointer text-base flex justify-between"
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
                  <div className="p-2">
                    <h1
                      className="p-2 font-bold cursor-pointer flex justify-between text-base"
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
