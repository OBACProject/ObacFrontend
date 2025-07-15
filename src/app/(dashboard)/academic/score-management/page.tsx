import { Suspense } from "react";
import SwitchMenuWrapper from "./component/serverComponent/SwitchMenuWrapper";
import { PageSkeleton } from "./component/skeletons/pageSkeleton";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-4 sm:mx-10 lg:mx-10 p-4">
        <Suspense fallback={<PageSkeleton />}>
          <SwitchMenuWrapper />
        </Suspense>
      </main>
    </div>
  );
}