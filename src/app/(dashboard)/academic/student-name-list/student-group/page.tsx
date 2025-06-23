import { Suspense } from "react";
import OtherPage from "./studentGroup";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherPage />
    </Suspense>
  );
}
