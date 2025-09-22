import { Suspense } from "react";
import dynamic from "next/dynamic";

// const ExportFile = dynamic(() => import("./content/ExportFile"), { ssr: false });
const EditableGradePage = dynamic(() => import("./content/FilterTable"), {
  ssr: false,
});
// const GradeClassroomInfoFilter = dynamic(() => import("./content/"), { ssr: false });

export default function Page({
  params,
}: {
  params: { Schedule_subject_id: string;  };
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-4 sm:mx-10 lg:mx-10 p-4">
        <Suspense fallback={<div>Loading table...</div>}>
          <EditableGradePage
            schuduleSubjectId={params.Schedule_subject_id}
          />
        </Suspense>
      </main>
    </div>
  );
}
