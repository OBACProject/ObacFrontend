import { studentCardSubjectProps } from "@/resource/students/studentCardSubjectData";

export function CardSchedule(cardData: studentCardSubjectProps) {
  const dayColorMap: { [key: string]: string } = {
    Monday: "bg-gradient-to-r from-yellow-200 via-orange-200 to-orange-100 ",
    Tuesday: "bg-gradient-to-r from-pink-200 via-pink-300 to-red-100 ",
    Wednesday: "bg-gradient-to-r from-green-200 via-emerald-300 to-yellow-100",
    Thursday: "bg-gradient-to-r from-orange-200 via-orange-300 to-yellow-100",
    Friday: "bg-gradient-to-r from-sky-200 via-blue-300 to-purple-200",
    Saturday: "bg-purple-200",
    Sunday: "bg-red-200",
  };

  // Get the color class based on the day
  const dayColorClass = dayColorMap[cardData.day] || "bg-slate-400";

  return (
    <div className="lg:flex shadow-md shadow-gray-200 border border-gray-200 rounded-lg overflow-hidden lg:h-[90px]">
      {/* Time Block */}
      <div
        className={`grid place-items-center ${dayColorClass} bg-opacity-80 text-gray-500  lg:h-auto lg:w-[250px] h-fit `}
      >
        <div className="flex items-center justify-between w-full px-5 lg:px-0  md:text-center lg:grid lg:justify-center    sm:text-center  text-sm sm:text-base py-1 text-gray-500">
          <div className="text-xl w-full  text-center font-semibold">
            {cardData.day}
          </div>
          <div className="w-full text-center">{cardData.subject_room}</div>
        </div>
      </div>
      <div className="grid grid-rows-2 lg:grid-rows-1 lg:items-center lg:grid-cols-[50%_50%]  w-full text-sm gap-2 px-4 py-4 lg:py-10 ">
        <div className="flex gap-2 lg:gap-4 lg:pl-10  lg:h-full line-clamp-1 h-fit lg:p-4">
          <div className="flex items-center text-gray-600 justify-start lg:justify-center font-semibold">
            {cardData.subject_code}
          </div>
          <p className="flex text-gray-600  font-semibold text-start text-sm md:text-xl md:text-left items-center">
            {cardData.subject_name}
          </p>
        </div>
        <div className="flex justify-between line-clamp-1 h-fit">
          <div className="flex gap-1 lg:text-lg text-gray-600  lg:gap-3 md:gap-2">
            <p className="font-semibold ">อาจารย์ผู้สอน:</p>
            <span>{cardData.teacher_name}</span>
          </div>
          <div className="flex px-2 text-gray-600   items-center  font-semibold">
            {cardData.subject_credit} หน่วยกิต
          </div>

        </div>
      </div>
    </div>
  );
}
