"use client";

import React, { useEffect, useMemo, useState } from "react";
import BarChart from "./BarChart";
import { GetStudentClassLevelGenderCountDtos } from "@/api/student/route";
import { ClassGenderStat } from "@/dto/studentDto";

const CLASS_ORDER = ["ปวช", "ปวส"] as const;

export default function OverviewChart() {
  const [overviewData, setOverviewData] = useState<ClassGenderStat[]>([]);

  useEffect(() => {
    GetStudentClassLevelGenderCountDtos().then((d: ClassGenderStat[]) => {
      if (d) setOverviewData(d);
    });
  }, []);

  const { labels, maleData, femaleData } = useMemo(() => {
    type MF = { male: number; female: number };
    const key = (cls: string, lv: number) => `${cls}#${lv}`;

    const acc = new Map<string, MF>();
    for (const row of overviewData) {
      const k = key(row.class, row.level);
      const cur = acc.get(k) ?? { male: 0, female: 0 };
      if (row.genderCount.gender === "ชาย") cur.male += row.genderCount.count;
      else cur.female += row.genderCount.count;
      acc.set(k, cur);
    }

    const labels: string[] = [];
    const maleData: number[] = [];
    const femaleData: number[] = [];

    for (const cls of CLASS_ORDER) {
      const levels = Array.from(
        new Set(overviewData.filter((x) => x.class === cls).map((x) => x.level))
      ).sort((a, b) => a - b);

      for (const lv of levels) {
        const v = acc.get(key(cls, lv)) ?? { male: 0, female: 0 };
        labels.push(`${cls}.${lv}`);
        maleData.push(v.male);
        femaleData.push(v.female);
      }
    }

    return { labels, maleData, femaleData };
  }, [overviewData]);

  return (
    <div className="my-5 mx-5 px-5 bg-white shadow-xl grid place-items-center rounded-lg">
      <h1 className="text-xl font-prompt text-blue-600">
        แผนภูมิแสดงจำนวนนักเรียน ชาย-หญิง ปวช - ปวส
      </h1>
      <BarChart labels={labels} maleData={maleData} femaleData={femaleData} />
    </div>
  );
}
