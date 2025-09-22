"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ScheduleSubject } from "@/dto/student-account-dto";
import { getCurrentThaiTermYear } from "@/lib/utils";

import { Card, Field } from "@/components/common/Card/card-student-profile";
import { GetStudentScheduleByStudentIdTermYear } from "@/api/student-account/route";

type ApiResp<T> = { responseCode: string; responseMessage: string; data: T };

export default function Form() {
  const { currentYear, defaultTerm } = getCurrentThaiTermYear();
  const [schedule, setSchedule] = useState<ScheduleSubject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dayOrder = [
    "อาทิตย์",
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
  ];
  const dayAlias: Record<string, string> = {
    mon: "จันทร์",
    monday: "จันทร์",
    จ: "จันทร์",
    tue: "อังคาร",
    tuesday: "อังคาร",
    อ: "อังคาร",
    wed: "พุธ",
    wednesday: "พุธ",
    thu: "พฤหัสบดี",
    thurs: "พฤหัสบดี",
    thursday: "พฤหัสบดี",
    fri: "ศุกร์",
    friday: "ศุกร์",
    sat: "เสาร์",
    saturday: "เสาร์",
    sun: "อาทิตย์",
    sunday: "อาทิตย์",
  };

  const normDay = (d?: string) => {
    if (!d) return "";
    const raw = d
      .trim()
      .replace(/^วัน\s*/i, "")
      .replace(/\./g, "");
    const key = raw.toLowerCase();
    return dayAlias[key] ?? raw; 
  };

  useEffect(() => {
    GetStudentScheduleByStudentIdTermYear(defaultTerm, currentYear).then(
      (d) => {
        if (d) {
          setSchedule(d);
        }
        setLoading(true);
      }
    );
  }, []);

  const days = useMemo(() => {
    const uniq = Array.from(
      new Set((schedule ?? []).map((s) => normDay(s.day)))
    );
    return uniq.sort((a, b) => {
      const ia = dayOrder.indexOf(a);
      const ib = dayOrder.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  }, [schedule]);

  const periods = useMemo(() => {
    const uniq = Array.from(
      new Set((schedule ?? []).map((s) => s.period))
    ).filter((n): n is number => Number.isFinite(n));
    return uniq.sort((a, b) => a - b);
  }, [schedule]);

  const cellMap = useMemo(() => {
    const m = new Map<string, ScheduleSubject>();
    for (const s of schedule ?? []) {
      const k = `${normDay(s.day)}|${s.period}`;
      if (!m.has(k)) m.set(k, s);
    }
    return m;
  }, [schedule]);

  const getCell = (day: string, period: number) =>
    cellMap.get(`${day}|${period}`);

  return (
    <div className="max-w-6xl mx-auto px-1 lg:px-4 sm:px-6 py-6 grid gap-6">
      <div className="lg:block hidden">
        <Card title={`จำนวน ${schedule.length} วิชา`}>
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="px-3 py-2 border-b w-24">คาบ</th>
                  {days.map((d) => (
                    <th key={d} className="px-3 py-2 border-b">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {periods.map((p) => (
                  <tr key={p} className="odd:bg-white even:bg-gray-50">
                    <td className="px-3 py-2 border-b font-medium">{p}</td>
                    {days.map((d) => {
                      const c = getCell(d, p);
                      return (
                        <td
                          key={`${d}-${p}`}
                          className="px-3 py-2 border-b align-top"
                        >
                          {c ? (
                            <div className="space-y-0.5">
                              <div className="font-prompt">{c.subjectName}</div>
                              <div className="text-xs text-gray-600">
                                {c.subjectCode}
                              </div>
                              <div className="text-xs text-gray-600">
                                ห้อง {c.room || "-"} · กลุ่ม{" "}
                                {c.studentGroupCode ||
                                  c.studentGroupName ||
                                  "-"}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-300 text-xs">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {!periods.length && (
                  <tr>
                    <td
                      className="px-3 py-6 text-center text-gray-500"
                      colSpan={days.length + 1}
                    >
                      ไม่พบข้อมูลตารางเรียนสำหรับเทอม {defaultTerm} ปี{" "}
                      {currentYear}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="block lg:hidden">
        <Card title={`จำนวน ${schedule.length} วิชา`}>
          <div className="grid grid-cols-1 gap-4">
            {days.map((d) => {
              const items = (schedule ?? [])
                .filter((s) => normDay(s.day) === d)
                .sort((a, b) => a.period - b.period);
              return (
                <div key={d} className="rounded-xl border py-3 px-3">
                  <div className="font-semibold px-2 py-1 bg-gray-200 w-full rounded-sm text-gray-700 mb-2">
                    {d}
                  </div>
                  {!items.length ? (
                    <div className="text-xs text-gray-500">
                      — ไม่มีคาบเรียน —
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {items.map((it) => (
                        <li
                          key={`${it.day}-${it.period}-${it.subjectId}`}
                          className="flex flex-col border-b-[1px] border-gray-300 pb-1  gap-2 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="text-sm grid ">
                            <div className="flex gap-2 ">
                              <p className="text-gray-800">คาบ {it.period}</p>{" "}
                              <div>วิชา</div>
                              <p className="font-prompt text-blue-600">
                                {it.subjectName}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center ">
                            <p>รหัส</p>
                            <p>{it.subjectCode}</p>
                            <p className="text-xs text-gray-600">
                              ห้อง {it.room || "-"}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
