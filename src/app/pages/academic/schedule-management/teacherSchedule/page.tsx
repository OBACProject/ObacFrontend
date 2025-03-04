"use client";
import { useSearchParams } from "next/navigation";
import Form from "./Form";

export default function OtherPage() {
  const searchParams = useSearchParams();
  const param1 = searchParams.get("param1");
  const param2 = searchParams.get("param2");
  const param3 = searchParams.get("param3");
  return (
    <div className="px-10  ">
      <div className="lg:flex justify-center  pb-20">
        {param1 && param2 && param3 ? (
          <Form term={param1} year={param2} teacherID={param3} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
