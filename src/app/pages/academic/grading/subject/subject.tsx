"use client";

import { Combobox } from "@/app/components/combobox/combobox";
import { makeColumns } from "@/app/components/table/makeColumns";
import { DataTable } from "@/app/components/table/tableComponent";
import { Input } from "@/components/ui/input";
import { GradingDataColumn } from "@/dto/gradingDto";
import { getGradingViewData } from "@/resource/academics/grading/viewData/gradingViewData";
import { useEffect, useState } from "react";

export function Subject(props: {
  handleTab: (tab: string) => void;
  handleSelectedData: (data: {
    id: number;
    year: number;
    term: number;
    subjectName: string;
  }) => void;
}) {
  const [searchSubject, setSearchSubject] = useState<string>("");

  const [gradingData, setGradingData] = useState<GradingDataColumn[]>([]);
  const [gradingDataFiltered, setGradingDataFiltered] = useState<
    GradingDataColumn[]
  >([]);
  console.log(gradingData);
  // filter data
  const term = ["1", "2"];
  const currentYear = new Date().getFullYear(); // Get the current year as a number
  const yearsList = Array.from({ length: 5 }, (_, i) =>
    (currentYear - i).toString()
  );
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const handleSelectedSubjectData = (id: number) => {
    if (!selectedTerm || !selectedYear) {
      alert("กรุณาเลือกภาคเรียนและปีการศึกษาก่อน");
    } else {
      props.handleTab("class");
      const item = gradingDataFiltered.find((item) => item.id === id);
      if (item) {
        props.handleSelectedData({
          id: id,
          year: Number(selectedYear),
          term: Number(selectedTerm),
          subjectName: item.subjectName,
        });
      } else {
        alert("ไม่พบข้อมูล");
      }
      console.log("Selected data", id);
    }
  };

  const columns = makeColumns<GradingDataColumn>(
    {
      id: 1,
      subjectCode: "",
      subjectName: "",
      description: "",
    },
    "id",
    {
      id: "ID",
      subjectCode: "รหัสวิชา",
      subjectName: "ชื่อวิชา",
      description: "รายละเอียด",
    },
    [
      {
        label: "ตรวจสอบรายละเอียด",
        onClick: (id: string | number) => handleSelectedSubjectData(Number(id)),
        className: "hover:bg-blue-600 bg-blue-500",
      },
    ]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGradingViewData();
        setGradingData(data);
      } catch (error) {
        console.error("Error fetching grading data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const normalizedSearch = searchSubject.toLowerCase();
    const filteredData = gradingData?.filter((item) => {
      const matchSearch =
        item.subjectCode.toLowerCase().includes(normalizedSearch) ||
        item.subjectName.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch);
      return matchSearch;
    });

    setGradingDataFiltered(filteredData);
  }, [searchSubject, gradingData]);
  // console.log(gradingDataFiltered);
  return (
    <>
      <header className="flex flex-col p-4 w-full border-2 mt-4 rounded-lg">
        {/* filter Data */}
        <div className="flex gap-6 mt-6 p-4 bg-slate-50 rounded-lg">
          {/* filter */}
          <div className="w-1/4 flex flex-col gap-4 p-4 relative">
            <h1>ภาคเรียน</h1>
            <Combobox
              options={term.map((item) => ({
                value: item,
                label: item,
              }))}
              buttonLabel="เลือกภาคเรียน"
              onSelect={(selectedTerm) => setSelectedTerm(selectedTerm)}
            />
          </div>
          <div className="w-1/4 flex flex-col gap-4 p-4 relative">
            <h1>ปีการศึกษา</h1>
            <Combobox
              options={yearsList.map((item) => ({
                value: item,
                label: item,
              }))}
              buttonLabel="เลือกปีการศึกษา"
              onSelect={(selectedYear) => setSelectedYear(selectedYear)}
            />
          </div>
          <div className="relative w-1/3 flex flex-col gap-4 p-4">
            <h1>ค้นหารายวิชา</h1>
            <div className="bg-white">
              <Input
                type="text"
                placeholder="Search..."
                className="w-full pr-10" // Add padding to the right for the icon
                onChange={(event) => setSearchSubject(event.target.value)}
              />
            </div>
          </div>
        </div>
        {/* data zone */}
        <div className="mt-4 w-full p-4">
          <DataTable
            columns={columns}
            data={gradingDataFiltered}
            selectedValue="id"
            columnWidths={{
              id: "w-1/12",
              subjectCode: "w-2/12",
              subjectName: "w-1/6",
              description: "w-3/6",
            }}
          />
        </div>
        {/* breadcrumb zone */}
      </header>
    </>
  );
}
