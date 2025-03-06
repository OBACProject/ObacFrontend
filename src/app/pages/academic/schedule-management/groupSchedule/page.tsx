import { Suspense } from "react";
import OtherPageClient from "./groupSchedule";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-lg">Loading...</div>}>
      <OtherPageClient />
    </Suspense>
  );
}
