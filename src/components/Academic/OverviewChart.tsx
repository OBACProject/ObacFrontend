"use client";

import React, { useEffect, useMemo, useState } from "react";
import BarChart from "./BarChart";
import { GetStudentClassLevelGenderCountDtos } from "@/api/student/route";
import { ClassGenderStat } from "@/dto/studentDto";

const PROGRAM_ORDER = ["ปวช", "ปวส"];

type Parsed = { program: string; year: number | null; room: number | null };

function parseClassCode(cls: string | null): Parsed {
  const s = (cls ?? "").trim();

  const m1 = s.match(/^(\S+)\.(\d+)\/(\d+)$/);
  if (m1) return { program: m1[1], year: Number(m1[2]), room: Number(m1[3]) };

  const m2 = s.match(/^(\S+)\.(\d+)$/);
  if (m2) return { program: m2[1], year: Number(m2[2]), room: null };

  if (s) return { program: s, year: null, room: null };
  return { program: "(ไม่ระบุ)", year: null, room: null };
}

function makeLabel(program: string, year: number | null, room: number | null) {
  let out = program || "(ไม่ระบุ)";
  if (year != null) out += `.${year}`;
  if (room != null) out += `/${room}`;
  return out;
}

const programRank = (p: string) => {
  const i = PROGRAM_ORDER.indexOf(p);
  return i === -1 ? Number.POSITIVE_INFINITY : i;
};

const collator = new Intl.Collator("th", {
  sensitivity: "base",
  numeric: true,
});

export default function OverviewChart() {
  const [overviewData, setOverviewData] = useState<ClassGenderStat[]>([]);

  useEffect(() => {
    GetStudentClassLevelGenderCountDtos().then((d: ClassGenderStat[]) => {
      if (d) setOverviewData(d);
    });
  }, []);

  const { labels, maleData, femaleData } = useMemo(() => {
    type Agg = {
      program: string;
      year: number | null;
      room: number | null;
      male: number;
      female: number;
    };

    const map = new Map<string, Agg>();

    for (const row of overviewData) {
      const { program, year, room } = parseClassCode(
        (row as any).class ?? null
      );
      const gender = row.genderCount?.gender ?? null;
      const count = row.genderCount?.count ?? 0;

      if (gender !== "ชาย" && gender !== "หญิง") continue;

      const key = `${program}|${year ?? -1}|${room ?? -1}`;

      if (!map.has(key)) {
        map.set(key, { program, year, room, male: 0, female: 0 });
      }
      const agg = map.get(key)!;
      if (gender === "ชาย") agg.male += count;
      else agg.female += count;
    }

    const items = Array.from(map.values());

    items.sort((a, b) => {
      const pa = programRank(a.program);
      const pb = programRank(b.program);
      if (pa !== pb) return pa - pb;

      const ya = a.year ?? Number.POSITIVE_INFINITY;
      const yb = b.year ?? Number.POSITIVE_INFINITY;
      if (ya !== yb) return ya - yb;

      const ra = a.room ?? Number.POSITIVE_INFINITY;
      const rb = b.room ?? Number.POSITIVE_INFINITY;
      if (ra !== rb) return ra - rb;

      const la = makeLabel(a.program, a.year, a.room);
      const lb = makeLabel(b.program, b.year, b.room);
      return collator.compare(la, lb);
    });

    return {
      labels: items.map((i) => makeLabel(i.program, i.year, i.room)),
      maleData: items.map((i) => i.male),
      femaleData: items.map((i) => i.female),
    };
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
