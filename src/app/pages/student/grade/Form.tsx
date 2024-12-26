'use client'
import React from 'react'
import { Badge } from "@/components/ui/badge";
import { StudentGradeData } from "@/resource/students/studentCardSubjectData";
export default function Form() {
  return (
     <header className="mx-4 sm:mx-10 md:mx-20 lg:mx-44 px-16 lg:px-4 py-8">
          {/* card content all unit and all grade */}
          <Badge className="mx-10 lg:text-xl text-md border-[1px] border-gray-300  text-center w-fit md:px-10 lg:px-10 py-1 rounded-md text-white bg-blue-950">
            ตรวจสอบผลการเรียน
          </Badge>
          <div className="grid w-full mx-10 gap-5 mt-4">
            {StudentGradeData.allTerm.map((temp, index) => (
              <div className="w-full grid" key={index}>
                {/* Term Card */}
                <div className="border rounded-lg shadow-md shadow-gray-200 bg-white">
                  <div className="w-full px-5 py-2 bg-blue-700 bg-opacity-15 rounded-t-lg">
                    <Badge
                      className="text-sm bg-white  sm:text-base"
                      variant="outline"
                    >
                      {temp.term}
                    </Badge>
                  </div>
                  {/* Grade summary */}
    
                  {/* Display all subjects per term */}
                  <div className="">
                    {temp.allStudentGrade.map((subject, subIndex) => (
                      <div
                        key={subIndex}
                        className="border-b px-4 lg:px-10 md:py-2 py-1 lg:py-4 flex justify-center items-center gap-4"
                      >
                        <div className="lg:text-lg w-5/12 line-clamp-1 h-fit">
                          {subject.subject_name} ({subject.subject_code})
                        </div>
                        <div className="text-sm text-gray-600 w-4/12">
                          Credit: {subject.subject_credit}
                        </div>
                        <div className="text-sm font-medium w-3/12">
                          <p className="px-5 text-blue-800 font-semibold bg-blue-100 bg-opacity-50 rounded-md py-1 w-[50px]">
                            {subject.subject_grade}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid md:grid  lg:grid-cols-[40%_30%_30%] md:grid-cols-[40%_30%_30%]  mt-1 gap-4 items-center px-10 py-3 ">
                    <div className="hidden lg:block md:block"></div>
                    <div className="text-sm text-gray-600">
                      Total Credits: {temp.allCredit_per_term}
                    </div>
    
                    <div className="text-xl flex gap-2 font-semibold">
                      <p className="text-gray-800">GPS :</p>
                      <p className="text-lg rounded-md bg-gray-100 px-4 text-blue-800 font-semibold">
                        {temp.grade_per_term}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" mx-10 flex w-full items-center mt-4 justify-center shadow-md shadow-gray-200 rounded-lg border border-gray-100">
            <div className="grid w-full">
              {/* Header Table */}
              <div className="grid gap-10 w-full grid-cols-2 border-b px-6 py-2 bg-blue-700 bg-opacity-15 rounded-t-lg">
                <div className=" text-blue-950 text-lg text-center font-semibold  w-full grid place-items-center  ">
                  <span>หน่วยกิตสะสม</span>
                </div>
                <div className=" text-blue-950 text-lg text-center font-semibold w-full grid place-items-center  ">
                  <span>เกรดเฉลี่ยสะสม</span>
                </div>
              </div>
              <div className="grid gap-10 w-full  grid-cols-2  px-6 py-4">
                {/* content in Table */}
                <div className=" text-blue-700  text-center  w-full grid place-items-center ">
                  <p className="px-5 bg-blue-100 py-1 rounded-md">
                    {StudentGradeData.allCredit}
                  </p>
                </div>
                <div className=" text-blue-700 text-center w-full grid place-items-center ">
                  <p className="px-5 bg-blue-100 py-1 rounded-md">
                    {StudentGradeData.allGrade}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
  )
}
