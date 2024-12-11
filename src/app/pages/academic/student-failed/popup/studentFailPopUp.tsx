import { LabelInput } from "@/app/components/input/input";
import { LabelText } from "@/app/components/labelText/labelText";
import { makeColumns } from "@/app/components/table/makeColumns";
import { DataTable } from "@/app/components/table/tableComponent";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  StudentFailColumnData,
  StudentFailDataColumn,
  SubjectOfFailStudentData,
  SubjectOfStudentFailDataColumn,
} from "@/resource/academics/studentInfoList/studentFailData";
import { useEffect, useState } from "react";

export function StudentFailPopUp(props: {
  studentId: number;
  onClose: () => void;
}) {
  const data: StudentFailDataColumn | undefined = StudentFailColumnData.find(
    (item) => item.runningNumber === props.studentId
  );
  const [searchSubject, setSearchSubject] = useState<string>("");
  const [failSubject, setFailSubject] = useState<
    SubjectOfStudentFailDataColumn[]
  >([]);
  const [failSubjectFilter, setFailSubjectFilter] = useState<
    SubjectOfStudentFailDataColumn[]
  >([]);

  const columns = makeColumns<SubjectOfStudentFailDataColumn>(
    {
      id: 0,
      subjectCode: "",
      subjectName: "",
      score: 0,
      grade: "มผ",
    },
    "id",
    {
      id: "รหัสวิชา",
      subjectCode: "รหัสวิชา",
      subjectName: "ชื่อวิชา",
      score: "คะแนนที่ทำได้",
      grade: "เกรด",
    },
    [
      {
        label: "ผ่าน",
        onClick: (id: string | number) => console.log(` ID: ${id}`),
        className: "bg-green-500 text-white",
      },
      {
        label: "ไม่ผ่าน",
        onClick: (id: string | number) => console.log(` ID: ${id}`),
        className: "bg-red-500 text-white",
      },
    ]
  );

  useEffect(() => {
    setFailSubject(SubjectOfFailStudentData);
    // setFailSubjectFilter(SubjectOfFailStudentData);
  }, []);

  useEffect(() => {
    const searchMatch = searchSubject.toLowerCase();
    const filterData = failSubject.filter((item) => {
      return (
        item.subjectCode.toLowerCase().includes(searchMatch) ||
        item.subjectName.toLowerCase().includes(searchMatch)
      );
    });
    setFailSubjectFilter(filterData);
  }, [searchSubject, failSubject]);

  const nameData = data?.thaiName + " " + data?.thaiLastName;
  return (
    <>
      {/* create a pop up page */}
      <div
        className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70 z-10 "
        onClick={props.onClose}
      >
        <div
          className=" bg-white shadow-lg shadow-gray-400 rounded-lg w-3/4 z-100 p-6 overflow-y-auto h-[calc(100%-2rem)]"
          onClick={(e) => e.stopPropagation()}
        >
          <Badge variant={"outline"} className="text-lg">
            รายละเอียดนักเรียน
          </Badge>
          {/* ควรประกอบไปด้วย ชื่อ นามสกุล ระดับการศึกษา หลักสูตร สาขา */}
          <div className="flex flex-col p-4 gap-4 bg-slate-50 my-4 rounded-md mx-4">
            <div className="w-full flex gap-4">
              <div className="w-1/2">
                <div className="bg-white">
                  <LabelText topic="ชื่อ-นามสกุล" data={nameData} />
                </div>
                {/* <LabelInput
                  label="ชื่อ-นามสกุล"
                  type="text"
                  htmlFor="name"
                  editabled={false}
                /> */}
              </div>
              <div className="w-1/2 bg-white">
                <LabelText topic="ระดับการศึกษา" data={data.class} />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-1/3 bg-white">
                <LabelText topic="หลักสูตร" data={data.facultyName} />
              </div>
              <div className="w-1/3 bg-white">
                <LabelText topic="สาขา" data={data.programName} />
              </div>
            </div>
          </div>
          <Badge variant={"outline"} className="text-lg">
            รายละเอียดวิชา
          </Badge>
          {/* table data  */}
          {/* id รหัสวิชา ชื่อวิชา คะแนนที่ทำได้ เกรด action ผ่านไม่ผ่าน */}
          <div>
            <div className="w-1/3 my-4 flex justify-between">
              <Input
                type="text"
                placeholder="Search..."
                onChange={(event) => setSearchSubject(event.target.value)}
              />
            </div>
            <DataTable columns={columns} data={failSubjectFilter} />
          </div>
        </div>
      </div>
    </>
  );
}
