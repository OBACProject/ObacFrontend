import { Badge } from "@/components/ui/badge";
import { StudentGradeData } from "@/resource/students/studentCardSubjectData";
import React from "react";

export default function Page() {
  return (
    <header className="mx-4 sm:mx-10 lg:mx-44 p-4 mt-10 ">
      {/* card content all unit and all grade */}
      <div className="flex w-full items-center justify-center shadow-md rounded-lg p-4 border-4 border-[#2E58A2]">
        <div className="flex flex-col w-full">
          {/* Header Table */}
          <div className="flex w-full items-center justify-center border-b-2 rounded-lg p-6">
            <div className="flex text-center flex-col  w-4/12 ">
              <span>หน่วยกิตสะสม</span>
            </div>
            <div className="flex text-center flex-col w-4/12">
              เกรดเฉลี่ยสะสม
            </div>
          </div>
          <div className="flex w-full items-center justify-center p-4">
            {/* content in Table */}
            <div className="flex text-center flex-col  w-4/12 ">
              <span>{StudentGradeData.allCredit}</span>
            </div>
            <div className="flex text-center flex-col w-4/12">
              {" "}
              {StudentGradeData.allGrade}{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-10">
        {StudentGradeData.allTerm.map((temp, index) => (
          <div className="w-full flex flex-col gap-5" key={index}>
            {/* Term Card */}
            <div className="border p-5 rounded-lg shadow-md bg-white">
              <Badge className="text-sm sm:text-base" variant="outline">
                {temp.term}
              </Badge>

              {/* Grade summary */}
              <div className="flex flex-col mt-3">
                <div className="text-xl font-semibold">
                  Grade: {temp.grade_per_term}
                </div>
                <div className="text-sm text-gray-600">
                  Total Credits: {temp.allCredit_per_term}
                </div>
              </div>

              {/* Display all subjects per term */}
              <div className="mt-5">
                {temp.allStudentGrade.map((subject, subIndex) => (
                  <div
                    key={subIndex}
                    className="border-b py-2 flex justify-center items-center gap-4"
                  >
                    <div className="text-lg w-4/12">
                      {subject.subject_name} ({subject.subject_code})
                    </div>
                    <div className="text-sm text-gray-600 w-4/12">
                      Credit: {subject.subject_credit}
                    </div>
                    <div className="text-sm font-medium w-4/12">
                      {subject.subject_grade}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}
