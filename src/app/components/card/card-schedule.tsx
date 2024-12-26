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
    <div className="lg:flex shadow-md rounded-lg overflow-hidden lg:h-[90px]">
      {/* Time Block */}
      <div
        className={`grid place-items-center ${dayColorClass} bg-opacity-80 text-white   lg:h-auto lg:w-[250px] h-fit `}
      >
        <div className="flex items-center justify-between w-full px-5 lg:px-0  md:text-center lg:grid lg:justify-center    sm:text-center  text-sm sm:text-base py-1">
          <div className="text-xl w-full  text-center font-semibold">{cardData.day}</div>
          <div className="w-full text-center">{cardData.subject_room}</div>
        </div>
      </div>

      <div className="grid grid-rows-2 lg:grid-rows-1 lg:items-center lg:grid-cols-[45%_55%]  w-full text-sm gap-2 px-4 py-4 lg:py-10 ">
        <div className="flex gap-2 lg:pl-10  lg:h-full line-clamp-1 h-fit lg:p-4">
          <div className="flex items-center  justify-start lg:justify-center  font-bold">
            {cardData.subject_code}
          </div>
          <p className="flex text-gray-700 font-bold text-start text-sm md:text-xl md:text-left items-center">
            {cardData.subject_name}
          </p>
        </div>
        <div className="flex justify-between line-clamp-1 h-fit">
          <div className="flex gap-1 lg:text-lg lg:gap-3 md:gap-2">
            <p className="font-semibold ">อาจารย์ผู้สอน:</p>
            <span>{cardData.teacher_name}</span>
          </div>
          <div className="flex px-2  items-center  font-semibold">
            {cardData.subject_credit} หน่วยกิต
          </div>
        </div>
      </div>
    </div>
  );
}
