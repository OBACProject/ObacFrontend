"use client"

import type React from "react"

import { Combobox } from "@/components/common/Combobox/combobox"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { TableSkeleton } from "./component/skeletons/TableSkeleton"
import { useGetAllStudentsQuery } from "@/lib/api/hooks/queries/student.queries"
import { StyledServerPaginatedDataTable } from "@/components/Academic/table/PaginationTable"

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


  const [filterOptions, setFilterOptions] = useState<{
    classLevels: string[]
    uniqueFaculties: string[]
  }>({ classLevels: [], uniqueFaculties: [] })

  const debouncedSearchInput = useDebounce(searchInput, 500)
  

  const { data: allStudentsData, isLoading: isLoadingFilterOptions, isError } = useGetAllStudentsQuery({
    pageNumber: 1,
    pageSize: 10000,
    searchText: undefined,
    sortBy: undefined,
    Ascending: true,
  })

  useEffect(() => {
    if (allStudentsData?.items) {
      const classLevels = Array.from(new Set(
        allStudentsData.items
          .map((student) => `${student.class}.${student.groupName}`)
          .filter((classGroup) => classGroup && classGroup.trim() !== "" && !classGroup.includes("undefined") && !classGroup.includes("null"))
      )).sort((a, b) => {
        const [classA, groupA] = a.split('.')
        const [classB, groupB] = b.split('.')
        
        const getClassInfo = (classStr: string) => {
          if (classStr.includes('ปวช')) {
            const levelMatch = classStr.match(/ปวช\.?(\d+)/)
            return { 
              type: 'ปวช', 
              level: levelMatch ? parseInt(levelMatch[1]) : 0,
              fullClass: classStr
            }
          } else if (classStr.includes('ปวส')) {
            const levelMatch = classStr.match(/ปวส\.?(\d+)/)
            return { 
              type: 'ปวส', 
              level: levelMatch ? parseInt(levelMatch[1]) : 0,
              fullClass: classStr
            }
          }
          return { type: 'other', level: 0, fullClass: classStr }
        }
        
        const infoA = getClassInfo(classA)
        const infoB = getClassInfo(classB)
        
        if (infoA.type !== infoB.type) {
          if (infoA.type === 'ปวช' && infoB.type === 'ปวส') return -1
          if (infoA.type === 'ปวส' && infoB.type === 'ปวช') return 1
          return infoA.type.localeCompare(infoB.type)
        }
        
        if (infoA.level !== infoB.level) {
          return infoA.level - infoB.level
        }
        
        const parseGroupName = (groupStr: string) => {
          if (groupStr.includes('/')) {
            const [main, sub] = groupStr.split('/')
            return {
              main: parseInt(main) || 0,
              sub: parseInt(sub) || 0,
              original: groupStr
            }
          }
          const num = parseInt(groupStr)
          return {
            main: isNaN(num) ? 0 : num,
            sub: 0,
            original: groupStr
          }
        }
        
        const groupInfoA = parseGroupName(groupA)
        const groupInfoB = parseGroupName(groupB)
        
        // Sort by main group number first
        if (groupInfoA.main !== groupInfoB.main) {
          return groupInfoA.main - groupInfoB.main
        }
        
        // Then sort by sub group number
        if (groupInfoA.sub !== groupInfoB.sub) {
          return groupInfoA.sub - groupInfoB.sub
        }
        
        // Finally, sort alphabetically if all else is equal
        return groupInfoA.original.localeCompare(groupInfoB.original)
      })
      
      const uniqueFaculties = Array.from(new Set(
        allStudentsData.items
          .map((student) => student.facultyName)
          .filter((faculty) => faculty && faculty.trim() !== "")
      )).sort()
      
      setFilterOptions({ classLevels, uniqueFaculties })
    }
  }, [allStudentsData?.items])

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [debouncedSearchInput, selectedClassLevel, selectedFaculty]) // Reset to page 1 when filters change

  // Client-side filtering and sorting
  const filteredAndSortedData = useMemo(() => {
    if (!allStudentsData?.items) return { items: [], totalCount: 0 }

    let filteredItems = [...allStudentsData.items]

    // Apply search filters
    if (debouncedSearchInput) {
      filteredItems = filteredItems.filter(student => 
        student.studentCode?.toLowerCase().includes(debouncedSearchInput.toLowerCase()) ||
        `${student.prefix}${student.name} ${student.lastName}`.toLowerCase().includes(debouncedSearchInput.toLowerCase())
      )
    }

    if (selectedClassLevel) {
      const [classLevel, groupName] = selectedClassLevel.split('.')
      if (classLevel && groupName) {
        filteredItems = filteredItems.filter(student => 
          student.class === classLevel && student.groupName === groupName
        )
      }
    }

    if (selectedFaculty) {
      filteredItems = filteredItems.filter(student => 
        student.facultyName === selectedFaculty
      )
    }

    // Sort the filtered items
    filteredItems.sort((a, b) => {
      const getClassInfo = (classStr: string | null | undefined) => {
        if (!classStr) return { type: 'other', level: 999 }
        
        if (classStr.includes('ปวช')) {
          const levelMatch = classStr.match(/ปวช\.?(\d+)/)
          return { 
            type: 'ปวช', 
            level: levelMatch ? parseInt(levelMatch[1]) : 0,
          }
        } else if (classStr.includes('ปวส')) {
          const levelMatch = classStr.match(/ปวส\.?(\d+)/)
          return { 
            type: 'ปวส', 
            level: levelMatch ? parseInt(levelMatch[1]) : 0,
          }
        }
        return { type: 'other', level: 0 }
      }
      
      const infoA = getClassInfo(a.class)
      const infoB = getClassInfo(b.class)
      
      // Sort by education type first (ปวช before ปวส)
      if (infoA.type !== infoB.type) {
        if (infoA.type === 'ปวช' && infoB.type === 'ปวส') return -1
        if (infoA.type === 'ปวส' && infoB.type === 'ปวช') return 1
        if (infoA.type === 'other') return 1
        if (infoB.type === 'other') return -1
        return infoA.type.localeCompare(infoB.type)
      }
      
      // If same education type, sort by level
      if (infoA.level !== infoB.level) {
        return infoA.level - infoB.level
      }
      
      // Handle group names with slashes
      const parseGroupName = (groupStr: string | null | undefined) => {
        if (!groupStr) {
          return { main: 999, sub: 999, original: '' }
        }
        
        if (groupStr.includes('/')) {
          const [main, sub] = groupStr.split('/')
          return {
            main: parseInt(main) || 0,
            sub: parseInt(sub) || 0,
            original: groupStr
          }
        }
        const num = parseInt(groupStr)
        return {
          main: isNaN(num) ? 999 : num,
          sub: 0,
          original: groupStr
        }
      }
      
      const groupInfoA = parseGroupName(a.groupName)
      const groupInfoB = parseGroupName(b.groupName)
      
      if (groupInfoA.main !== groupInfoB.main) {
        return groupInfoA.main - groupInfoB.main
      }
      
      if (groupInfoA.sub !== groupInfoB.sub) {
        return groupInfoA.sub - groupInfoB.sub
      }
      
      return (a.studentCode || '').localeCompare(b.studentCode || '')
    })

    return {
      items: filteredItems,
      totalCount: filteredItems.length
    }
  }, [allStudentsData?.items, debouncedSearchInput, selectedClassLevel, selectedFaculty])

  // Pagination logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedItems = filteredAndSortedData.items.slice(startIndex, endIndex)
    
    return {
      items: paginatedItems,
      totalCount: filteredAndSortedData.totalCount,
      totalPages: Math.ceil(filteredAndSortedData.totalCount / pageSize),
      pageNumber: currentPage,
      hasNextPage: endIndex < filteredAndSortedData.totalCount,
      hasPreviousPage: currentPage > 1
    }
  }, [filteredAndSortedData, currentPage, pageSize])

  const columns = [
    { label: "ลำดับ", key: "index", className: "w-2/16" },
    { label: "รหัสนักเรียน", key: "studentCode", className: "w-2/16" },
    {
      label: "ชื่อ - นามสกุล",
      key: "fullName",
      className: "w-6/16",
      render: (item: any) => `${item.prefix}${item.name} ${item.lastName}`,
    },
    { label: "ระดับชั้น", key: "class", className: "w-2/16" ,
      render: (item : any) => `${item.class}.${item.groupName}`
    },
    {
      label: "หลักสูตรการศึกษา",
      key: "facultyName",
      className: "w-4/16 text-start line-clamp-1",
    },
  ]

  const tableData = useMemo(() => {
    return paginatedData.items.map((item: any, index: number) => ({
      ...item,
      index: (currentPage - 1) * pageSize + index + 1,
      fullName: `${item.prefix || ''}${item.name || ''} ${item.lastName || ''}`,
    }))
  }, [paginatedData.items, currentPage, pageSize]) 

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

  if (isLoadingFilterOptions) {
    return <TableSkeleton rows={8} columns={5} />
  }

  if (isError) {
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
              <label className="block text-sm font-medium text-gray-700 mb-2">ระดับชั้น/กลุ่มเรียน</label>
              <Combobox
                options={[
                  { value: "", label: "ทั้งหมด" },
                  ...filterOptions.classLevels.map((classData) => ({
                    value: classData,
                    label: classData,
                  })),
                ]}
                buttonLabel={selectedClassLevel || (isLoadingFilterOptions ? "กำลังโหลด..." : "เลือกระดับชั้น/กลุ่มเรียน")}
                onSelect={handleClassLevelChange}
                disabled={isLoadingFilterOptions}
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
                buttonLabel={selectedFaculty || (isLoadingFilterOptions ? "กำลังโหลด..." : "เลือกหลักสูตรการศึกษา")}
                onSelect={handleFacultyChange}
                disabled={isLoadingFilterOptions}
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
          แสดง {paginatedData.items.length} จาก {paginatedData.totalCount} รายการ
          {paginatedData.totalCount > 0 && ` (หน้า ${paginatedData.pageNumber} จาก ${paginatedData.totalPages})`}
        </span>
        {isLoadingFilterOptions && <span className="text-blue-600 text-sm">กำลังโหลด...</span>}
      </div>
      <StyledServerPaginatedDataTable
      title="รายชื่อนักเรียน"
      icon={<Search className="h-5 w-5 text-gray-500" />}
        columns={columns}
        data={tableData}
        getRowLink={getRowLink}
        currentPage={currentPage}
        totalPages={paginatedData.totalPages}
        totalCount={paginatedData.totalCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        hasNextPage={paginatedData.hasNextPage}
        hasPreviousPage={paginatedData.hasPreviousPage}
      />
    </div>
  )
}
