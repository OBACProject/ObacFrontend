import { Badge } from "@/components/ui/badge";
import React from "react";
import { Grading } from "./grading";

export default function page() {
  return (
    <header className="mx-4 sm:mx-10 lg:mx-44 p-4 mt-10 ">
      <div>
        <Badge className="text-sm sm:text-base" variant="outline">
          ออกเกรดรายวิชา
        </Badge>

        <Grading />
      </div>
    </header>
  );
}
