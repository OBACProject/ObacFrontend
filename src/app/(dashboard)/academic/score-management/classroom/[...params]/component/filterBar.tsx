import { Combobox } from "@/components/common/Combobox/combobox"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useMemo } from "react"

export interface FilterState {
  searchInput: string
  selectedGradeFilter: string
  selectedSubjectFilter: string
}

interface FilterBarProps {
  filters: FilterState
  subjects: string[]
  onFilterChange: (filters: Partial<FilterState>) => void
  onClearFilters: () => void
  debouncedSearchInput: string
}

export function FilterBar({
  filters,
  subjects,
  onFilterChange,
  onClearFilters,
  debouncedSearchInput,
}: FilterBarProps) {
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
      subjects,
    }
  }, [subjects])

  const hasActiveFilters = !!(filters.selectedGradeFilter || filters.selectedSubjectFilter || debouncedSearchInput)

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">ตัวกรองข้อมูล</h3>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
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
                  filters.selectedGradeFilter
                    ? filterOptions.gradeRanges.find(g => g.value === filters.selectedGradeFilter)?.label || "เลือกช่วงเกรด"
                    : "เลือกช่วงเกรด"
                }
                onSelect={(value) => onFilterChange({ selectedGradeFilter: value })}
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
                buttonLabel={filters.selectedSubjectFilter || "เลือกวิชาที่ไม่ผ่าน"}
                onSelect={(value) => onFilterChange({ selectedSubjectFilter: value })}
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
                  value={filters.searchInput}
                  onChange={(e) => onFilterChange({ searchInput: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <span className="text-sm text-gray-600">ตัวกรองที่ใช้:</span>
              {filters.selectedGradeFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  เกรด: {filterOptions.gradeRanges.find(g => g.value === filters.selectedGradeFilter)?.label}
                  <button
                    onClick={() => onFilterChange({ selectedGradeFilter: "" })}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.selectedSubjectFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  วิชาไม่ผ่าน: {filters.selectedSubjectFilter}
                  <button
                    onClick={() => onFilterChange({ selectedSubjectFilter: "" })}
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
                    onClick={() => onFilterChange({ searchInput: "" })}
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
    </div>
  )
}