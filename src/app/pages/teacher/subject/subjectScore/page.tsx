import { Suspense } from "react";
import OtherPage from "./subjectScore";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherPage />
    </Suspense>
  );
}
