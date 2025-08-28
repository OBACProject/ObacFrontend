"use client";

import ChangeStudentGroup from "@/components/common/Popup/changeStudentGroup";
import ConfirmChangeStudentsStatus from "@/components/common/Popup/confirmChangeStudentsStatus";

import { educationOptions } from "@/resource/academics/options/studentOption";
import {
  ArrowRightLeft,
  CircleX,
  Dock,
  Download,
  FileChartColumn,
  LoaderCircle,
  Pencil,
  Save,
  Settings2,
  UserRoundPen,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InputBox from "@/components/Teacher/InputBox";
import { StudentDetails } from "@/dto/studentDto";
import {
  GetStudentDetailByStudentId,
  UpdateStudentDetail,
} from "@/api/student/route";
import { getCurrentThaiTermYear, toUpdatePayload } from "@/lib/utils";
import { PDFStudentTransScriptButton } from "@/components/PDF/PDFButton";
import { toast } from "react-toastify";

type Props = {
  studentID: string;
};

const emptyStudent: StudentDetails = {
  userName: "",
  id: 0,
  prefix: "",
  name: "",
  lastName: "",
  gender: "",
  studentCode: "",
  studentGroupId: 0,
  groupName: "",
  groupCode: "",
  class: "",
  level: 0,
  programName: "",
  subProgramName: "",
  facultyName: "",
  gpax: null,
  status: "",
  programId: 0,
  isActive: true,
  userId: "",
  citizenId: null,
  nationality: null,
  religion: null,
  phoneNumber: null,
  email: null,
  birthDate: null,
  currentAddress: null,
  fatherFirstName: null,
  fatherLastName: null,
  motherFirstName: null,
  motherLastName: null,
};

export default function Form({ studentID }: Props) {
  const { currentYear, defaultTerm } = getCurrentThaiTermYear();
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [students, setStudent] = useState<StudentDetails | null>();
  const [educateStatus, setEducateStatus] = useState(students?.status || "");
  const [term, setTerm] = useState<string>(defaultTerm);
  const [year, setYear] = useState<number>(currentYear);
  const [submitStudentStatus, setSubmitStudentStatus] =
    useState<boolean>(false);
  const [changeGroupPopUp, setChangeGroupPopUp] = useState<boolean>(false);

  useEffect(() => {
    GetStudentDetailByStudentId(Number(studentID)).then((item) => {
      if (item) {
        setStudent(item);
      }
    });
  }, []);

  const [formData, setFormData] = useState<StudentDetails>(emptyStudent);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    GetStudentDetailByStudentId(Number(studentID)).then((item) => {
      if (item) {
        const normalized: StudentDetails = {
          ...emptyStudent,
          ...item,
          gpax: item.gpax ?? 0,
          isActive: item.isActive ?? true,
        };
        setStudent(normalized);
        setFormData(normalized);
        setEducateStatus(normalized.status || "");
      }
    });
  }, [studentID]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSaveUpdate = async () => {
    if (!formData) return;
    try {
      setSaving(true);
      if (!formData.name || !formData.lastName) {
        toast.error("กรุณากรอกชื่อและนามสกุล");
        return;
      }

      const payload = toUpdatePayload(formData);
      const ok = await UpdateStudentDetail(payload);

      if (ok) {
        toast.success("บันทึกข้อมูลนักเรียนสำเร็จ");
        setOnEdit(false);
      } else {
        toast.error("บันทึกไม่สำเร็จ โปรดลองอีกครั้ง");
      }
    } catch (err) {
      console.error(err);
      toast.error("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="px-5 ">
      <div className="flex justify-between py-5">
        <div className="rounded-3xl bg-white  flex gap-2 items-center  border border-gray-100 shadow-md  py-2 text-blue-700 text-xl w-fit px-5  font-prompt_Light">
          <UserRoundPen className="w-8 h-8" />
          รายละเอียดนักเรียน
        </div>
        <div className="flex gap-1">
          <PDFStudentTransScriptButton studentID={Number(studentID)} />
        </div>
      </div>

      <div className="bg-white  px-5 py-4 rounded-lg">
        <div className="w-full flex justify-between  py-2 items-center ">
          <div className="flex gap-5 items-center justify-start">
            <div className="gap-8 flex justify-start items-center  w-fit">
              <div className="w-fit items-center flex gap-2">
                <div className="w-[100px]">สถานะนักเรียน</div>
                <select
                  className="border border-gray-300 rounded-sm px-4 py-1"
                  onChange={(e) => setEducateStatus(e.target.value)}
                  value={educateStatus}
                >
                  <option value={educateStatus}>{educateStatus}</option>
                  {educationOptions
                    .filter((option) => option !== educateStatus)
                    .map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
                <button
                  className="px-5 ml-1 text-white enabled:bg-blue-500 enabled:hover:bg-blue-600  bg-gray-300 rounded-md py-1 flex gap-2 items-center"
                  disabled={!educateStatus}
                  onClick={() => {
                    setSubmitStudentStatus(!submitStudentStatus);
                  }}
                >
                  <Settings2 className="h-5 w-5" />
                  ปรับสถานะ
                </button>
              </div>
            </div>
            <button
              className="w-fit flex gap-2 items-center py-1 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 "
              onClick={() => setChangeGroupPopUp(!changeGroupPopUp)}
            >
              <ArrowRightLeft className="h-5 w-5" />
              ย้ายห้องเรียน
            </button>
            <Link
              href={`/academic/score-management/individual/${students?.studentCode}`}
              className="flex gap-2 items-center px-5 py-1 rounded-full bg-slate-200 hover:bg-slate-300"
            >
              <FileChartColumn className="h-5 w-5" />
              ดูคะแนน
            </Link>
          </div>
          <div className="flex items-center ">
            {onEdit ? (
              <div className="flex gap-2">
                <button
                  className="w-[120px] h-fit bg-green-500 rounded-md items-center hover:opacity-75 pl-2 gap-2 flex justify-center py-1 text-white "
                  onClick={onSaveUpdate}
                >
                  {saving ? (
                    <LoaderCircle className="w-5 h-5 animate-spin duration-1000" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  บันทึก
                </button>
                <button
                  className="w-[120px] h-fit bg-red-500 rounded-md hover:opacity-75 pl-2 gap-2 flex justify-center items-center py-1 text-white "
                  onClick={() => setOnEdit(!onEdit)}
                >
                  <CircleX className="w-5 h-5" />
                  ยกเลิก
                </button>
              </div>
            ) : (
              <button
                className="w-[120px] h-fit bg-blue-400 hover:bg-blue-600 rounded-md items-centerhover:opacity-75 pl-2 gap-2 flex justify-center py-1 items-center text-white "
                onClick={() => setOnEdit(!onEdit)}
              >
                <Pencil className="w-5 h-5" />
                แก้ไข
              </button>
            )}
          </div>
        </div>
        <div className="pt-4 w-full flex gap-5">
          <div className="relative rounded-md border-t shadow-gray-300 w-fit shadow-md  bg-white ">
            <div className="grid gap-4 px-10 py-5">
              <div className="flex items-center gap-4">
                <InputBox
                  label="รหัสนักเรียน"
                  name="studentCode"
                  value={formData.studentCode || "ไม่มีข้อมูล"}
                  onChange={handleChange}
                  placeholder="รหัสนักเรียน"
                  inputWidth="w-[150px]"
                  inputSize="text-base"
                  labelSize="text-base"
                  disable={!onEdit}
                />
                <div className="flex gap-3 items-center justify-center px-3">
                  <p>คำนำหน้า</p>
                  {onEdit ? (
                    <select
                      name="prefix"
                      className="border border-gray-300 rounded-md px-2 py-1.5"
                      onChange={handleChange}
                      value={formData.prefix || "-"}
                    >
                      <option value="นาย">นาย</option>
                      <option value="นางสาว">นางสาว</option>
                      <option value="นาง">นาง</option>
                    </select>
                  ) : (
                    <div>
                      <label className="py-1.5 px-4 bg-gray-50 rounded-md border-gray-200 border">
                        {students?.prefix}
                      </label>
                    </div>
                  )}
                </div>

                <InputBox
                  label="ชื่อ"
                  name="name"
                  value={formData.name || "ไม่มีข้อมูล"}
                  onChange={handleChange}
                  placeholder="ชื่อจริง"
                  inputWidth="w-[200px]"
                  inputSize="text-base"
                  labelSize="text-base"
                  disable={!onEdit}
                />
                <InputBox
                  label="นามสกุล"
                  name="lastName"
                  value={formData.lastName || "ไม่มีข้อมูล"}
                  onChange={handleChange}
                  placeholder="นามสกุล"
                  inputWidth="w-[200px]"
                  inputSize="text-base"
                  labelSize="text-base"
                  disable={!onEdit}
                />
              </div>
              <div className="flex items-center gap-4">
                {" "}
                <div className="flex items-center gap-2">
                  <p className="">ชั้นปี</p>
                  <div className="px-4 border-gray-300 border bg-white py-1.5 rounded-sm">
                    {students?.class || "--"}.{students?.groupName || "--"}
                  </div>
                </div>
                <InputBox
                  label="หลักสูตร"
                  name="facultyName"
                  value={students?.facultyName || "ไม่มีข้อมูล"}
                  onChange={handleChange}
                  placeholder="หลักสูตร"
                  inputWidth="w-[250px]"
                  inputSize="text-base"
                  labelSize="text-base"
                  disable={true}
                />
                <InputBox
                  label="สาขา"
                  name="programName"
                  value={students?.programName || "ไม่มีข้อมูล"}
                  onChange={handleChange}
                  placeholder="สาขา"
                  inputWidth="w-[250px]"
                  inputSize="text-base"
                  labelSize="text-base"
                  disable={true}
                />
              </div>
            </div>
          </div>
          <div className="border rounded-md relative overflow-hidden hover:scale-[102%] duration-500">
            <img
              alt="obac-student"
              src="/asset/student-image.jpg"
              className="w-36 h-36"
            />
          </div>
        </div>

        <div className="pt-8 w-full">
          <div className="rounded-3xl bg-white flex gap-2 items-center  border border-gray-100 shadow-md  py-2 text-blue-700 text-xl w-fit px-5 font-prompt_Light ">
            <Dock className="w-8 h-8" />
            ประวัติส่วนตัวนักเรียน
          </div>
        </div>
        <div className="py-5 ">
          <div className="grid gap-8 shadow-lg w-full rounded-md border px-8 py-6">
            <div className="flex gap-5 items-center">
              <InputBox
                label="เลขบัตรประชาชน"
                name="citizenId"
                value={formData.citizenId || "ไม่มีข้อมูล"}
                onChange={handleChange}
                placeholder="เลขบัตรประชาชน"
                inputWidth="w-[200px]"
                inputSize="text-base"
                labelSize="text-base"
                disable={!onEdit}
              />
              <InputBox
                label="สัญชาติ"
                name="nationality"
                value={formData.nationality || "ไม่มีข้อมูล"}
                onChange={handleChange}
                placeholder="เชื้อชาติ"
                inputWidth="w-[120px]"
                inputSize="text-base"
                labelSize="text-base"
                disable={!onEdit}
              />
              <InputBox
                label="ศาสนา"
                name="religion"
                value={formData.religion || "ไม่มีข้อมูล"}
                onChange={handleChange}
                placeholder="ศาสนา"
                inputWidth="w-[150px]"
                inputSize="text-base"
                labelSize="text-base"
                disable={!onEdit}
              />
              <div className="flex items-center justify-center px-3 gap-3">
                <p className="text-gray-700">เพศ </p>
                {onEdit ? (
                  <select
                    name="gender"
                    className="border border-gray-300 rounded-md px-2 py-1.5"
                    onChange={handleChange}
                    value={formData.gender ?? ""}
                    disabled={!onEdit}
                  >
                    <option value="" disabled>
                      เลือกเพศ
                    </option>
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                  </select>
                ) : (
                  <div className="flex items-center justify-center gap-4">
                    <label className="px-4 py-1.5 border-gray-200 border rounded-md bg-gray-50 ">
                      {students?.gender}
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <InputBox
                label="เบอร์ติดต่อ"
                name="phoneNumber"
                value={formData.phoneNumber || "ไม่มีข้อมูล"}
                onChange={handleChange}
                placeholder="เบอร์ติดต่อ"
                inputWidth="w-[150px]"
                inputSize="text-base"
                labelSize="text-base"
                disable={!onEdit}
              />
              <InputBox
                label="อีเมลล์"
                name="email"
                value={formData.email || "ไม่มีข้อมูล"}
                onChange={handleChange}
                placeholder="อีเมลล์"
                inputWidth="w-[150px]"
                inputSize="text-base"
                labelSize="text-base"
                disable={!onEdit}
              />
              <div className="flex gap-4 items-center">
                <label className="text-base">วันเกิด</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate ?? ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-2 py-1.5 w-[180px]"
                  disabled={!onEdit}
                />
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <InputBox
                label="ที่อยู่ปัจจุบัน"
                name="currentAddress"
                value={formData.currentAddress || "ไม่มีข้อมูล"}
                onChange={handleChange}
                placeholder="ที่อยู่ปัจจุบัน"
                inputWidth="w-[150px]"
                inputSize="text-base"
                labelSize="text-base"
                disable={!onEdit}
              />
            </div>
            <div className="flex gap-5 items-center">
              <p className="text-base border border-gray-300 px-3 py-0.5 rounded-md ">
                มารดา
              </p>
              <InputBox
                label="ชื่อจริง"
                name="motherFirstName"
                value={formData.motherFirstName || "ไม่มีข้อมูล"}
                onChange={handleChange}
                placeholder="ที่อยู่ปัจจุบัน"
                inputWidth="w-[180px]"
                inputSize="text-base"
                labelSize="text-base"
                disable={!onEdit}
              />
              <InputBox
                label="นามสกุล"
                name="motherLastName"
                value={formData.motherLastName || "ไม่มีข้อมูล"}
                onChange={handleChange}
                placeholder="ที่อยู่ปัจจุบัน"
                inputWidth="w-[180px]"
                inputSize="text-base"
                labelSize="text-base"
                disable={!onEdit}
              />
            </div>
            <div className="flex gap-5 items-center">
              <p className="text-base border border-gray-300 px-3 py-0.5 rounded-md ">
                บิดา
              </p>
              <InputBox
                label="ชื่อจริง"
                name="fatherFirstName"
                value={formData.fatherFirstName || "ไม่มีข้อมูล"}
                onChange={handleChange}
                placeholder="ที่อยู่ปัจจุบัน"
                inputWidth="w-[200px]"
                inputSize="text-base"
                labelSize="text-base"
                disable={!onEdit}
              />
              <InputBox
                label="นามสกุล"
                name="fatherLastName"
                value={formData.fatherLastName || "ไม่มีข้อมูล"}
                onChange={handleChange}
                placeholder="ที่อยู่ปัจจุบัน"
                inputWidth="w-[200px]"
                inputSize="text-base"
                labelSize="text-base"
                disable={!onEdit}
              />
            </div>
          </div>
        </div>
      </div>

      {submitStudentStatus && students?.id && (
        <ConfirmChangeStudentsStatus
          onClickPopUp={(value) => setSubmitStudentStatus(value)}
          status={educateStatus}
          studentId={students.id}
        />
      )}
      {changeGroupPopUp && students?.id && (
        <ChangeStudentGroup
          onClickPopUp={(value) => setChangeGroupPopUp(value)}
          studentId={students?.id}
        />
      )}
    </div>
  );
}
