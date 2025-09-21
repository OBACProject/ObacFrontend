"use client";
import React, { useEffect, useMemo, useState } from "react";
import { GetStudentTranscript } from "@/api/student-account/route";
import { StudentTranscript } from "@/dto/student-account-dto";
import { Card, Field } from "@/components/common/Card/card-student-profile";

export default function Form() {
  const [data, setData] = useState<StudentTranscript | null>(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    GetStudentTranscript().then((d) => {
      if (d) {
        setData(d);
      }
      setLoading(false);
    });
  }, []);

  const num = (v: unknown): number | null => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  const getQuality = (
    s: StudentTranscript["subjectGradesTermYear"][number]["subjectGrades"][number]
  ): number | null => {
    const c = num(s.credit) ?? 0;
    if (c <= 0) return null;

    const q = num(s.gradePoint);
    if (q !== null) return q;

    const g = num(s.finalGrade);
    if (g !== null) return c * g;

    return null;
  };

  const countable = (
    s: StudentTranscript["subjectGradesTermYear"][number]["subjectGrades"][number]
  ) => getQuality(s) !== null;

  const calcTerm = (
    grades: StudentTranscript["subjectGradesTermYear"][number]["subjectGrades"]
  ) => {
    let credits = 0;
    let quality = 0;
    let subjects = 0;

    for (const g of grades ?? []) {
      const q = getQuality(g);
      if (q === null) continue;
      const c = num(g.credit)!;

      credits += c;
      quality += q;
      subjects += 1;
    }

    const gpa = credits > 0 ? quality / credits : null;
    return { credits, quality, subjects, gpa };
  };

  const overall = useMemo(() => {
    if (!data?.subjectGradesTermYear?.length)
      return {
        credits: 0,
        quality: 0,
        subjects: 0,
        gpa: null as number | null,
      };

    let credits = 0;
    let quality = 0;
    let subjects = 0;

    for (const ty of data.subjectGradesTermYear) {
      for (const s of ty.subjectGrades ?? []) {
        const q = getQuality(s);
        if (q === null) continue;
        const c = num(s.credit)!;

        credits += c;
        quality += q;
        subjects += 1;
      }
    }

    return {
      credits,
      quality,
      subjects,
      gpa: credits > 0 ? quality / credits : null,
    };
  }, [data]);

  const fmt = (v: number | null | undefined, digits = 2) =>
    typeof v === "number" ? v.toFixed(digits) : "-";
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid gap-6">
        <Card title="กำลังโหลดข้อมูลนักเรียน">
          <div className="animate-pulse grid gap-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid gap-6">
        <Card title="ไม่พบข้อมูล">
          <p className="text-sm text-gray-600">
            ไม่สามารถดึงข้อมูลผลการเรียนได้
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-1 lg:px-4  lg:py-6 grid gap-6">
      <Card title="ข้อมูลนักเรียน">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="รหัสนักศึกษา" value={data.studentCode} />
          <Field
            label="ชื่อ-สกุล"
            value={
              [data.prefix, data.firstName, data.lastName]
                .filter(Boolean)
                .join(" ") || undefined
            }
          />
          <Field label="หลักสูตร" value={data.facultyName} />
          <Field label="สาขา" value={data.programName} />
          <Field label="สาขาย่อย" value={data.subProgramName} />
          <Field label="ระดับชั้น" value={data.class + "." + data.groupName} />
          <Field label="กลุ่ม" value={data.section} />
        </div>
      </Card>
      <Card title="สรุปผลรวม">
        <div className="flex lg:text-base text-sm justify-between items-center gap-1">
          <div className="flex gap-1 items-center">
            <p className="font-prompt text-blue-600 ">หน่วยกิตรวม</p>
            <p className="px-2 py-1 bg-gray-100 rounded-sm">
              {overall.credits ? `${overall.credits}` : "-"}
            </p>
          </div>
          <div className="flex lg:text-base text-sm gap-1 items-center">
            <p className="font-prompt text-blue-600 ">จำนวนวิชา</p>
            <p className="px-2 py-1 bg-gray-100 rounded-sm">
              {overall.subjects ? `${overall.subjects}` : "-"}
            </p>
          </div>
          <div className="flex lg:text-base text-sm gap-2 items-center">
            <p className="font-prompt text-blue-600  ">GPAX </p>
            <p className="px-2 py-1 font-prompt rounded-sm bg-gray-100 text-green-600">
              {data.gpax ?? "-"}
            </p>
          </div>
        </div>
      </Card>
      {data.subjectGradesTermYear?.map((ty, idx) => {
        const stat = calcTerm(ty.subjectGrades || []);
        return (
          <Card
            key={`${ty.term}-${ty.year}-${idx}`}
            title={`ผลการเรียน - เทอม ${ty.term}  ปี ${ty.year}`}
          >
            <div className="my-1 flex lg:text-base text-sm items-center justify-between  gap-1">
              <div className="flex gap-1 items-center">
                <p className="font-prompt_Light ">หน่วยกิต</p>
                <p className="px-2 py-1 bg-gray-100 rounded-sm">
                  {stat.credits ? `${stat.credits}` : "-"}
                </p>
              </div>

              <div className="flex gap-1 lg:text-base text-sm items-center">
                <p className="font-prompt_Light ">จำนวนวิชา</p>
                <p className="px-2 py-1 bg-gray-100 rounded-sm">
                  {stat.subjects ? `${stat.subjects}` : "-"}
                </p>
              </div>

              <div className="flex gap-2 lg:text-base text-sm items-center">
                <p className="font-prompt ">GPA</p>
                <p className="px-2 py-1 rounded-sm font-prompt bg-gray-100 text-green-600">
                  {stat.gpa !== null ? fmt(stat.gpa, 2) : "-"}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="lg:w-full  min-w-[800px] lg:text-sm text-xs border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr className="text-left">
                    <th className="px-3 py-2 border-b">รหัสวิชา</th>
                    <th className="px-3 py-2 border-b">รายวิชา</th>
                    <th className="px-3 py-2 border-b">หน่วยกิต</th>
                    <th className="px-3 py-2 border-b">เกรด</th>
                    <th className="px-3 py-2 border-b">ผลคูณ</th>
                    {/* <th className="px-3 py-2 border-b hidden sm:table-cell">
                      คะแนนรวม
                    </th> */}
                    <th className="px-3 py-2 border-b table-cell">
                      หมายเหตุ
                    </th>
                    <th className="px-3 py-2 border-b table-cell">
                      เลขที่ใบเสร็จ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ty.subjectGrades?.map((s) => (
                    <tr
                      key={`${ty.term}-${ty.year}-${s.gradeId}`}
                      className="odd:bg-white even:bg-gray-50"
                    >
                      <td className="px-3 py-2 border-b">{s.subjectCode}</td>
                      <td className="px-3 py-2 border-b">{s.subjectName}</td>
                      <td className="px-3 py-2 border-b">{s.credit}</td>
                      <td className="px-3 py-2 border-b">
                        {fmt(s.finalGrade, 1)}
                      </td>
                      <td className="px-3 py-2 border-b">
                        {fmt(s.gradePoint, 1)}
                      </td>
                      {/* <td className="px-3 py-2 border-b hidden sm:table-cell">
                        {fmt(s.totalScore, 2)}
                      </td> */}
                      <td className="px-3 py-2 font-prompt text-blue-600 text-center border-b table-cell">
                        {s.remark || "-"}
                      </td>
                      <td className="px-3 py-2 border-b  text-center  table-cell">
                        {s.receiptNo || "-"}
                      </td>
                    </tr>
                  ))}
                  {!ty.subjectGrades?.length && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-3 py-4 text-center text-gray-500"
                      >
                        ไม่มีข้อมูลรายวิชาในเทอมนี้
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        );
      })}
      <div className="p-4 rounded-lg bg-white shadow-sm">
        <div className="mt-3 text-xs text-gray-600 ">
          <p className="mb-1">*** คะแนนรวมจากคะแนนทั้ง 5 ช่อง ***</p>
          <ul className="list-disc ml-5 grid  gap-x-6 gap-y-1">
            <li>คะแนนเก็บ </li>
            <li>คะแนนภาระงาน </li>
            <li>คะแนนจิตพิสัย </li>
            <li>คะแนนกลางภาค</li>
            <li>คะแนนปลายภาค </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
