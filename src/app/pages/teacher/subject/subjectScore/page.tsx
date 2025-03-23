import { Suspense } from "react";
import OtherPage from "./subjectScore";

export default function Page() {
  return (
    <Suspense fallback={<div className="w-full py-20 flex justify-center px-10">
      <div className="border-2 border-dashed border-blue-200 rounded-md grid place-items-center w-full px-10 py-10 ">
            <p className="gap-5 flex items-center text-3xl text-blue-500 animate-pulse">Loading</p>
          </div>
      </div>}>
      <OtherPage />
    </Suspense>
  );
}
