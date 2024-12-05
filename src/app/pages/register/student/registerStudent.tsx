import { Badge } from "@/components/ui/badge";

export function RegisterStudent() {
  return (
    <div className="mx-4 sm:mx-10 lg:mx-44 p-4 mt-10 flex-col">
      <div className="items-center text-center p-4 text-lg sm:text-xl flex flex-col sm:flex-row justify-between">
        <Badge className="text-sm sm:text-lg" variant="outline">
          ลงทะเบียนนักเรียน
        </Badge>
      </div>
      {/* inform */}
      <div className="flex flex-col gap-6 p-4">
        {/* <LabelInput label="title" type="text" htmlFor="title" /> */}
      </div>
    </div>
  );
}
