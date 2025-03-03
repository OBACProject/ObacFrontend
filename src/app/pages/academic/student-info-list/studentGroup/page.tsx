"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Main from "./main";

export default function Page() {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");

  return (
    <Suspense
      fallback={
        <div className="py-5 flex justify-center text-xl text-black w-full">
          Loading...
        </div>
      }
    >
      {/* Only render Main component after groupId is available */}
      {groupId ? (
        <Main groupId={Number(groupId)} />
      ) : (
        <div className="py-5 flex justify-center text-xl text-black w-full">
          Loading...
        </div>
      )}
    </Suspense>
  );
}
