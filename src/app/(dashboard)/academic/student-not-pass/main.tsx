"use client";
import { GradBelowResponse } from "@/dto/gradDto";
import { Loader2, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import SelectTermAndYear from "@/components/Academic/SelectTermYear";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { getCurrentThaiTermYear } from "@/lib/utils";
import { GetStudentIfGradeBelow } from "@/api/grad/route";
import { PDFFailedStudentNamelistButton } from "@/components/PDF/PDFButton";
import GradeFilter from "@/components/Academic/GradeFilter";

export default function Main() {
  const { defaultTerm, currentYear } = getCurrentThaiTermYear();
  const [students, setStudent] = useState<GradBelowResponse[]>([]);
  const studentCount = useMemo(() => students.length, [students]);
  const [grads, setGrad] = useState<number>(2.0);
  const [term, setTerm] = useState<string>(defaultTerm);
  const [year, setYear] = useState<number>(currentYear);
  const [classSelect, setClassSelect] = useState<string>("");
  const [currentYearSelect, setCurrentYearSelect] = useState<number>(0);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [classType, year] = e.target.value.split("&");
    setClassSelect(classType);
    setCurrentYearSelect(Number(year));
  };

  const router = useRouter();

  const onFilterGroup = async () => {
    setSearchTrigger(true);
    try {
      await GetStudentIfGradeBelow(
        classSelect,
        currentYearSelect,
        grads,
        term,
        year
      ).then((item: GradBelowResponse[]) => {
        setStudent(item);
      });
      setIsSearch(true);
      setSearchTrigger(false);
    } catch (err) {
      console.log("API GetGradBelow ERROR ", Error);
      setSearchTrigger(false);
      setIsSearch(true);
    }

    setIsSearch(true);
    setSearchTrigger(false);
  };

  const handleStudentName = (studentCode: number) => {
    router.push(`/academic/score-management/individual/${studentCode}`);
  };

  return (
    <div className="py-5">
      <div className="w-full justify-start px-10 flex">
        <HeaderLabel
          Icon={<User className="h-7 w-7 text-white" />}
          bg_icon="bg-red-500"
          title="นักเรียนไม่ผ่านเกณฑ์"
          className="text-red-600"
        />
      </div>
      <div className="w-full py-4 px-10 flex items-center justify-start gap-4">
        <SelectTermAndYear
          term={term}
          year={year}
          currentYear={currentYear}
          onChangeTerm={setTerm}
          onChangeYear={setYear}
        />
        <GradeFilter grade={grads} onChange={setGrad} />
        <select
          className="border border-gray-200 rounded-sm py-1 px-4"
          onChange={handleClassChange}
          value={`${classSelect}&${currentYearSelect}`}
        >
          <option value="">เลือก</option>
          <option value="ปวช&1">ปวช.1</option>
          <option value="ปวช&2">ปวช.2</option>
          <option value="ปวช&3">ปวช.3</option>
          <option value="ปวส&1">ปวส.1</option>
          <option value="ปวส&2">ปวส.2</option>
        </select>
        {!searchTrigger ? (
          <button
            className="px-5 text-white py-1.5 rounded-md  flex items-center justify-center gap-2 text-center w-fit bg-blue-500 hover:bg-blue-700"
            onClick={onFilterGroup}
            style={{ userSelect: "none" }}
            disabled={
              !classSelect || !currentYearSelect || !term || !year || !grads
            }
          >
            <Search className="w-5 h-5" />
            <p>ค้นหา</p>
          </button>
        ) : (
          <button
            className="px-5 text-white py-1.5 rounded-md  flex items-center justify-center gap-2 text-center w-fit bg-blue-500 hover:bg-blue-700"
            style={{ userSelect: "none" }}
            disabled={
              !classSelect || !currentYearSelect || !term || !year || !grads
            }
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            <p>กำลังค้นหา</p>
          </button>
        )}
      </div>
      <div className="px-10  py-0">
        {isSearch ? (
          <div>
            {studentCount > 0 ? (
              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <div className="py-1 px-5 text-white bg-red-400 font-semibold w-fit border-2 border-red-400  rounded-md flex  gap-3">
                    จำนวนนักเรียนที่ไม่ผ่านเกณฑ์ <p>{studentCount}</p>คน
                  </div>
                  <div>
                    <PDFFailedStudentNamelistButton
                      className={classSelect}
                      currentYear={currentYearSelect}
                      grade={Number(grads)}
                      term={term}
                      year={year}
                    />
                  </div>
                </div>

                <div>
                  <div
                    className="grid shadow-lg h-fit grid-cols-[10%_20%_30%_10%_15%_15%] bg-gray-200 rounded-t-md
                   text-gray-700   text-lg"
                  >
                    <div className="py-1 text-lg text-center">ลำดับ</div>
                    <div className="py-1 text-lg text-center">รหัสนักศึกษา</div>
                    <div className="py-1 text-lg text-center">
                      ชื่อ - นามสกุล
                    </div>
                    <div className="py-1 text-lg text-center">ห้องเรียน</div>
                    <div className="py-1 text-lg text-center">
                      เกรดเทอมล่าสุด
                    </div>
                    <div className="py-1 text-lg text-center">
                      เลขที่ใบเสร็จ
                    </div>
                  </div>
                  {students.map((item, index) => (
                    <div
                      onClick={() => {
                        handleStudentName(Number(item.studentCode));
                      }}
                      key={index}
                      className="border border-t-0 border-gray-300 hover:bg-red-100 bg-white text-black grid h-fit  grid-cols-[10%_20%_15%_15%_10%_15%_15%] shadow-md"
                    >
                      <div className="text-center py-1 border-r border-gray-400">
                        {index + 1}
                      </div>
                      <div className="text-center py-1 border-r border-gray-400">
                        {item.studentCode}
                      </div>
                      <div className="text-start py-1 pl-8">
                        {item.prefix}&nbsp;
                        {item.firstName}
                      </div>
                      <div className="text-start py-1 border-r border-gray-400">
                        {item.lastName}
                      </div>
                      <div className="text-center border-r border-gray-400 py-1">
                        {item.class}.{item.groupName}
                      </div>
                      <div className="text-center border-r border-gray-400 py-1">
                        {item.gpax.toFixed(2)}
                      </div>
                      <div className="text-center  py-1">-</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                style={{ userSelect: "none" }}
                className="w-full  border-2 grid place-items-center border-gray-300 border-dashed rounded-md py-10 text-gray-500 text-2xl font-semibold"
              >
                ไม่พบข้อมูล
              </div>
            )}
          </div>
        ) : (
          <div
            style={{ userSelect: "none" }}
            className="w-full  border-2 grid place-items-center border-gray-300 border-dashed rounded-md py-10 text-gray-500 text-2xl font-semibold"
          >
            ยังไม่ได้เลือก
          </div>
        )}
      </div>
    </div>
  );
}
