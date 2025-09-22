"use client";
import OrganizationalChart, { type NodeData } from "./organizational-chart";
import raw from "./organization-data.json";
import HeaderHomePageMenu from "@/components/common/Header/Header";

export default function Page() {
  const data = raw as unknown as NodeData[];

  return (
    <div className="pt-[70px] sm:pt-[70px] md:pt-[140px]">
      <div className="bg-white text-blue-950 font-prompt">
              <HeaderHomePageMenu title="โครงสร้างการบริหารงาน" />
            </div>
      <OrganizationalChart data={data} height="78vh" />
    </div>
  );
}