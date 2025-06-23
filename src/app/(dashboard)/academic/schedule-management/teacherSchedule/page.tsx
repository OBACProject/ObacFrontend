import { Suspense } from "react";
import OtherPage from "./teacherSchedule";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherPage />
    </Suspense>
  );
}
