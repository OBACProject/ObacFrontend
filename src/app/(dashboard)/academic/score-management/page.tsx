import { Suspense } from "react";
import SwitchMenuWrapper from "./component/serverComponent/SwitchMenuWrapper";
import { PageSkeleton } from "./component/skeletons/pageSkeleton";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="mx-4 sm:mx-10 lg:mx-10 p-4">
          <h1 className="text-2xl font-bold text-gray-900">ระบบจัดการคะแนน</h1>
          <p className="text-gray-600 mt-1">Grade Management System</p>
        </div>
      </header>

      <main className="mx-4 sm:mx-10 lg:mx-10 p-4">
        <Suspense fallback={<PageSkeleton />}>
          <SwitchMenuWrapper />
        </Suspense>
      </main>
    </div>
  );
}