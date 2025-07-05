'use client';

import React, { useState, useMemo, useDeferredValue, useEffect } from 'react';
import GradeSubjectSearchBar from './GradeSubjectSearchBar';
import { DataTable } from '@/components/common/MainTable/table_style_1';
import HeaderLabel from '@/components/common/labelText/HeaderLabel';
import { ScrollText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { Combobox } from '@/components/common/Combobox/combobox';

export const columns = [
  { label: "ลำดับ", key: "index", className: "w-1/12 flex px-10" },
  { label: "รหัสวิชา", key: "id", className: "w-1/4 flex px-10" },
  { label: "ชื่อวิชา", key: "name", className: "w-1/4 flex px-10" },
  { label: "อาจารย์", key: "teacher", className: "w-1/4 flex px-10" },
  { label: "สถานะ", key: "status", className: "w-1/4 flex px-10" },
];

const mockData = [
  { id: '000101', name: 'ภาษาไทยพื้นฐาน', teacher: 'อาจารย์ กนกพร ชัยภูมิ', status: 'ตรวจสอบเสร็จสิ้น' },
  { id: '000102', name: 'คณิตศาสตร์พื้นฐาน', teacher: 'อาจารย์ สุชาติ แสงเพชร',  status: 'ยังไม่ตรวจสอบ' },
  { id: '000103', name: 'วิทยาศาสตร์ทั่วไป', teacher: 'อาจารย์ อรอุมา หาญกล้า',  status: 'ยังไม่ตรวจสอบ' },
  { id: '000104', name: 'ภาษาอังกฤษ', teacher: 'อาจารย์ รุจิรา นามทอง',  status: 'ตรวจสอบเสร็จสิ้น' },
  { id: '000105', name: 'ประวัติศาสตร์', teacher: 'อาจารย์ ธงชัย สมจิต',  status: 'ยังไม่ตรวจสอบ' },
];

interface Props {
  classroomId: string;
}

export default function FilterableTable({ classroomId }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const deferredSearch = useDeferredValue(searchTerm);

  const allLevels = useMemo(() => Array.from(new Set(mockData.map((d) => d.teacher))), []);
  const allStatuses = useMemo(() => Array.from(new Set(mockData.map((d) => d.status))), []);

  const filteredData = useMemo(() => {
    return mockData
      .filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(deferredSearch.toLowerCase())
        )
      )
      .filter((item) =>
        (filterLevel ? item.teacher === filterLevel : true) &&
        (filterStatus ? item.status === filterStatus : true)
      );
  }, [deferredSearch, filterLevel, filterStatus]);

  useEffect(() => {
  if (!showAdvanced) {
    setFilterLevel('');
    setFilterStatus('');
  }
}, [showAdvanced]);

  return (
    <>
      <div className='flex px-10 w-full justify-between items-center'>
        <HeaderLabel
          Icon={<ScrollText className="w-8 h-8" />}
          title={`ตารางวิชาในห้องเรียน ปวส.${classroomId}/2`}
          className='text-blue'
        />
        <GradeSubjectSearchBar onChange={setSearchTerm} />
      </div>

      {/* Advanced Filters */}
      <div className="flex justify-end mb-3 px-12 mt-4 items-center gap-2 relative">
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="flex flex-row gap-2 items-center"
            >
              <Combobox
                options={allLevels.map((v) => ({ value: v, label: v }))}
                buttonLabel="อาจารย์"
                onSelect={setFilterLevel}
                defaultValue={filterLevel}
              />
              <Combobox
                options={allStatuses.map((v) => ({ value: v, label: v }))}
                buttonLabel="สถานะ"
                onSelect={setFilterStatus}
                defaultValue={filterStatus}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="whitespace-nowrap text-sm px-3 py-1.5"
        >
          {showAdvanced ? "ซ่อนตัวกรองเพิ่มเติม" : "ตัวกรองเพิ่มเติม"}
        </Button>
      </div>

      <div className="mt-6">
        <DataTable
          columns={columns}
          data={filteredData.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          getRowLink={(row) => `/academic/grading/student-classroom/${classroomId}/subject/${row.id}`}
          pagination={10}
        />
      </div>
    </>
  );
}
