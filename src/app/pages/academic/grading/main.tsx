"use client";
import { useState } from "react";
import { Subject } from "./subject/subject";
import { ClassSubjectPage } from "./classSubject/classSubject";
import { ChevronRight } from "lucide-react";
import { AcademicStudentInfo } from "./studentInfo/AcademicStudentClassInfo";
import { fetchPutMethodData } from "@/resource/academics/grading/api/methodPeriodApiData";

export interface ClassSubject {
  id: number;
  year: number;
  term: number;
  subjectName: string | undefined;
}

export function Main() {
  const [classSubjectData, setClassSubjectData] = useState<ClassSubject | null>(
    null
  );
  const [classInfoData, setClassInfoData] = useState<{
    subjectId: number;
    scheduleSubjectId: number;
    room: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<string>("subject");

  // State for grading popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [gradingMode, setGradingMode] = useState<"manual" | "period">("manual");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleTab = (tab: string) => {
    if (activeTab === tab) return;
    setActiveTab(tab);
    if (classSubjectData && tab === "subject") setClassSubjectData(null);
    if (classSubjectData && classInfoData && tab === "class")
      setClassInfoData(null);
  };

  const handleSelectedSubjectData = (data: ClassSubject) => {
    setClassSubjectData(data);
  };

  const handleSelectedClassInfo = (data: {
    subjectId: number;
    scheduleSubjectId: number;
    room: string;
  }) => {
    setClassInfoData(data);
  };

  const handleConfirm = async () => {
    if (gradingMode === "period" && (!startTime || !endTime)) {
      alert("Please select both start and end times.");
      return;
    }
    if (gradingMode === "period" && startTime >= endTime) {
      alert("Start Time must be earlier than End Time.");
      return;
    }
    let isAuto = true;
    if (gradingMode === "period") {
      isAuto = false;
    }
    //     {
    //   "id": 0,
    //   "methodName": "string",
    //   "isAuto": true,
    //   "startDate": "string",
    //   "endDate": "string",
    //   "isActive": true
    // }

    const methodData = {
      id: 1,
      methodName: "Edit_Score",
      isAuto: isAuto,
      startDate: startTime,
      endDate: endTime,
      isActive: true,
    };

    // Call API to set grading mode
    await fetchPutMethodData(methodData);
    setIsPopupOpen(false);
  };

  return (
    <>
      {/* Breadcrumb and navigation */}
      <div className="w-full flex gap-2 transition-all duration-500 ease-in-out justify-between">
        <div className="mt-4 w-auto flex p-2 bg-slate-100 rounded-tr-full overflow-hidden rounded-br-full relative">
          <div className="flex items-center">
            <button
              className="min-w-32 w-auto mx-10 hover:bg-slate-50 p-1 rounded-md"
              onClick={() => handleTab("subject")}
            >
              <span className="text-black text-sm font-bold">
                {classSubjectData?.subjectName ?? "Subject"}
              </span>
            </button>
            <ChevronRight />
          </div>
          {classSubjectData && (
            <div className="w-full flex items-center justify-center">
              <button
                className="min-w-32 w-auto mx-10 hover:bg-slate-50 p-1 rounded-md"
                onClick={() => handleTab("class")}
              >
                <span className="text-black text-sm font-bold">
                  {classInfoData?.room ?? "Class"}
                </span>
              </button>
              <ChevronRight />
            </div>
          )}
          {classSubjectData && classInfoData && (
            <div className="w-full flex items-center justify-center">
              <button
                className="min-w-32 w-auto mx-10 hover:bg-slate-50 p-1 rounded-md"
                onClick={() => handleTab("infoClass")}
              >
                <span className="text-black text-sm font-bold">Info Class</span>
              </button>
              <ChevronRight />
            </div>
          )}
        </div>
        {/* Button to open grading popup */}
        <div className="mt-6 flex justify-center">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsPopupOpen(true)}
          >
            Set Grading Mode
          </button>
        </div>
      </div>

      {/* Conditional Rendering for Active Tab */}
      {activeTab === "subject" && (
        <div className="opacity-100 transition-opacity duration-500 ease-in-out">
          <Subject
            handleTab={handleTab}
            handleSelectedData={handleSelectedSubjectData}
          />
        </div>
      )}

      {activeTab === "class" && classSubjectData && (
        <div className="opacity-100 transition-opacity duration-500 ease-in-out">
          <ClassSubjectPage
            classSubjecPassingData={classSubjectData}
            handleTab={handleTab}
            handleSelectedData={handleSelectedClassInfo}
          />
        </div>
      )}

      {activeTab === "infoClass" && classSubjectData && classInfoData && (
        <>
          <AcademicStudentInfo
            subjectId={classInfoData.subjectId}
            scheduleSubjectId={classInfoData.scheduleSubjectId}
            room={classInfoData.room}
          />
        </>
      )}

      {/* Grading Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Select Grading Mode</h2>

            {/* Manual Option */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gradingMode"
                value="manual"
                checked={gradingMode === "manual"}
                onChange={() => setGradingMode("manual")}
              />
              <span>Manual (Can only open/close manually)</span>
            </label>

            {/* Period Time Option */}
            <label className="flex items-center space-x-2 cursor-pointer mt-2">
              <input
                type="radio"
                name="gradingMode"
                value="period"
                checked={gradingMode === "period"}
                onChange={() => setGradingMode("period")}
              />
              <span>Period Time (Set Start & End Time)</span>
            </label>

            {/* Time Pickers (Only Show If Period Mode is Selected) */}
            {gradingMode === "period" && (
              <div className="mt-4 space-y-2">
                <label className="block">
                  Start Time:
                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full border p-2 rounded mt-1"
                  />
                </label>
                <label className="block">
                  End Time:
                  <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full border p-2 rounded mt-1"
                  />
                </label>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-6 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
