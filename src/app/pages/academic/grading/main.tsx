"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Subject } from "./subject/subject";
import { ClassSubjectPage } from "./classSubject/classSubject";
import { ChevronRight } from "lucide-react";
import { AcademicStudentInfo } from "./studentInfo/AcademicStudentClassInfo";
import { fetchPutMethodData } from "@/resource/academics/grading/api/methodPeriodApiData";
import { MethodDto } from "@/dto/methodDto";
import { getMethodViewData } from "@/resource/academics/grading/viewData/methodPeriodViewData";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const [classInfoData, setClassInfoData] = useState<{
    subjectId: number;
    scheduleSubjectId: number;
    room: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<string>("subject");

  // State for grading popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [gradingMode, setGradingMode] = useState<"manual" | "period" | null>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSelectedSubjectData = (data: ClassSubject) => {
    setClassSubjectData(data);
    localStorage.setItem("classSubjectData", JSON.stringify(data));
  };

  const handleSelectedClassInfo = (data: {
    subjectId: number;
    scheduleSubjectId: number;
    room: string;
  }) => {
    setClassInfoData(data);
    localStorage.setItem("classInfoData", JSON.stringify(data));
  };

  const handleTab = (tab: string) => {
    if (activeTab === tab) return;
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);

    if (tab === "subject") {
      setClassSubjectData(null);
      setClassInfoData(null);
      localStorage.removeItem("classSubjectData");
      localStorage.removeItem("classInfoData");
    }

    if (tab === "class") {
      setClassInfoData(null);
      localStorage.removeItem("classInfoData");
    }
  };

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    const savedClassSubjectData = localStorage.getItem("classSubjectData");
    const savedClassInfoData = localStorage.getItem("classInfoData");

    if (savedTab) {
      setActiveTab(savedTab);
    }

    if (savedClassSubjectData) {
      setClassSubjectData(JSON.parse(savedClassSubjectData));
    }

    if (savedClassInfoData) {
      setClassInfoData(JSON.parse(savedClassInfoData));
    }

    fetchData();
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      if (
        typeof window !== "undefined" &&
        pathname !== "/academic/grading/management/classroom"
      ) {
        localStorage.removeItem("activeTab");
        localStorage.removeItem("selectedClassroomData");
        localStorage.removeItem("classSubjectData");
        localStorage.removeItem("classInfoData");
      }
    };

    handleRouteChange(); // Call function on component mount to clean up if needed
  }, [pathname]);

  const fetchData = async () => {
    try {
      const response: MethodDto[] = await getMethodViewData(); // Fetch initial method data

      const editResponse = response.find(
        (item) => item.methodName === "Edit_Score"
      );
      console.log("Edit Response:", editResponse);
      if (editResponse) {
        setIsActive(editResponse.isActive);
        if (!editResponse.isActive) {
          setGradingMode(null);
        } else {
          if (
            editResponse.isAuto &&
            editResponse.startDate &&
            editResponse.endDate
          ) {
            setGradingMode("period");
            setStartTime(editResponse.startDate);
            setEndTime(editResponse.endDate);
          } else {
            setGradingMode("manual");
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch initial method data:", error);
    }
  };

  const handleConfirm = async () => {
    if (gradingMode === "period" && (!startTime || !endTime)) {
      alert("กรุณาเลือกวันเวลาเริ่มต้นและสิ้นสุดการกรอกคะแนน");
      return;
    }
    if (gradingMode === "period" && startTime >= endTime) {
      alert("กรุณาเลือกวันเวลาเริ่มต้นและสิ้นสุดการกรอกคะแนนให้ถูกต้อง");
      return;
    }
    const isAuto = gradingMode == "period";

    const methodData = {
      id: 1,
      methodName: "Edit_Score",
      isAuto: isAuto,
      startDate: gradingMode === "period" ? startTime : null,
      endDate: gradingMode === "period" ? endTime : null,
      isActive: isActive,
    };

    await fetchPutMethodData(methodData);
    setIsPopupOpen(false);
    try {
      await fetchPutMethodData(methodData);
      setIsPopupOpen(false);
      Swal.fire({
        title: "Success!",
        icon: "success",
      });

      // Fetch data again after the update
      fetchData();
    } catch (error) {
      console.error("Failed to update method data:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update method data",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    setIsActive(gradingMode !== null ? true : false);
  }, [gradingMode]);

  return (
    <div className="w-full">
      {/* Breadcrumb and navigation */}
      <div className="w-full flex gap-2 transition-all duration-500 ease-in-out justify-between">
        <div className="mt-4 w-auto flex p-2 bg-slate-100 rounded-tr-full overflow-hidden rounded-br-full relative">
          <div className="flex items-center">
            <button
              className="min-w-32 w-auto mx-10 hover:bg-slate-50 p-1 rounded-md"
              onClick={() => handleTab("subject")}
            >
              <span className="text-black text-sm font-bold line-clamp-1">
                {classSubjectData?.subjectName ?? "Subject"}
              </span>
            </button>
            <ChevronRight />
          </div>
          {classSubjectData && (
            <div className="w-full flex items-center justify-center">
              <button
                className="min-w-32 max-w-48 w-full hover:bg-slate-50 p-1 rounded-md"
                onClick={() => handleTab("class")}
              >
                <span className="text-black text-sm font-bold ">
                  {classInfoData?.room ?? "Class"}
                </span>
              </button>
              <ChevronRight />
            </div>
          )}
          {classSubjectData && classInfoData && (
            <div className="w-full flex items-center justify-center">
              <button
                className="min-w-32 w-auto  hover:bg-slate-50 p-1 rounded-md"
                onClick={() => handleTab("infoClass")}
              >
                <span className="text-black text-sm font-bold line-clamp-1">
                  Info Class
                </span>
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
            ระบบเปิด/ปิดช่วงการลงคะแนน
          </button>
        </div>
      </div>

      {/* Conditional Rendering for Active Tab */}
      {activeTab === "subject" && (
        <div className="opacity-100 w-full  transition-opacity duration-500 ease-in-out">
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
          <h1 className="text-5xl font-extrabold text-black"></h1>
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
            <h2 className="text-lg font-semibold mb-4">
              ระบบเปิด/ปิดช่วงการลงคะแนน
            </h2>

            {/* Manual Mode Toggle */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-900">
                เปิดระบบการกรอกคะแนน (on/off)
              </span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={gradingMode === "manual"}
                  onChange={() =>
                    setGradingMode(gradingMode === "manual" ? null : "manual")
                  }
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
              </label>
            </div>

            {/* Period Mode Option */}
            <div className="flex items-center justify-between  mb-4">
              <span className="ml-2 text-sm text-gray-900">
                เปิดระบบการกรอกคะแนนตามช่วงเวลา
              </span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={gradingMode === "period"}
                  onChange={() =>
                    setGradingMode(gradingMode === "period" ? null : "period")
                  }
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
              </label>
            </div>

            {/* Time Pickers for Period Mode */}
            {gradingMode === "period" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm">วันที่เริ่มต้น:</label>
                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full border rounded p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm">วันที่สิ้นสุด:</label>
                  <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full border rounded p-2 mt-1"
                  />
                </div>
              </div>
            )}

            {/* Popup Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                className="px-4 py-1 bg-gray-300 rounded"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 bg-blue-500 text-white rounded"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
