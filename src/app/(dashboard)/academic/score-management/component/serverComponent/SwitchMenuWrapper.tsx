import { Suspense } from "react";
import SwitchMenu from "./../../switchMenu";
import { SwitchMenuSkeleton } from "./../skeletons/SwitchMenuSkeleton";

export default function SwitchMenuWrapper() {
  return (
    <div className="w-full">
      <Suspense fallback={<SwitchMenuSkeleton />}>
        <SwitchMenu />
      </Suspense>
    </div>
  );
}
