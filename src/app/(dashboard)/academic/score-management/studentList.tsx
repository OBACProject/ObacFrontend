"use client"

import { DataTable } from "@/components/common/MainTable/table_style_1"
import { Combobox } from "@/components/common/Combobox/combobox"
import { Input } from "@/components/ui/input"
import type { GetAllStudentTableDto } from "@/dto/studentDto"
import { Search } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { TableSkeleton } from "./component/skeletons/TableSkeleton"

export const mockStudentData: GetAllStudentTableDto[] = [
  {
    studentId: 1,
    studentCode: "65010001",
    thaiName: "ธีรวัฒน์ พงศ์ปฏิสนธิ",
    class: "ปวช 1/1",
    currentYear: 2025,
    facultyName: "พานิชยกรรม",
    subProgramName: "การบัญชี",
    programName: "พาณิชยศาสตร์",
  },
  {
    studentId: 2,
    studentCode: "65010002",
    thaiName: "ณัฐวุฒิ ใจดี",
    class: "ปวช 1/1",
    currentYear: 2025,
    facultyName: "พานิชยกรรม",
    subProgramName: "การตลาด",
    programName: "พาณิชยศาสตร์",
  },
  {
    studentId: 3,
    studentCode: "65010003",
    thaiName: "ชลธิชา วงศ์สกุล",
    class: "ปวช 1/2",
    currentYear: 2025,
    facultyName: "บริการและการจัดการ",
    subProgramName: "การโรงแรม",
    programName: "การจัดการ",
  },
  {
    studentId: 4,
    studentCode: "65010004",
    thaiName: "พีระพงษ์ ศรีสุข",
    class: "ปวช 1/2",
    currentYear: 2025,
    facultyName: "บริการและการจัดการ",
    subProgramName: "การท่องเที่ยว",
    programName: "การจัดการ",
  },
  {
    studentId: 5,
    studentCode: "65010005",
    thaiName: "ศศิธร จิตมั่น",
    class: "ปวช 2/1",
    currentYear: 2025,
    facultyName: "พานิชยกรรม",
    subProgramName: "โลจิสติกส์",
    programName: "บริหารธุรกิจ",
  },
  {
    studentId: 6,
    studentCode: "65010006",
    thaiName: "อภิวัฒน์ คำดี",
    class: "ปวช 2/1",
    currentYear: 2025,
    facultyName: "พานิชยกรรม",
    subProgramName: "การบัญชี",
    programName: "พาณิชยศาสตร์",
  },
  {
    studentId: 7,
    studentCode: "65010007",
    thaiName: "ชนัญญา แก้วใส",
    class: "ปวช 2/2",
    currentYear: 2025,
    facultyName: "บริการและการจัดการ",
    subProgramName: "การโรงแรม",
    programName: "การจัดการ",
  },
  {
    studentId: 8,
    studentCode: "65010008",
    thaiName: "ภาณุพงศ์ ตั้งจิต",
    class: "ปวส 1/1",
    currentYear: 2025,
    facultyName: "พานิชยกรรม",
    subProgramName: "การตลาด",
    programName: "บริหารธุรกิจ",
  },
  {
    studentId: 9,
    studentCode: "65010009",
    thaiName: "ลลิตา วงศ์สุข",
    class: "ปวส 1/2",
    currentYear: 2025,
    facultyName: "บริการและการจัดการ",
    subProgramName: "การโรงแรม",
    programName: "การจัดการ",
  },
  {
    studentId: 10,
    studentCode: "65010010",
    thaiName: "ศุภกร ทองแท้",
    class: "ปวช 3/1",
    currentYear: 2025,
    facultyName: "พานิชยกรรม",
    subProgramName: "การบัญชี",
    programName: "พาณิชยศาสตร์",
  },
  {
    studentId: 11,
    studentCode: "65010011",
    thaiName: "กานต์พิชชา พงษ์ไพบูลย์",
    class: "ปวช 3/2",
    currentYear: 2025,
    facultyName: "พานิชยกรรม",
    subProgramName: "โลจิสติกส์",
    programName: "บริหารธุรกิจ",
  },
  {
    studentId: 12,
    studentCode: "65010012",
    thaiName: "ภัทรวดี อินทร",
    class: "ปวส 2/1",
    currentYear: 2025,
    facultyName: "บริการและการจัดการ",
    subProgramName: "การจัดการทั่วไป",
    programName: "การจัดการ",
  },
  {
    studentId: 13,
    studentCode: "65010013",
    thaiName: "ธนกร สายสมร",
    class: "ปวส 2/2",
    currentYear: 2025,
    facultyName: "พานิชยกรรม",
    subProgramName: "การตลาด",
    programName: "พาณิชยศาสตร์",
  },
  {
    studentId: 14,
    studentCode: "65010014",
    thaiName: "ณัฐชา มั่นกิจ",
    class: "ปวช 1/3",
    currentYear: 2025,
    facultyName: "บริการและการจัดการ",
    subProgramName: "การโรงแรม",
    programName: "การจัดการ",
  },
  {
    studentId: 15,
    studentCode: "65010015",
    thaiName: "วรินทร อุดมสุข",
    class: "ปวส 1/3",
    currentYear: 2025,
    facultyName: "พานิชยกรรม",
    subProgramName: "การบัญชี",
    programName: "พาณิชยศาสตร์",
  },
]

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function StudentListPage() {
  const [individualStudentData, setIndividualStudentData] = useState<GetAllStudentTableDto[]>(mockStudentData)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Filter states
  const [searchInput, setSearchInput] = useState<string>("")
  const [selectedClassLevel, setSelectedClassLevel] = useState<string>("")
  const [selectedFaculty, setSelectedFaculty] = useState<string>("")

  // Debounced search to improve performance
  const debouncedSearchInput = useDebounce(searchInput, 300)

  // Memoized filter options to prevent unnecessary recalculations
  const filterOptions = useMemo(() => {
    const classLevels = Array.from(new Set(individualStudentData.map((student) => student.class))).sort()

    const uniqueFaculties = Array.from(new Set(individualStudentData.map((student) => student.facultyName))).sort()

    return { classLevels, uniqueFaculties }
  }, [individualStudentData])

  // Uncomment when ready to use real data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const data = await getAllStudentViewData();
  //       setIndividualStudentData(data);
  //     } catch (error) {
  //       console.error('Failed to fetch student data:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const columns = [
    { label: "ลำดับ", key: "index", className: "w-2/16" },
    { label: "รหัสนักเรียน", key: "studentCode", className: "w-2/16" },
    { label: "ชื่อ - นามสกุล", key: "thaiName", className: "w-6/16" },
    { label: "ระดับชั้น", key: "class", className: "w-2/16" },
    {
      label: "หลักสูตรการศึกษา",
      key: "facultyName",
      className: "w-4/16 text-start line-clamp-1",
    },
  ]

  const filteredData = useMemo(() => {
    if (!debouncedSearchInput && !selectedClassLevel && !selectedFaculty) {
      return individualStudentData
    }

    return individualStudentData.filter((student) => {
      const matchClassLevel = selectedClassLevel ? student.class === selectedClassLevel : true

      const matchFaculty = selectedFaculty ? student.facultyName === selectedFaculty : true

      const matchSearch = debouncedSearchInput
        ? student.studentCode.toLowerCase().includes(debouncedSearchInput.toLowerCase()) ||
          student.thaiName.toLowerCase().includes(debouncedSearchInput.toLowerCase())
        : true

      return matchClassLevel && matchFaculty && matchSearch
    })
  }, [individualStudentData, selectedClassLevel, selectedFaculty, debouncedSearchInput])

  const tableData = useMemo(() => {
    return filteredData.map((item, index) => ({
      ...item,
      index: index + 1,
    }))
  }, [filteredData])

  const getRowLink = useCallback(
    (item: any) => {
      const student = individualStudentData.find((student) => student.studentCode === item.studentCode)
      return `/academic/score-management/individual/${student?.studentId}`
    },
    [individualStudentData],
  )

  const clearFilters = () => {
    setSearchInput("")
    setSelectedClassLevel("")
    setSelectedFaculty("")
  }

  if (isLoading) {
    return <TableSkeleton rows={8} columns={5}/>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">ตัวกรองข้อมูล</h3>
            {(selectedClassLevel || selectedFaculty || debouncedSearchInput) && (
              <button onClick={clearFilters} className="text-blue-600 hover:text-blue-800 underline text-sm">
                ล้างตัวกรอง
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ระดับการศึกษา</label>
              <Combobox
                options={[
                  { value: "", label: "ทั้งหมด" },
                  ...filterOptions.classLevels.map((classData) => ({
                    value: classData,
                    label: classData,
                  })),
                ]}
                buttonLabel={selectedClassLevel || "เลือกระดับการศึกษา"}
                onSelect={setSelectedClassLevel}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">หลักสูตรการศึกษา</label>
              <Combobox
                options={[
                  { value: "", label: "ทั้งหมด" },
                  ...filterOptions.uniqueFaculties.map((data) => ({
                    value: data,
                    label: data,
                  })),
                ]}
                buttonLabel={selectedFaculty || "เลือกหลักสูตรการศึกษา"}
                onSelect={setSelectedFaculty}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ค้นหา</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="ค้นหารหัสนักเรียนหรือชื่อ..."
                  className="pl-10 w-full"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                />
              </div>
            </div>
          </div>

          {(selectedClassLevel || selectedFaculty || debouncedSearchInput) && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <span className="text-sm text-gray-600">ตัวกรองที่ใช้:</span>
              {selectedClassLevel && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ระดับ: {selectedClassLevel}
                  <button onClick={() => setSelectedClassLevel("")} className="ml-1 text-blue-600 hover:text-blue-800">
                    ×
                  </button>
                </span>
              )}
              {selectedFaculty && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  หลักสูตร: {selectedFaculty}
                  <button onClick={() => setSelectedFaculty("")} className="ml-1 text-green-600 hover:text-green-800">
                    ×
                  </button>
                </span>
              )}
              {debouncedSearchInput && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  ค้นหา: "{debouncedSearchInput}"
                  <button onClick={() => setSearchInput("")} className="ml-1 text-purple-600 hover:text-purple-800">
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          แสดง {tableData.length} จาก {individualStudentData.length} รายการ
        </span>
      </div>

      <DataTable columns={columns} data={tableData} getRowLink={getRowLink} pagination={10} />
    </div>
  )
}
