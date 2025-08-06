"use client";
import { UserRoundCheck, UserPen, Pencil, PlusCircle } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { SubjectItem } from "@/dto/subjectDto";
import { GetAllSubjectAsync } from "@/api/subject/route";
import { EditSubjectPopUp } from "@/components/common/Popup/EditSubjectPopup";
import { AddSubjectPopUp } from "@/components/common/Popup/AddSubjectPopup";
import { GetAllTeachers, GetAllTeacherUsers } from "@/api/teacher/route";
import { GetAllTeacherResponse } from "@/dto/teacherDto";
import AddTeacherAccountPopup from "@/components/common/Popup/AddTeacherAccountPopup";
import { useRouter } from "next/navigation";
import IsActiveToggleProps from "../../../../components/common/Toggle/IsActiveToggle";

export default function Form() {
  const [teachers, setTeacher] = useState<GetAllTeacherResponse[]>([]);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<SubjectItem | null>(null);
  const [openCreatSubjectPopup, setOpenCreatePopUp] = useState<boolean>(false);
  const [openEditSubjectPopup, setOpenEditSubjectPopup] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const handleToggleActive = (userId: string, newState: boolean) => {
    setTeacher((prev) =>
      prev.map((t) =>
        t.id === userId ? { ...t, isActive: newState } : t
      )
    );
    // TODO: call API update ถ้ามี
  };

  useEffect(() => {
    GetAllTeacherUsers().then((d: GetAllTeacherResponse[]) => {
      if (d) {
        console.log(d);
        setTeacher(d);
      } else {
        console.log("ไม่มีข้อมูลเข้ามา ตรวจสอบ api ด่วน");
      }
    });
  }, []);

  const filtereTeachers = useMemo(() => {
    const lowerSearch = searchTerm.trim().toLowerCase();
    return teachers.filter((teacher) => {
      const code = teacher.teacherCode?.toLowerCase() ?? "";
      const firstName = teacher.firstName?.toLowerCase() ?? "";
      const lastName = teacher.lastName?.toLowerCase() ?? "";
      const fullName = `${teacher.prefix ?? ""} ${teacher.firstName ?? ""} ${teacher.lastName ?? ""}`.toLowerCase();

      return (
        lowerSearch === "" ||
        code.includes(lowerSearch) ||
        firstName.includes(lowerSearch) ||
        lastName.includes(lowerSearch) ||
        fullName.includes(lowerSearch)
      );
    });
  }, [teachers, searchTerm]);

  const paginatedTeachers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtereTeachers.slice(start, end);
  }, [filtereTeachers, currentPage]);

  return (
    <div className="w-full">
      <div className="flex py-3 px-10 justify-start">
        <h1 className="px-8 py-2 rounded-3xl flex gap-2 items-center text-xl w-fit border border-gray-100 shadow-md text-blue-700">
          <UserPen className="h-8 w-8" />
          ระบบจัดการอาจารย์
        </h1>
      </div>

      <div className="px-10 pt-6 pb-4 flex justify-between gap-5">
        <input
          type="text"
          placeholder="ค้นหารายชื่อ"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-400 px-4 py-1 rounded-md"
        />
        <button
          className="px-10 py-1 flex text-lg gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
          onClick={() => setOpenCreatePopUp(true)}
        >
          <PlusCircle className="w-5 h-5 text-white" />
          เพิ่มบัญชีอาจารย์
        </button>
      </div>

      {teachers.length > 0 ? (
        <div className="w-full rounded-sm px-10">
          <div className="py-2 px-5 flex items-center rounded-t-lg gap-3 bg-gradient-to-r from-blue-500 to-indigo-600">
            <UserRoundCheck className="w-5 h-5 text-white" />
            <div className="text-lg flex items-center justify-start gap-4 text-white font-prompt">
              รายชื่ออาจารย์ทั้งหมด
              <p className="bg-blue-400 rounded-md px-4 py-0.5 text-white">
                {filtereTeachers.length || "-"}
              </p>
              รายการ
            </div>
          </div>

          <div className="shadow-lg w-full text-sm">
            <div className="grid grid-cols-[5%_15%_30%_20%_30%] text-white bg-gradient-to-r from-blue-500 to-indigo-600 text-lg">
              <div className="flex items-center justify-center py-2">ลำดับ</div>
              <div className="flex items-center justify-center py-2">รหัสอาจารย์</div>
              <div className="flex items-center justify-center py-2">ชื่ออาจารย์</div>
              <div className="flex items-center justify-center py-2">แผนก</div>
              <div className="flex items-center justify-center py-2">สถานะการใช้งาน</div>
            </div>

            {paginatedTeachers.map((item, index) => (
              <div
                key={item.id}
                onClick={() => router.push(`/admin/teacher-details/1`)}
                className="cursor-pointer grid grid-cols-[5%_15%_9%_21%_20%_30%] bg-white hover:bg-blue-100 text-gray-800 text-base"
              >
                <div className="flex items-center justify-center py-2">
                  {(currentPage - 1) * itemsPerPage + index + 1}.
                </div>

                <div className="flex items-center justify-center py-2">
                  {item.teacherCode}
                </div>
                <div></div>

                <div className="flex items-center py-2 px-4 w-full">
                  <span className="text-start">{`${item.prefix ?? ""} ${item.firstName ?? ""} ${item.lastName ?? ""}`}</span>
                </div>


                <div className="flex items-center justify-center py-2">
                  {item.program}
                </div>

                <div className="flex items-center justify-center py-2">

                  <IsActiveToggleProps
                    isActive={item.isActive} 
                    onToggle={(value) =>
                      handleToggleActive(item.id, value)
                    }
                  />

                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              ก่อนหน้า
            </button>

            <span className="text-sm text-gray-700">
              หน้า {currentPage} / {Math.ceil(filtereTeachers.length / itemsPerPage)}
            </span>

            <button
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage >= Math.ceil(filtereTeachers.length / itemsPerPage)}
            >
              ถัดไป
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full grid place-items-center py-10">
          <div className="py-10 border-gray-400 border-2 border-dashed text-5xl text-gray-500 font-extrabold rounded-lg grid place-items-center w-[700px]">
            ไม่มีข้อมูล
          </div>
        </div>
      )}

      {openCreatSubjectPopup && (
        <AddTeacherAccountPopup onClosePopUp={setOpenCreatePopUp} />
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
