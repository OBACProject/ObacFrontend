"use client"

import { DataTable } from "@/components/common/MainTable/table_style_1"
import { Combobox } from "@/components/common/Combobox/combobox"
import { Input } from "@/components/ui/input"
import type { GetAllStudentTableDto } from "@/dto/studentDto"
import { Search } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { TableSkeleton } from "./component/skeletons/TableSkeleton"
import { useGetAllStudentsQuery } from "@/lib/api/hooks/queries/student.queries"
import { ServerPaginatedDataTable } from "@/components/Academic/table/PaginationTable"

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
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize] = useState<number>(20)
  const [searchInput, setSearchInput] = useState<string>("")
  const [selectedClassLevel, setSelectedClassLevel] = useState<string>("")
  const [selectedFaculty, setSelectedFaculty] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("")
  const [ascending, setAscending] = useState<boolean>(true)

  const debouncedSearchInput = useDebounce(searchInput, 300)

  const searchText = useMemo(() => {
    const filters = []
    if (debouncedSearchInput) filters.push(debouncedSearchInput)
    if (selectedClassLevel) filters.push(`class:${selectedClassLevel}`)
    if (selectedFaculty) filters.push(`faculty:${selectedFaculty}`)
    return filters.join(' ')
  }, [debouncedSearchInput, selectedClassLevel, selectedFaculty])

  const { data, isLoading, isError } = useGetAllStudentsQuery({
    pageNumber: currentPage,
    pageSize: pageSize,
    searchText: searchText || undefined,
    sortBy: sortBy || undefined,
    Ascending: ascending,
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [searchText])

  const filterOptions = useMemo(() => {

    const classLevels = data?.items 
      ? Array.from(new Set(data.items.map((student) => student.class))).sort()
      : []
    
    const uniqueFaculties = data?.items
      ? Array.from(new Set(data.items.map((student) => student.facultyName))).sort()
      : []

    return { classLevels, uniqueFaculties }
  }, [data?.items])

  const columns = [
    { label: "ลำดับ", key: "index", className: "w-2/16" },
    { label: "รหัสนักเรียน", key: "studentCode", className: "w-2/16" },
    { 
      label: "ชื่อ - นามสกุล", 
      key: "fullName", 
      className: "w-6/16",
      render: (item: any) => `${item.prefix}${item.name} ${item.lastName}`
    },
    { label: "ระดับชั้น", key: "class", className: "w-2/16" },
    {
      label: "หลักสูตรการศึกษา",
      key: "facultyName",
      className: "w-4/16 text-start line-clamp-1",
    },
  ]

  const tableData = useMemo(() => {
    if (!data?.items) return []
    
    return data.items.map((item, index) => ({
      ...item,
      index: (currentPage - 1) * pageSize + index + 1, 
      fullName: `${item.prefix}${item.name} ${item.lastName}`
    }))
  }, [data?.items, currentPage, pageSize])

  const getRowLink = useCallback(
    (item: any) => {
      return `/academic/score-management/individual/${item.id}`
    },
    [],
  )

  const clearFilters = () => {
    setSearchInput("")
    setSelectedClassLevel("")
    setSelectedFaculty("")
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading) {
    return <TableSkeleton rows={8} columns={5}/>
  }

  if (isError) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="text-center text-red-600 py-8">
          เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณาลองใหม่อีกครั้ง
        </div>
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
          แสดง {data?.items?.length || 0} จาก {data?.totalCount || 0} รายการ
          {data && ` (หน้า ${data.pageNumber} จาก ${data.totalPages})`}
        </span>
      </div>

      <ServerPaginatedDataTable 
        columns={columns} 
        data={tableData} 
        getRowLink={getRowLink}
        currentPage={currentPage}
        totalPages={data?.totalPages || 1}
        totalCount={data?.totalCount || 0}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        hasNextPage={data?.hasNextPage || false}
        hasPreviousPage={data?.hasPreviousPage || false}
      />
    </div>
  )
}