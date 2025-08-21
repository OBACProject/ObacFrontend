"use client";

import { GetGenderInfoCount, GetStudentClassCount } from "@/api/user/userAPI";
import BarChart from "@/components/Academic/BarChart";
import DonutChart from "@/components/Academic/DonutChart";
import ProfileCard from "@/components/Academic/ProfileCard";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { ClassCount, GetGenderCount } from "@/dto/userDto";
import { ChartPie } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

type GenderTH = "หญิง" | "ชาย";

export default function AcademicDashboard() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [userGender, setUserGender] = useState<GetGenderCount[]>([]);
  const [classCount, setClassCount] = useState<ClassCount[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const item = await GetGenderInfoCount("Student");
        if (!alive) return;
        if (item) setUserGender(item);
      } catch (e) {
        console.error(e);
        if (alive) setError("โหลดข้อมูลไม่สำเร็จ");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const item = await GetStudentClassCount();
        if (!alive) return;
        if (item) setClassCount(item);
      } catch (e) {
        console.error(e);
        if (alive) setError("โหลดข้อมูลไม่สำเร็จ");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const { labels, values, colors } = useMemo(() => {
    const order: GenderTH[] = ["หญิง", "ชาย"];
    const countMap: Record<GenderTH, number> = { หญิง: 0, ชาย: 0 };

    for (const row of userGender ?? []) {
      const g = (row.gender as GenderTH) ?? "";
      if (g === "หญิง" || g === "ชาย") countMap[g] = Number(row.count) || 0;
    }

    return {
      labels: order,
      values: order.map((g) => countMap[g]),
      colors: ["#FF8DC7", "#8AB6F9"],
    };
  }, [userGender]);

  const { vocLabels, vocValues, vocColors } = useMemo(() => {
    const mapTop = new Map(
      (classCount ?? []).map((r) => [
        r.class?.trim() ?? null,
        Number(r.count) || 0,
      ])
    );

    const topVC = mapTop.get("ปวช");
    const topVS = mapTop.get("ปวส");

    const sumByPrefix = (prefix: string) =>
      (classCount ?? []).reduce((sum, r) => {
        const name = r.class?.trim();
        if (!name || name === prefix) return sum;
        return name.startsWith(prefix) ? sum + (Number(r.count) || 0) : sum;
      }, 0);

    const vc = topVC ?? sumByPrefix("ปวช");
    const vs = topVS ?? sumByPrefix("ปวส");

    return {
      vocLabels: ["ปวช", "ปวส"],
      vocValues: [vc, vs],
      vocColors: ["#7EA1FF", "#B388EB"],
    };
  }, [classCount]);

  return (
    <div
      className="lg:px-10 py-5 px-5 bg-blue-100"
      style={{
        backgroundImage: `
      /* เส้นตั้ง */
      repeating-linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0px,
        rgba(255, 255, 255, 1) 1px,
        transparent 1px,
        transparent 20px
      ),
      /* เส้นนอน */
      repeating-linear-gradient(
        to bottom,
        rgba(255, 255, 255, 1) 0px,
        rgba(255, 255, 255, 1) 1px,
        transparent 1px,
        transparent 20px
      )
    `,
        backgroundSize: "20px 20px",
      }}
    >
      <div className="w-full px-5">
        <HeaderLabel
          title="ภาพรวมโรงเรียน"
          Icon={<ChartPie className="h-7 w-7 text-white" />}
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-6 px-4 py-6">
        {/* Chart Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 grid place-items-center bg-white/60 rounded-md text-blue-600">
                กำลังโหลด...
              </div>
            )}
            <DonutChart
              title="จำนวนนักเรียน ชาย-หญิง"
              value={values}
              label={labels}
              backgroundColor={["#FF8DC7", "#8AB6F9"]}
            />
          </div>

          <DonutChart
            title="สัดส่วน ปวช-ปวส"
            value={vocValues}
            label={vocLabels}
            backgroundColor={["#FF8DC7", "#8AB6F9"]}
          />
        </div>

        <ProfileCard username="---- -----" rolename="ฝ่ายทะเบียน" />
      </div>

      <div className="my-5 mx-5 px-5 bg-white shadow-xl grid place-items-center rounded-lg">
        <h1 className="text-xl font-prompt text-blue-600">
          แผนภูมิแสดงจำนวนนักเรียน ชาย-หญิง ปวช - ปวส
        </h1>
        <BarChart labels={[]} maleData={[]} femaleData={[]} />
      </div>

      {error && (
        <div className="mx-5 my-3 px-4 py-2 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
