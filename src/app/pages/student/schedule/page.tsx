import { CardSchedule } from "@/app/components/card/card-schedule";
import { Badge } from "@/components/ui/badge";
import { StudentCardSubjectData } from "@/resource/students/studentCardSubjectData";

export default function Page() {
  const unitCredit = StudentCardSubjectData.reduce(
    (acc, curr) => acc + curr.subject_credit,
    0
  );
  return (
    <div className="mx-4 sm:mx-10 lg:mx-44 p-4 mt-10 flex-col">
      <div className="items-center text-center p-4 text-lg sm:text-xl flex flex-col sm:flex-row justify-between">
        <Badge className="text-sm sm:text-base" variant="outline">
          ตารางเรียน
        </Badge>
        <Badge
          className="text-sm sm:text-base flex gap-2 mt-2 sm:mt-0"
          variant="outline"
        >
          หน่วยกิต
          <span className="text-gray-600">{unitCredit}</span>
          หน่วย
        </Badge>
      </div>
      <div className="flex flex-col gap-6 p-4">
        {StudentCardSubjectData.map((cardData, index) => (
          <CardSchedule key={index} {...cardData} />
        ))}
      </div>
      {/* count number of subject in StudentCardSubjectData */}
      <div className="flex items-end justify-end mt-6 text-sm sm:text-base w-full">
        <Badge>จำนวนวิชา {StudentCardSubjectData.length}</Badge>
      </div>
    </div>
  );
}
