import { Badge } from "@/components/ui/badge";
import React from "react";
import { Main } from "./main";

export default function page() {
  return (
    <header className="mx-4 sm:mx-10 lg:mx-10 p-4 mt-10 ">
      <div>
        <Badge className="text-base sm:text-lg" variant="outline">
          จัดการเกรดรายห้องเรียน
        </Badge>

        <Main />
      </div>
    </header>
  );
}
