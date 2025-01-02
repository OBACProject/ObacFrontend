import { Badge } from "@/components/ui/badge";

export function CreateEvent() {
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <Badge className="text-sm sm:text-base" variant="outline">
            สร้างกิจกรรมภายในวิทยาลัย
          </Badge>
          <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
            สร้างกิจกรรม
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="title" className="block font-semibold">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-semibold">
              Description
            </label>
            <textarea
              id="description"
              className="w-full border border-gray-300 rounded-md p-2"
            ></textarea>
          </div>
          <div>
            <label htmlFor="startDate" className="block font-semibold">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block font-semibold">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
      </div>
    </>
  );
}
