import { BookOpen, LibraryBig, Pencil, PlusCircle } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { SubjectItem } from "@/dto/subjectDto";
import { GetAllSubjectAsync } from "@/api/subject/route";
import { EditSubjectPopUp } from "@/components/common/Popup/EditSubjectPopup";
import { AddSubjectPopUp } from "@/components/common/Popup/AddSubjectPopup";

export default function Form() {
  const [subjects, setSubject] = useState<SubjectItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<SubjectItem | null>(
    null
  );

  const [openCreatSubjectPopup, setOpenCreatePopUp] = useState<boolean>(false);
  const [openEditSubjectPopup, setOpenEditSubjectPopup] =
    useState<boolean>(false);
  useEffect(() => {
    GetAllSubjectAsync().then((d: SubjectItem[]) => {
      if (d) {
        const sortedData = d.sort((a, b) => a.id - b.id);
        setSubject(sortedData);
      } else {
        console.log("ไม่มีข้อมูลเข้ามา ตรวจสอบ api ด่วน");
      }
    });
  }, []);

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const lowerSearch = searchTerm.toLowerCase();
      const matchSearch = lowerSearch
        ? subject.code.toLowerCase().includes(lowerSearch) ||
          subject.name.toLowerCase().includes(lowerSearch)
        : true;

      return matchSearch;
    });
  }, [subjects, searchTerm]);

  return (
    <div className="w-full">
      <div className="flex py-3 px-10 justify-start">
        <h1 className="px-8 py-2 rounded-3xl flex gap-2 items-center text-xl w-fit border border-gray-100  shadow-md text-blue-700">
          <LibraryBig className="h-8 w-8" />
          ระบบจัดการรายวิชา
        </h1>
      </div>
      <div className="px-10 py-2 flex justify-between gap-5">
        <input
          type="text"
          placeholder="ค้นหาวิชา..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 px-4 py-1 rounded-md"
        />
        <button
          className="px-10 py-1 flex text-lg gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
          onClick={() => setOpenCreatePopUp(true)}
        >
          <PlusCircle className="w-5 h-5 text-white  " />
          เพิ่มวิชาและหลักสูตร
        </button>
      </div>
      {subjects.length > 0 ? (
        <div className="w-full rounded-sm px-10">
          <div className="py-2 px-5 flex items-center rounded-t-lg gap-3 bg-gradient-to-r from-blue-500 to-indigo-600">
            <BookOpen className="w-5 h-5 text-white" />
            <div className="text-lg flex items-center justify-start gap-4 text-white font-prompt ">
              รายชื่อวิชาเรียนทั้งหมด
              <p className="bg-blue-400 rounded-md px-4 py-0.5 text-white">
                {subjects?.length || "-"}
              </p>
              รายการ
            </div>
          </div>
          <div className="w-full shadow-lg grid grid-cols-[5%_15%_40%_10%_10%_10%_10%] bg-gray-100 text-gray-800 border-t-1 border-b-1 border-gray-400 py-1 px-4 text-center text-lg  items-center justify-center ">
            <div className="text-center py-1 text-black">ลำดับ</div>
            <div className="text-center py-1">รหัสวิชา</div>
            <div className="text-center py-1">ชื่อวิชา</div>
            <div className="text-center py-1">ปีหลักสูตร</div>
            <div className="text-center py-1">หน่วยกิต</div>
            <div className="text-center py-1">สถานะ</div>
            <div className="text-center py-1">Action</div>
          </div>
          {filteredSubjects?.map((item: SubjectItem, index) => (
            <div
              key={item.id}
              className={` 
                grid grid-cols-[5%_15%_40%_10%_10%_10%_10%]   hover:bg-blue-100 border border-gray-300  border-t-0`}
            >
              <div className="text-center flex items-center w-full justify-center text-black border-r py-1  border-gray-300">
                {index+1}.
              </div>
              <div className="text-start flex items-center justify-center text-gray-700 py-1 px-4 border-r border-gray-300">
                <p className="">{item.code}</p>
              </div>
              <div className="text-start flex items-center text-gray-700 py-1 px-4 border-r  border-gray-300 ">
                <p className="">{item.name}</p>
              </div>
              <div className="flex items-center justify-center text-gray-700 py-1 px-4 border-r  border-gray-300">
                <p className="">{item.curriculumYear || "-"}</p>
              </div>
              <div className="flex items-center justify-center text-gray-700 py-1 px-4 border-r  border-gray-300">
                <p className="">{item.credits}</p>
              </div>
              <div className="text-center flex items-center w-full justify-center py-1 border-r border-gray-300">
                {item.isActive ? (
                  <p className="text-green-500 font-thin  lg:text-[16px] text-[14px]">
                    ใช้งาน
                  </p>
                ) : (
                  <p className="text-red-500 font-thin lg:text-[16px] line-clamp-1 text-[14px]]">
                    ไม่ใช้งาน
                  </p>
                )}
              </div>
              <div className=" flex items-center justify-center  py-1">
                <button
                  className="w-fit  border-[1px] border-gray-400 flex justify-center items-center rounded-md py-0.5 px-3 hover:bg-gray-400 text-gray-400 hover:text-white   bg-white"
                  onClick={() => {
                    setSelectedSubject(item);
                    setOpenEditSubjectPopup(true);
                  }}
                >
                  <Pencil className="w-4 h-4" /> แก้ไข
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full grid place-items-center py-10">
          <div className="py-10 border-gray-400 border-2 border-dashed  text-5xl text-gray-500 font-extrabold  rounded-lg grid place-items-center w-[700px]">
            ไม่มีข้อมูล{" "}
          </div>
        </div>
      )}

      {openCreatSubjectPopup && (
        <AddSubjectPopUp
          onClosePopUp={setOpenCreatePopUp}
          // onSave={getAddSubjectProps}
        />
      )}
      {openEditSubjectPopup && selectedSubject && (
        <EditSubjectPopUp
          onClosePopUp={setOpenEditSubjectPopup}
          data={selectedSubject}
        />
      )}
    </div>
  );
}
