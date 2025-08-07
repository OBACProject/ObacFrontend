"use client"

import { DataTable } from "@/components/common/MainTable/table_style_1"
import { Button } from "@/components/ui/button"
import { Download, FileText, Users } from "lucide-react"
import { useState, useMemo, useCallback } from "react"
import HeaderLabel from "@/components/common/labelText/HeaderLabel"
import { GetGroupSummaryGradeResponse } from "@/lib/api/models/grade/grade.response"
import { useDebounce } from "@/hooks/useDebounce"
import { FilterState, FilterBar } from "./component/filterBar"
import { preProcessClassroomData } from "./dataProcessing"
import { TransformedStudentData } from "./mockData"

interface Props {
  initialData: GetGroupSummaryGradeResponse
}

export function ClassroomGradeClient({ initialData }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    searchInput: "",
    selectedGradeFilter: "",
    selectedSubjectFilter: "",
  })

  const debouncedSearchInput = useDebounce(filters.searchInput, 300)

  const processedData = useMemo(() => preProcessClassroomData(initialData), [initialData])
  console.log("Processed data:", processedData)

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
                ? " text-red-800"
                : isPassedGrade
                ? " text-green-800"
                : " text-gray-800"
            }`}
          >
            {grade}
          </span>
        )
      },
    }))

    return [...baseColumns, ...subjectColumns]
  }, [processedData.subjects])

  const filteredData = useMemo(() => {
    if (!debouncedSearchInput && !filters.selectedGradeFilter && !filters.selectedSubjectFilter) {
      return processedData.students
    }

    return processedData.students.filter((student) => {
      const matchSearch = debouncedSearchInput
        ? student.studentCode.toLowerCase().includes(debouncedSearchInput.toLowerCase()) ||
          student.name.toLowerCase().includes(debouncedSearchInput.toLowerCase())
        : true

      const matchGrade = filters.selectedGradeFilter
        ? (() => {
            const gpa = student.gpa
            switch (filters.selectedGradeFilter) {
              case "excellent": return gpa >= 3.5
              case "good": return gpa >= 3.0 && gpa < 3.5
              case "fair": return gpa >= 2.5 && gpa < 3.0
              case "poor": return gpa >= 2.0 && gpa < 2.5
              case "failed": return gpa < 2.0
              default: return true
            }
          })()
        : true

      const matchSubject = filters.selectedSubjectFilter
        ? student.subjects[filters.selectedSubjectFilter] && 
          parseFloat(student.subjects[filters.selectedSubjectFilter]) === 0
        : true

      return matchSearch && matchGrade && matchSubject
    })
  }, [processedData.students, debouncedSearchInput, filters.selectedGradeFilter, filters.selectedSubjectFilter])

  const tableData = useMemo(() => {
    return filteredData.map((student, index) => ({
      ...student,
      index: index + 1,
    }))
  }, [filteredData])
  console.log("Table data:", tableData)

  const getRowLink = useCallback(
    (item: TransformedStudentData) => {
      return `/academic/score-management/individual/${item.studentCode}`
    },
    []
  )

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({
      searchInput: "",
      selectedGradeFilter: "",
      selectedSubjectFilter: "",
    })
  }

  const handleDownloadGrades = () => {
    console.log("Downloading grades...")
  }

  const handleDownloadTranscripts = () => {
    console.log("Downloading transcripts...")
  }

  return (
    <>
      <div className="w-full flex justify-start">
        <HeaderLabel Icon={<Users className="h-7 w-7" />} title={"จัดการคะแนน ห้องเรียน"}/>
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
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        subjects={processedData.subjects}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        debouncedSearchInput={debouncedSearchInput}
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>
            แสดง {tableData.length} จาก {processedData.students.length} รายการ
          </span>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={tableData}
          getRowLink={getRowLink}
          pagination={15}
        />
      </div>
    </>
  )
}