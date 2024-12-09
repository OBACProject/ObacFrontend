"use client";
import { useState } from "react";
import { Subject } from "./subject/subject";
import { ClassSubject } from "./classSubject/classSubject";
import { ChevronRight } from "lucide-react";

export interface ClassSubject {
  id: number;
  year: number;
  term: number;
  subjectName: string | undefined;
}

export function Main() {
  // use for calling a classSubjectPage
  const [classSubjectPage, setClassSubjectPage] = useState<ClassSubject>();

  // Use state to manage the selected tab
  const [activeTab, setActiveTab] = useState<string>("subject");
  const [subject, setSubject] = useState<string>("");
  const [classSubject, setClassSubject] = useState<string>("");
  const [studentClass, setStudentClass] = useState<string>("");
  // useEffect(() => {

  // }, [subject, classSubject, studentClass]);

  const handleTab = (tab: string) => {
    console.log("tab", tab);
    setActiveTab(tab); // Update active tab
  };

  // process is when select a subject it will show a subject name and

  return (
    <>
      {/* breadcrumb by a polygon arrow */}
      {/* group of arrow button */}
      <div className="w-full flex gap-2 ">
        <div className="mt-4  w-auto flex p-2 bg-slate-100 rounded-tr-full overflow-hidden rounded-br-full relative">
          {/* subject tab */}
          <div className="w-full flex items-center justify-center ">
            <button
              className="w-32  hover:bg-slate-50 rounded-md"
              // style={{
              //   clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
              // }}
            >
              <span className="text-black text-sm font-bold">Subject</span>
            </button>
            {/* icon  */}
            <div className="">
              <ChevronRight></ChevronRight>
            </div>
          </div>
          {/* class tab */}
          <div className="w-full flex items-center justify-center ">
            <div></div>
            <button className="w-32 hover:bg-slate-50 rounded-md">
              <span className="text-black text-sm font-bold">Class</span>
            </button>
            <div className="">
              <ChevronRight></ChevronRight>
            </div>
          </div>
        </div>
      </div>

      {activeTab === "subject" && (
        <div>
          <Subject
            handleTab={handleTab}
            handleSelectedData={(data) => setClassSubjectPage(data)}
          />
        </div>
      )}
      {activeTab === "class" && (
        <div>
          <ClassSubject
            id={classSubjectPage.id}
            year={classSubjectPage.year}
            term={classSubjectPage.term}
            subjectName={classSubjectPage.subjectName}
          />
        </div>
      )}
      {/* <ClassSubject
        id={2}
        year={2024}
        term={1}
        subjectName="วิชาอะไรไม่รู้ละ"
      /> */}
      {/* Use the Subject component */}
      {/* {activeTab === "class" && <div>Class</div>}
      {activeTab === "student" && <div>Student</div>}  */}
    </>
  );
}
