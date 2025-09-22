"use client";
import React, { useEffect, useState } from "react";
import { GetStudentDetail } from "@/api/student-account/route";
import { GetStudentDetailResponse } from "@/dto/student-account-dto";
import { Card, Field } from "@/components/common/Card/card-student-profile";

function getAge(dateStr: string | undefined): number | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age;
}

export default function Form() {
  const [studentinfo, setStudentInfo] =
    useState<GetStudentDetailResponse | null>(null);

  useEffect(() => {
    (async () => {
      const d = await GetStudentDetail();
      if (d) setStudentInfo(d);
    })();
  }, []);

  const age = studentinfo?.birthDate ? getAge(studentinfo.birthDate) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid gap-6">
      <Card title="ข้อมูลส่วนบุคคล">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field
            label="ชื่อ (ไทย)"
            value={
              [studentinfo?.prefix, studentinfo?.name, studentinfo?.lastName]
                .filter(Boolean)
                .join(" ") || undefined
            }
          />
          <Field label="รหัสนักเรียน" value={studentinfo?.userName} />

          <Field
            label="วันเดือนปีเกิด"
            value={studentinfo?.birthDate ?? "ไม่ทราบ"}
          />
          <Field label="อายุ" value={age !== null ? `${age} ปี` : undefined} />
          <Field label="ศาสนา" value={studentinfo?.religion ?? "ไม่ทราบ"} />
          <Field
            label="สัญชาติ"
            value={studentinfo?.nationality ?? "ไม่ทราบ"}
          />
        </div>
      </Card>

      <Card title="ที่อยู่ปัจจุบัน">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field
            label="ที่อยู่ (เต็ม)"
            value={studentinfo?.currentAddress ?? "ไม่ทราบ"}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="ข้อมูลบิดา">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="ชื่อ-สกุล"
              value={
                [
                  studentinfo?.fatherFirstName,
                  studentinfo?.fatherLastName ?? "ไม่ทราบ",
                ]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
            />
            <Field label="เบอร์โทร" value={undefined} />
            <Field label="อาชีพ" value={undefined} />
            <Field label="ที่อยู่" value={undefined} />
          </div>
        </Card>

        <Card title="ข้อมูลมารดา">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="ชื่อ-สกุล"
              value={
                [
                  studentinfo?.motherFirstName,
                  studentinfo?.motherLastName ?? "ไม่ทราบ",
                ]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
            />
            <Field label="เบอร์โทร" value={undefined} />
            <Field label="อาชีพ" value={undefined} />
            <Field label="ที่อยู่" value={undefined} />
          </div>
        </Card>
      </div>
    </div>
  );
}
