"use client"

import type React from "react"

import { Combobox } from "@/components/common/Combobox/combobox"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { TableSkeleton } from "./component/skeletons/TableSkeleton"
import { useGetAllStudentsQuery } from "@/lib/api/hooks/queries/student.queries"
import { StyledServerPaginatedDataTable } from "@/components/Academic/table/PaginationTable"

// Helper hook for debouncing values
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

export default function StudentListPage() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize] = useState<number>(20)
  const [searchInput, setSearchInput] = useState<string>("")
  const [selectedClassLevel, setSelectedClassLevel] = useState<string>("")
  const [selectedFaculty, setSelectedFaculty] = useState<string>("")
  const [sortBy] = useState<string>("") 
  const [ascending] = useState<boolean>(true) 

  const [lastSuccessfulData, setLastSuccessfulData] = useState<any>(null)

  const [filterOptions, setFilterOptions] = useState<{
    classLevels: string[]
    uniqueFaculties: string[]
  }>({ classLevels: [], uniqueFaculties: [] })

  const debouncedSearchInput = useDebounce(searchInput, 500)

  const searchText = useMemo(() => {
    const filters = []
    if (debouncedSearchInput) filters.push(debouncedSearchInput)
    if (selectedClassLevel) filters.push(`class:${selectedClassLevel}`)
    if (selectedFaculty) filters.push(`faculty:${selectedFaculty}`)
    return filters.join(" ")
  }, [debouncedSearchInput, selectedClassLevel, selectedFaculty])

  const { data: allStudentsData, isLoading: isLoadingFilterOptions } = useGetAllStudentsQuery({
    pageNumber: 1,
    pageSize: 1000,
    searchText: undefined,
    sortBy: undefined,
    Ascending: true,
  })

  useEffect(() => {
    if (allStudentsData?.items && filterOptions.classLevels.length === 0) {
      const classLevels = Array.from(new Set(allStudentsData.items.map((student) => student.class))).sort()
      const uniqueFaculties = Array.from(new Set(allStudentsData.items.map((student) => student.facultyName))).sort()
      setFilterOptions({ classLevels, uniqueFaculties })
    }
  }, [allStudentsData?.items, filterOptions.classLevels.length])

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [searchText])

  const {
    data,
    isLoading: isLoadingTable,
    isError,
  } = useGetAllStudentsQuery({
    pageNumber: currentPage,
    pageSize: pageSize,
    searchText: searchText || undefined,
    sortBy: sortBy || undefined,
    Ascending: ascending,
  })

  useEffect(() => {
    if (data) {
      setLastSuccessfulData(data)
    }
  }, [data])

  const columns = [
    { label: "ลำดับ", key: "index", className: "w-2/16" },
    { label: "รหัสนักเรียน", key: "studentCode", className: "w-2/16" },
    {
      label: "ชื่อ - นามสกุล",
      key: "fullName",
      className: "w-6/16",
      render: (item: any) => `${item.prefix}${item.name} ${item.lastName}`,
    },
    { label: "ระดับชั้น", key: "class", className: "w-2/16" },
    {
      label: "หลักสูตรการศึกษา",
      key: "facultyName",
      className: "w-4/16 text-start line-clamp-1",
    },
  ]

  const tableData = useMemo(() => {
    const currentData = data || lastSuccessfulData
    if (!currentData?.items) return []

    return currentData.items.map((item: any, index: number) => ({
      ...item,
      index: (currentPage - 1) * pageSize + index + 1,
      fullName: `${item.prefix}${item.name} ${item.lastName}`,
    }))
  }, [data, lastSuccessfulData, currentPage, pageSize]) 

  const getRowLink = useCallback((item: any) => {
    return `/academic/score-management/individual/${item.studentCode}`
  }, [])

  const clearFilters = () => {
    setSearchInput("")
    setSelectedClassLevel("")
    setSelectedFaculty("")
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
  }

  const handleClassLevelChange = (value: string) => {
    setSelectedClassLevel(value)
  }

  const handleFacultyChange = (value: string) => {
    setSelectedFaculty(value)
  }

  // Only show skeleton if there's no last successful data AND it's loading
  if (isLoadingTable && !lastSuccessfulData) {
    return <TableSkeleton rows={8} columns={5} />
  }

  if (isError && !lastSuccessfulData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="text-center text-red-600 py-8">เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณาลองใหม่อีกครั้ง</div>
      </div>
    )
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
                onSelect={handleClassLevelChange}
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
                onSelect={handleFacultyChange}
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
                  onChange={handleSearchInputChange}
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
                  <button onClick={() => handleClassLevelChange("")} className="ml-1 text-blue-600 hover:text-blue-800">
                    ×
                  </button>
                </span>
              )}
              {selectedFaculty && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  หลักสูตร: {selectedFaculty}
                  <button onClick={() => handleFacultyChange("")} className="ml-1 text-green-600 hover:text-green-800">
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
          แสดง {lastSuccessfulData?.items?.length || 0} จาก {lastSuccessfulData?.totalCount || 0} รายการ
          {lastSuccessfulData && ` (หน้า ${lastSuccessfulData.pageNumber} จาก ${lastSuccessfulData.totalPages})`}
        </span>
        {isLoadingTable && <span className="text-blue-600 text-sm">กำลังโหลด...</span>}
      </div>
      <StyledServerPaginatedDataTable
      title="รายชื่อนักเรียน"
      icon={<Search className="h-5 w-5 text-gray-500" />}
        columns={columns}
        data={tableData}
        getRowLink={getRowLink}
        currentPage={currentPage}
        totalPages={lastSuccessfulData?.totalPages || 1}
        totalCount={lastSuccessfulData?.totalCount || 0}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        hasNextPage={lastSuccessfulData?.hasNextPage || false}
        hasPreviousPage={lastSuccessfulData?.hasPreviousPage || false}
      />
    </div>
  )
}
