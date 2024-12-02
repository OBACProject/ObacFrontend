import { studentCardSubjectProps } from "@/resource/students/studentCardSubjectData";

export function CardSchedule(cardData: studentCardSubjectProps) {
  const dayColorMap: { [key: string]: string } = {
    Monday: "bg-yellow-300",
    Tuesday: "bg-pink-300",
    Wednesday: "bg-green-300",
    Thursday: "bg-blue-300",
    Friday: "bg-purple-300",
    Saturday: "bg-red-300",
    Sunday: "bg-orange-300",
  };

  // Get the color class based on the day
  const dayColorClass = dayColorMap[cardData.day] || "bg-slate-400";

  return (
    <div className="flex flex-col md:flex-row shadow-md rounded-lg overflow-hidden">
      {/* Time Block */}
      <div
        className={`flex flex-col items-center justify-center ${dayColorClass} text-white w-full md:w-2/12 h-20 md:h-auto`}
      >
        <div className="flex flex-col text-center text-sm sm:text-base p-2">
          <span>
            {cardData.start_time} - {cardData.end_time}
          </span>
          <span>{cardData.day}</span>
        </div>
      </div>

      {/* Subject Details */}
      <div className="flex flex-col md:flex-row w-full md:w-10/12 text-sm gap-4 p-4 md:p-0">
        {/* Subject ID */}
        <div className="flex items-center justify-center w-full md:w-2/12 font-bold">
          {cardData.subject_code}
        </div>
        {/* Room */}
        <div className="flex items-center justify-center w-full md:w-2/12 font-bold">
          {cardData.subject_room}
        </div>
        {/* Subject Name and Teacher */}
        <div className="flex flex-col w-full md:w-6/12 items-start justify-center">
          <p className="font-bold text-start text-sm md:text-xl md:text-left items-center">
            {cardData.subject_name}
          </p>
          <div className="flex flex-col md:flex md:flex-row gap-1 md:gap-2">
            <p className="font-semibold text-start">อาจารย์ผู้สอน:</p>
            <span>{cardData.teacher_name}</span>
          </div>
        </div>
        {/* Credit */}
        <div className="flex items-center justify-end w-full md:w-2/12 font-semibold">
          {cardData.subject_credit} หน่วยกิต
        </div>
      </div>
    </div>
  );
}
