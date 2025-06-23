"use client";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Form from "./Form";
export const dynamic = "force-dynamic";

export default function OtherPage() {
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const param1 = searchParams.get("param1");
    const param2 = searchParams.get("param2");
    const param3 = searchParams.get("param3");

    if (param1 && param2 && param3) {
      return { param1, param2, param3 };
    }
    return null;
  }, [searchParams]);

  if (!params) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="px-10">
      <div className="lg:flex justify-center pb-20">
        <Form
          term={params.param1}
          year={params.param2}
          teacherID={params.param3}
        />
      </div>
    </div>
  );
}
