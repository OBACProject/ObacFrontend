"use client"

import { Combobox } from "@/components/common/Combobox/combobox"
import { DataTable } from "@/components/common/MainTable/table_style_1"
import { TableSkeleton } from "@/components/common/TableSkeleton/tableSkeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ClassroomByGroupIdData } from "@/dto/gradingDto"
import { Download, FileText, Search, Users } from "lucide-react"
import { useState, useMemo, useCallback, useEffect } from "react"
import { mockClassroomData, TransformedStudentData } from "./mockData"


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

const preProcessClassroomData = (data: ClassroomByGroupIdData) => {
  const uniqueSubjects = Array.from(
    new Set(data.student.flatMap(s => s.subject.map(sub => sub.subjectName)))
  ).sort()

  const processedStudents = data.student.map(student => ({
    studentId: student.studentId,
    studentCode: student.studentCode,
    name: `${student.firstName} ${student.lastName}`,
    gpa: student.gpa,
    gpax: student.gpax,
    totalCredit: student.totalCredit,
    subjects: Object.fromEntries(
      student.subject.map(sub => [sub.subjectName, sub.grade])
    ),
    failedSubjects: student.subject.filter(sub => parseFloat(sub.grade) === 0).length,
    passedSubjects: student.subject.filter(sub => parseFloat(sub.grade) > 0).length,
  }))

  // const classStats = {
  //   totalStudents: data.student.length,
  //   averageGPA: data.student.reduce((sum, s) => sum + s.gpa, 0) / data.student.length,
  //   averageGPAX: data.student.reduce((sum, s) => sum + s.gpax, 0) / data.student.length,
  //   highestGPA: Math.max(...data.student.map(s => s.gpa)),
  //   lowestGPA: Math.min(...data.student.map(s => s.gpa)),
  // }

  return {
    generalData: {
      groupId: data.groupId,
      groupName: data.groupName,
      groupCode: data.groupCode,
      class: data.class,
      facultyName: data.facultyName,
      programName: data.programName,
      term: data.term,
      year: data.year,
    },
    students: processedStudents,
    subjects: uniqueSubjects,
    // classStats,
  }
}

export default function ClassroomGradeManagementPage() {
  const [classroomData, setClassroomData] = useState<ClassroomByGroupIdData>(mockClassroomData)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Filter states
  const [searchInput, setSearchInput] = useState<string>("")
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>("")
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>("")

  // Debounced search
  const debouncedSearchInput = useDebounce(searchInput, 300)

  // Pre-process data once
  const processedData = useMemo(() => preProcessClassroomData(classroomData), [classroomData])

  // Memoized filter options
  const filterOptions = useMemo(() => {
    const gradeRanges = [
      { value: "excellent", label: "เยี่ยม (3.5-4.0)" },
      { value: "good", label: "ดี (3.0-3.49)" },
      { value: "fair", label: "ปานกลาง (2.5-2.99)" },
      { value: "poor", label: "ต่ำ (2.0-2.49)" },
      { value: "failed", label: "ไม่ผ่าน (0.0-1.99)" },
    ]

    return {
      gradeRanges,
      subjects: processedData.subjects,
    }
  }, [processedData.subjects])

  // Generate dynamic columns based on subjects
  const columns = useMemo(() => {
    const baseColumns = [
      { label: "ลำดับ", key: "index", className: "w-1/12" },
      { label: "รหัสนักเรียน", key: "studentCode", className: "w-2/12" },
      { label: "ชื่อ - นามสกุล", key: "name", className: "w-3/12" },
      { label: "GPA", key: "gpa", className: "w-1/12 text-center" },
      { label: "GPAX", key: "gpax", className: "w-1/12 text-center" },
    ]

    const subjectColumns = processedData.subjects.map(subject => ({
      label: subject,
      key: `subjects.${subject}`,
      className: "w-1/12 text-center",
      render: (row: any) => {
        const grade = row.subjects[subject] || "N/A"
        const gradeValue = parseFloat(grade)
        const isFailedGrade = gradeValue === 0
        const isPassedGrade = gradeValue > 0

        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              isFailedGrade
                ? "bg-red-100 text-red-800"
                : isPassedGrade
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {grade}
          </span>
        )
      },
    }))

    return [...baseColumns, ...subjectColumns]
  }, [processedData.subjects])

  // Filtered data with memoization
  const filteredData = useMemo(() => {
    if (!debouncedSearchInput && !selectedGradeFilter && !selectedSubjectFilter) {
      return processedData.students
    }

    return processedData.students.filter((student) => {
      const matchSearch = debouncedSearchInput
        ? student.studentCode.toLowerCase().includes(debouncedSearchInput.toLowerCase()) ||
          student.name.toLowerCase().includes(debouncedSearchInput.toLowerCase())
        : true

      const matchGrade = selectedGradeFilter
        ? (() => {
            const gpa = student.gpa
            switch (selectedGradeFilter) {
              case "excellent": return gpa >= 3.5
              case "good": return gpa >= 3.0 && gpa < 3.5
              case "fair": return gpa >= 2.5 && gpa < 3.0
              case "poor": return gpa >= 2.0 && gpa < 2.5
              case "failed": return gpa < 2.0
              default: return true
            }
          })()
        : true

      const matchSubject = selectedSubjectFilter
        ? student.subjects[selectedSubjectFilter] && 
          parseFloat(student.subjects[selectedSubjectFilter]) === 0
        : true

      return matchSearch && matchGrade && matchSubject
    })
  }, [processedData.students, debouncedSearchInput, selectedGradeFilter, selectedSubjectFilter])

  const tableData = useMemo(() => {
    return filteredData.map((student, index) => ({
      ...student,
      index: index + 1,
    }))
  }, [filteredData])

  const getRowLink = useCallback(
    (item: TransformedStudentData) => {
      return `/academic/score-management/individual/${item.studentId}`
    },
    []
  )

  const clearFilters = () => {
    setSearchInput("")
    setSelectedGradeFilter("")
    setSelectedSubjectFilter("")
  }

  const handleDownloadGrades = () => {
    // Implement grade download logic
    console.log("Downloading grades...")
  }

  const handleDownloadTranscripts = () => {
    // Implement transcript download logic
    console.log("Downloading transcripts...")
  }

  // Uncomment when ready to use real data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const data = await getClassroomDataById(groupId);
  //       setClassroomData(data);
  //     } catch (error) {
  //       console.error('Failed to fetch classroom data:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [groupId]);

  if (isLoading) {
    return <TableSkeleton rows={10} columns={columns.length} />
  }

  return (
    <div className="mx-4 sm:mx-10 lg:mx-10 p-4 space-y-6">
      <div className="w-full flex justify-start">
        <div className="px-10 rounded-3xl flex gap-2 items-center border border-gray-100 shadow-md py-2 text-blue-700 text-xl w-fit">
          <Users className="h-8 w-8" />
          จัดการคะแนน (รายห้อง)
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {processedData.generalData.class} - {processedData.generalData.groupName}
            </h2>
            <p className="text-gray-600 mt-1">
              {processedData.generalData.facultyName} - {processedData.generalData.programName}
            </p>
            <p className="text-sm text-gray-500">
              ปีการศึกษา {processedData.generalData.year} เทอม {processedData.generalData.term}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleDownloadGrades}
              className="flex items-center gap-2"
              variant="outline"
              size="sm"
            >
              <Download className="h-4 w-4" />
              ดาวน์โหลดคะแนน
            </Button>
            <Button
              onClick={handleDownloadTranscripts}
              className="flex items-center gap-2"
              variant="outline"
              size="sm"
            >
              <FileText className="h-4 w-4" />
              ดาวน์โหลด Transcript
            </Button>
          </div>
        </div>

        {/* Class Statistics
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-600">จำนวนนักเรียน</h3>
            <p className="text-2xl font-bold text-blue-900">{processedData.classStats.totalStudents}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-600">GPA เฉลี่ย</h3>
            <p className="text-2xl font-bold text-green-900">{processedData.classStats.averageGPA.toFixed(2)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-600">GPA สูงสุด</h3>
            <p className="text-2xl font-bold text-purple-900">{processedData.classStats.highestGPA.toFixed(2)}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-orange-600">GPA ต่ำสุด</h3>
            <p className="text-2xl font-bold text-orange-900">{processedData.classStats.lowestGPA.toFixed(2)}</p>
          </div>
        </div> */}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">ตัวกรองข้อมูล</h3>
              {(selectedGradeFilter || selectedSubjectFilter || debouncedSearchInput) && (
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  ล้างตัวกรอง
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ช่วงเกรด</label>
                <Combobox
                  options={[
                    { value: "", label: "ทั้งหมด" },
                    ...filterOptions.gradeRanges,
                  ]}
                  buttonLabel={
                    selectedGradeFilter
                      ? filterOptions.gradeRanges.find(g => g.value === selectedGradeFilter)?.label || "เลือกช่วงเกรด"
                      : "เลือกช่วงเกรด"
                  }
                  onSelect={setSelectedGradeFilter}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">วิชาที่ไม่ผ่าน</label>
                <Combobox
                  options={[
                    { value: "", label: "ทั้งหมด" },
                    ...filterOptions.subjects.map(subject => ({
                      value: subject,
                      label: subject,
                    })),
                  ]}
                  buttonLabel={selectedSubjectFilter || "เลือกวิชาที่ไม่ผ่าน"}
                  onSelect={setSelectedSubjectFilter}
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
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedGradeFilter || selectedSubjectFilter || debouncedSearchInput) && (
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <span className="text-sm text-gray-600">ตัวกรองที่ใช้:</span>
                {selectedGradeFilter && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    เกรด: {filterOptions.gradeRanges.find(g => g.value === selectedGradeFilter)?.label}
                    <button
                      onClick={() => setSelectedGradeFilter("")}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedSubjectFilter && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    วิชาไม่ผ่าน: {selectedSubjectFilter}
                    <button
                      onClick={() => setSelectedSubjectFilter("")}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {debouncedSearchInput && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    ค้นหา: "{debouncedSearchInput}"
                    <button
                      onClick={() => setSearchInput("")}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
          <span>
            แสดง {tableData.length} จาก {processedData.students.length} รายการ
          </span>
        </div>

        {/* Data Table */}
        <div className="mt-4">
          <DataTable
            columns={columns}
            data={tableData}
            getRowLink={getRowLink}
            pagination={15}
          />
        </div>
      </div>
    </div>
  )
}