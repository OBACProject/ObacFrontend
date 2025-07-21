import {
  fetchAddSubject,
  fetchDeleteSubject,
  fetchUpdateSubject,
} from "@/api/oldApi/subject/subjectAPI";
import { BookOpen, LibraryBig, Pencil, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SubjectItem } from "@/dto/subjectDto";
import { GetAllSubjectAsync } from "@/api/subject/route";
import { EditSubjectPopUp } from "@/components/common/Popup/EditSubjectPopup";
import { AddSubjectPopUp } from "@/components/common/Popup/AddSubjectPopup";

export default function Form() {
  const [addSubjectCode, setAddSubjectCode] = useState<string | null>(null);
  const [addSubjectName, setAddSubjectName] = useState<string | null>(null);
  const [addProgramId, setAddProgramId] = useState<number | null>(null);
  const [addTerm, setAddTerm] = useState<string | null>(null);
  const [addCredits, setCredits] = useState<number>(0);
  const [addIsActive, setIsActive] = useState<boolean>(false);

  const [editSubjectCode, setEditSubjectCode] = useState<string | null>(null);
  const [editSubjectName, setEditSubjectName] = useState<string | null>(null);
  const [editCreditSubject, setEditCredisSubject] = useState<number>(0);
  const [editSubjectStatus, setEditSubjectStatus] = useState<boolean>(false);
  const [subjects, setSubject] = useState<SubjectItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    GetAllSubjectAsync().then((d: SubjectItem[]) => {
      if (d) {
        setSubject(d);
      } else {
        console.log("ไม่มีข้อมูลเข้ามา ตรวจสอบ api ด่วน");
      }
    });
  }, []);

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [getEditSubjectId, setGetEditIdSubject] = useState<number>(0);
  const [getEditSubjectCode, setGetEditSubjectCode] = useState<string>("");
  const [getEditSubjectName, setGetEditSubjectName] = useState<string>("");

  const [addSubject_popup, setAddSubjectPopUp] = useState<boolean>(false);
  const [editSubject_popup, setEditSubjectPopUp] = useState<boolean>(false);
  const [triggerAddSubject, setTriggerAddSubject] = useState<boolean>(false);

  const [triggerEditSubject, setTriggerEditSubject] = useState<boolean>(false);

  const getAddSubjectProps = (
    subjectName: string,
    subjectCode: string,
    term: string,
    programId: number,
    credits: number,
    isActive: boolean
  ) => {
    setAddSubjectName(subjectName);
    setAddSubjectCode(subjectCode);
    setAddProgramId(programId);
    setAddTerm(term);
    setCredits(credits);
    setIsActive(isActive);
    // console.log("get", {
    //   subjectName,
    //   subjectCode,
    //   term,
    //   programId,
    //   credits,
    //   isActive,
    // });
    setTriggerAddSubject(true);
  };
  const AddSubject = async () => {
    try {
      if (addSubjectCode && addSubjectName && addTerm && addProgramId) {
        const response = await fetchAddSubject(
          addSubjectCode,
          addSubjectName,
          addCredits,
          addTerm,
          addProgramId,
          addIsActive
        );
        if (response) {
          toast.success("เพิ่มวิชาสำเร็จ");
          window.location.reload();
        } else {
          toast.error("เพิ่มวิชาไม่สำเร็จ");
        }
      }
    } catch (err) {
      toast.error("เพิ่มวิชาไม่สำเร็จ");
    }
    // console.log("api", {
    //   addSubjectCode,
    //   addSubjectName,
    //   addTerm,
    //   addProgramId,
    //   addCredits,
    //   addIsActive,
    // });
  };
  useEffect(() => {
    if (triggerAddSubject) {
      AddSubject();
    }
    setTriggerAddSubject(false);
  }, [triggerAddSubject]);

  const getEditSubjectProps = (
    id: number,
    subjectName: string,
    subjectCode: string,
    subjectCredits: number,
    getIsActive: boolean
  ) => {
    setGetEditIdSubject(id);
    setEditSubjectName(subjectName);
    setEditSubjectCode(subjectCode);
    setEditCredisSubject(subjectCredits);
    setEditSubjectStatus(getIsActive);
    setTriggerEditSubject(true);
  };
  const EditSubject = async () => {
    try {
      if (editSubjectCode && editSubjectName) {
        const isUpdated = await fetchUpdateSubject(
          getEditSubjectId,
          editSubjectCode,
          editSubjectName,
          editCreditSubject,
          editSubjectStatus
        );
        if (isUpdated) {
          toast.success("แก้ไขวิชาสำเร็จ");
          setTimeout(() => {
            1000;
          });
          window.location.reload();
        } else {
          toast.error("แก้ไขไม่สำเร็จ");
        }
      }
    } catch (err) {
      toast.error("ผิดพลาด");
    }
  };

  useEffect(() => {
    if (triggerEditSubject) {
      EditSubject();
    }
    setTriggerEditSubject(false);
  }, [triggerEditSubject]);

  const getAndDelete = async (id: number) => {
    const isDeleted = await fetchDeleteSubject(id);

    // if (isDeleted) {
    //   toast.success("ลบสำเร็จ");
    //   getAllSubject().then((d) => setSubject(d));
    // } else {
    //   toast.error("ลบไม่สำเร็จ");
    // }
  };

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
          onClick={() => setAddSubjectPopUp(true)}
        >
          <PlusCircle className="w-5 h-5 text-white  " />
          เพิ่มวิชาและหลักสูตร
        </button>
      </div>
      <div className="w-full rounded-sm px-10">
        <div className="py-2 px-5 flex items-center rounded-t-lg gap-3 bg-gradient-to-r from-blue-500 to-indigo-600">
          <BookOpen className="w-5 h-5 text-white" />
          <div className="text-lg flex items-center justify-start gap-4 text-white font-prompt ">
            รายชื่อวิชาเรียนทั้งหมด
            <p className="bg-blue-400 rounded-md px-4 py-0.5 text-white">
              {subjects?.length || "-"}
            </p>{" "}
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
        {subjects.length > 0 ? (
          <div className="shadow-md">
            {filteredSubjects?.map((item: SubjectItem, index) => (
              <div
                key={item.id}
                className={` ${
                  index % 2 == 0 ? "bg-white" : "bg-white"
                } grid grid-cols-[5%_15%_40%_10%_10%_10%_10%]  hover:bg-blue-100 border border-gray-300  border-t-0`}
              >
                <div className="text-center flex items-center w-full justify-center text-black border-r py-1  border-gray-300">
                  {index + 1}.
                </div>
                <div className="text-start flex items-center justify-center text-gray-700 py-1 px-4 border-r border-gray-300">
                  <p className="line-clamp-1 ">{item.code}</p>
                </div>
                <div className="text-start flex items-center text-gray-700 py-1 px-4 border-r  border-gray-300">
                  <p className="line-clamp-1">{item.name}</p>
                </div>
                <div className="flex items-center justify-center text-gray-700 py-1 px-4 border-r  border-gray-300">
                  <p className="line-clamp-1">{item.curriculumYear || "-"}</p>
                </div>
                <div className="flex items-center justify-center text-gray-700 py-1 px-4 border-r  border-gray-300">
                  <p className="line-clamp-1">{item.credits}</p>
                </div>
                <div className="text-center flex items-center w-full justify-center py-1 border-r border-gray-300">
                  {item.isActive ? (
                    <p className="text-green-500 font-thin line-clamp-1 lg:text-[16px] text-[14px]">
                      ใช้งาน
                    </p>
                  ) : (
                    <p className="text-red-500 font-thin lg:text-[16px] line-clamp-1 text-[14px]]">
                      ไม่ใช้งาน
                    </p>
                  )}
                </div>
                <div className=" flex items-center justify-center gap-2 py-1">
                  <button
                    className="w-fit px-2 flex justify-center py-1 text-sm rounded-full hover:bg-gray-400 text-gray-400 hover:text-white  bg-white-400  shadow-md duration-500  bg-white"
                    onClick={() => {
                      setEditSubjectPopUp(true);
                      setGetEditIdSubject(item.id);
                      setGetEditSubjectCode(item.code);
                      setGetEditSubjectName(item.name);
                      setEditCredisSubject(item.credits);
                      setEditSubjectStatus(item.isActive);
                    }}
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full border-2 border-t-0 border-dashed border-gray-300 grid place-items-center rounded-md  py-10 ">
            <p className="text-2xl  text-gray-600">ไม่มีข้อมูลรายวิชา กรุณาติดต่อผู้พัฒนา</p>
          </div>
        )}
      </div>

      {addSubject_popup && (
        <AddSubjectPopUp
          onClosePopUp={setAddSubjectPopUp}
          onSave={getAddSubjectProps}
        />
      )}
      {editSubject_popup && (
        <EditSubjectPopUp
          onClosePopUp={setEditSubjectPopUp}
          onSave={getEditSubjectProps}
          onDelete={getAndDelete}
          ID={getEditSubjectId}
          SubjectCode={getEditSubjectCode}
          SubjectName={getEditSubjectName}
          SubjectCredits={editCreditSubject}
          isActive={editSubjectStatus}
        />
      )}
    </div>
  );
}
