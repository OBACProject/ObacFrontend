"use client";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Main from "./main";

export default function OtherPage() {
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const groupId = searchParams.get("groupId");

    if (groupId) {
      return { groupId };
    }
    return null;
  }, [searchParams]);

  if (!params) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return <Main groupId={Number(params.groupId)} />;
}
