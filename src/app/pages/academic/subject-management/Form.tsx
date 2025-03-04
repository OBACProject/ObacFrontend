import { fetchGetAllSubject } from "@/api/subject/subjectAPI";
import { Pencil, PlusCircle, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetAllSubject } from "@/dto/subjectDto";

const getAllSubject = async () => {
  try {
    const data = await fetchGetAllSubject();
    return data;
  } catch (err) {
    return [];
  }
};

export default function Form() {
  const [addSubjectCode, setAddSubjectCode] = useState<string | null>(null);
  const [addSubjectName, setAddSubjectName] = useState<string | null>(null);
  const [editSubjectCode, setEditSubjectCode] = useState<string | null>(null);
  const [editSubjectName, setEditSubjectName] = useState<string | null>(null);
  const [subjects, setSubject] = useState<GetAllSubject[]>([]);
  useEffect(() => {
    getAllSubject().then((d) => {
      setSubject(d);
    });
  }, []);
  console.log(subjects);

  const [getEditSubjectId, setGetEditIdSubject] = useState<number>(0);
  const [getEditSubjectCode, setGetEditSubjectCode] = useState<string>("");
  const [getEditSubjectName, setGetEditSubjectName] = useState<string>("");

  const [addSubject_popup, setAddSubjectPopUp] = useState<boolean>(false);
  const [editSubject_popup, setEditSubjectPopUp] = useState<boolean>(false);
  const [triggerAddSubject, setTriggerAddSubject] = useState<boolean>(false);

  const [triggerEditSubject, setTriggerEditSubject] = useState<boolean>(false);

  const getAddSubjectProps = (subjectName: string, subjectCode: string) => {
    setAddSubjectName(subjectName);
    setAddSubjectCode(subjectCode);
    setTriggerAddSubject(true);
  };
  const AddSubject = async () => {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Grade/UpdateStudentGrade`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ addSubjectCode, addSubjectName }),
    //   }
    // );
    toast.success("เพิ่มวิชาสำเร็จ");
  };
  useEffect(() => {
    if (triggerAddSubject) {
      AddSubject();
    }
    setTriggerAddSubject(false);
  }, [triggerAddSubject]);

  const getEditSubjectProps = (subjectName: string, subjectCode: string) => {
    setEditSubjectName(subjectName);
    setEditSubjectCode(subjectCode);
    setTriggerEditSubject(true);
  };
  const EditSubject = async () => {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Grade/UpdateStudentGrade`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ addSubjectCode, addSubjectName }),
    //   }
    // );
    toast.success("แก้ไขวิชาสำเร็จ");
  };

  useEffect(() => {
    if (triggerEditSubject) {
      EditSubject();
    }
    setTriggerEditSubject(false);
  }, [triggerEditSubject]);

  const getAndDelete = (id: number) => {
    console.log("test");
    console.log(id);
  };

  return (
    <div className="w-full">
      <div className="flex py-5 justify-between">
        <div></div>
        <h1 className="px-10 py-1 rounded-3xl text-lg w-fit bg-gray-600 text-white">
          ระบบจัดการรายวิชา
        </h1>
        <div className="px-5 flex gap-2">
          <button
            className="px-10 py-1 flex gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
            onClick={() => setAddSubjectPopUp(true)}
          >
            <PlusCircle className="w-5 h-5 text-white  " />
            เพิ่มวิชา
          </button>
        </div>
      </div>
      <div className="w-full rounded-sm px-10">
        <div className="w-full grid grid-cols-[5%_30%_35%_15%_15%] bg-[#cfe4ff] text-blue-950 text-lg border border-gray-400 py-2 rounded-t-md">
          <div className="text-center text-black">ลำดับ</div>
          <div className="text-center">รหัสวิชา</div>
          <div className="text-center">ชื่อวิชา</div>
          <div className="text-center">สถานะ</div>
          <div className="text-center">Action</div>
        </div>
        {subjects?.map((item: GetAllSubject, index) => (
          <div
            key={item.id}
            className={` ${
              index % 2 == 0 ? "bg-white" : "bg-gray-100"
            } grid grid-cols-[5%_30%_35%_15%_15%]  hover:bg-blue-100 border border-gray-400  border-t-0`}
          >
            <div className="text-center flex items-center w-full justify-center text-black border-r py-1  border-gray-400">
              {index + 1}.
            </div>
            <div className="text-start flex items-center text-gray-700 py-1 px-4 border-r ">
              <p className="line-clamp-1">{item.subjectCode}</p>
            </div>
            <div className="text-start flex items-center text-gray-700 py-1 px-4 border-r ">
              <p className="line-clamp-1">{item.subjectName}</p>
            </div>
            <div className="text-center flex items-center w-full justify-center py-1 border-r ">
              {item.isActive ? (
                <p className="text-green-500 font-thin line-clamp-1 lg:text-[16px] text-[14px]">
                  เปิดสอน
                </p>
              ) : (
                <p className="text-red-500 font-thin lg:text-[16px] line-clamp-1 text-[14px]]">
                  ปิดสอน
                </p>
              )}
            </div>
            <div className=" flex items-center justify-center gap-2 py-1">
              <button
                className="w-fit px-2 flex justify-center py-1 text-sm rounded-sm hover:bg-gray-400 text-gray-400 hover:text-white hover:border-gray-200 bg-white-400 border border-gray-400 shadow-md  bg-white"
                onClick={() => {
                  setEditSubjectPopUp(true);
                  setGetEditIdSubject(item.id);
                  setGetEditSubjectCode(item.subjectCode);
                  setGetEditSubjectName(item.subjectName);
                }}
              >
                <Pencil className="w-5 h-5 " />
              </button>
            </div>
          </div>
        ))}
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
        />
      )}
    </div>
  );
}

type AddPopUpProps = {
  onClosePopUp: (value: boolean) => void;
  onSave: (name: string, id: string) => void;
};

const AddSubjectPopUp = ({ onClosePopUp, onSave }: AddPopUpProps) => {
  const [subjectName, setSubjectName] = useState<string>("");
  const [subjectCode, setSubjectCode] = useState<string>("");

  const Save = () => {
    if (subjectName && subjectCode) {
      onSave(subjectName, subjectCode);
      onClosePopUp(false);
    }
  };
  return (
    <div
      className="fixed duration-1000 animate-appearance-in inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClosePopUp(false)}
    >
      <div
        className="bg-white rounded-md   lg:w-[500px]  z-100 shadow-lg shadow-gray-500 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-center rounded-t-md text-center text-xl  bg-white">
          <p className="py-2 text-xl font-semibold text-gray-800">
            เพิ่มวิชาเรียน
          </p>
          {/* <button
            className="px-5  rounded-sm   hover:bg-red-300"
            onClick={() => onClosePopUp(false)}
          >
            <X className="text-white w-5 h-5" />
          </button> */}
        </div>
        <div className="w-full px-10 py-5 grid place-items-center gap-4">
          <div className="flex items-center gap-2">
            <label>รหัสวิชา : </label>
            <input
              placeholder="กรอกรหัสวิชา"
              className="w-[200px] px-5 py-1 border border-gray-200 rounded-sm"
              onChange={(e) => setSubjectCode(e.target.value)}
              value={subjectCode}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>ชื่อวิชา : </label>
            <input
              placeholder="กรอกชื่อวิชา"
              className="w-[200px] px-5 py-1 border border-gray-200 rounded-sm"
              onChange={(e) => setSubjectName(e.target.value)}
              value={subjectName}
            />
          </div>
        </div>
        <div className="py-5 w-full flex gap-5 justify-center">
          <button
            className="px-5 w-[90px] bg-gray-300 text-black py-1 rounded-sm  hover:bg-gray-500"
            onClick={() => onClosePopUp(false)}
          >
            ยกเลิก
          </button>{" "}
          <button
            className="px-5 w-[90px] bg-blue-500 text-white py-1 rounded-sm  hover:bg-blue-700"
            onClick={() => Save()}
          >
            เพิ่ม
          </button>
        </div>
      </div>
    </div>
  );
};

type EditPopUpProps = {
  onClosePopUp: (value: boolean) => void;
  onSave: (name: string, id: string) => void;
  onDelete: (Id: number) => void;
  ID: number;
  SubjectName: string;
  SubjectCode: string;
};

const EditSubjectPopUp = ({
  onClosePopUp,
  onSave,
  onDelete,
  ID,
  SubjectName,
  SubjectCode,
}: EditPopUpProps) => {
  const [subjectName, setSubjectName] = useState<string>(SubjectName);
  const [subjectCode, setSubjectCode] = useState<string>(SubjectCode);

  const Save = () => {
    if (subjectName && subjectCode) {
      onSave(subjectName, subjectCode);
      onClosePopUp(false);
    }
  };
  const Delete = () => {
    onDelete(ID);
    onClosePopUp(false);
  };
  return (
    <div
      className="fixed duration-1000 animate-appearance-in inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClosePopUp(false)}
    >
      <div
        className="bg-white rounded-md   lg:w-[500px]  z-100 shadow-lg shadow-gray-500 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-center rounded-t-md text-center text-xl  ">
          <p className="py-4  text-gray-800">แก้ไขวิชาเรียน</p>
        </div>
        <div className="w-full px-10 py-5 grid place-items-center gap-4">
          <div className="flex items-center gap-2">
            <label>รหัสวิชา : </label>
            <input
              className="w-[200px] px-5 py-1 border border-gray-200 rounded-sm"
              onChange={(e) => setSubjectCode(e.target.value)}
              value={subjectCode}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>ชื่อวิชา : </label>
            <input
              className="w-[200px] px-5 py-1 border border-gray-200 rounded-sm"
              onChange={(e) => setSubjectName(e.target.value)}
              value={subjectName}
            />
          </div>
        </div>
        <div className="py-5 w-full flex gap-5 justify-center">
          <button
            className="px-5 w-[80px] bg-blue-400 text-white py-1 rounded-sm  hover:bg-blue-600"
            onClick={() => Save()}
          >
            บันทึก
          </button>
          <button
            className="px-5 w-[80px] bg-red-400 text-white py-1 rounded-sm  hover:bg-red-600"
            onClick={() => Delete()}
          >
            ลบ
          </button>
          <button
            className="px-5 w-[80px] bg-gray-500 text-white py-1 rounded-sm  hover:bg-gray-700"
            onClick={() => onClosePopUp(false)}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};
