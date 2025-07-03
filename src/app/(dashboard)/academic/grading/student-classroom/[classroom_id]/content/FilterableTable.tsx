
'use client';

import React, { useState, useMemo } from 'react';
import GradeSubjectSearchBar from './GradeSubjectSearchBar';

import { DataTable } from '@/components/common/MainTable/table_style_1'; // Replace with actual import

export const columns = [
  { label: "ลำดับ", key: "index", className: "w-1/12 text-center" },
  { label: "รหัสวิชา", key: "id", className: "w-1/4" },
  { label: "ชื่อวิชา", key: "name", className: "w-1/4" },
  { label: "อาจารย์", key: "teacher", className: "w-1/4" },
  { label: "สถานะ", key: "status", className: "w-1/4" },
];

const mockData = [
  { id: '000101', name: 'ภาษาไทยพื้นฐาน', teacher: 'อาจารย์ กนกพร ชัยภูมิ', status: 'การประเมินเสร็จสิ้น' },
  { id: '000102', name: 'คณิตศาสตร์พื้นฐาน', teacher: 'อาจารย์ สุชาติ แสงเพชร', status: 'ยังไม่ได้ประเมิน' },
  { id: '000103', name: 'วิทยาศาสตร์ทั่วไป', teacher: 'อาจารย์ อรอุมา หาญกล้า', status: 'การประเมินยังไม่สมบูรณ์' },
  { id: '000104', name: 'ภาษาอังกฤษเพื่อการสื่อสาร', teacher: 'อาจารย์ รุจิรา นามทอง', status: 'การประเมินเสร็จสิ้น' },
  { id: '000105', name: 'ประวัติศาสตร์ไทย', teacher: 'อาจารย์ ธงชัย สมจิต', status: 'ยังไม่ได้ประเมิน' },
  { id: '000106', name: 'สุขศึกษาและพลศึกษา', teacher: 'อาจารย์ จักรพันธ์ พรหมเทพ', status: 'การประเมินเสร็จสิ้น' },
  { id: '000107', name: 'ทักษะชีวิต', teacher: 'อาจารย์ มยุรี ลิ้มวัฒนากุล', status: 'การประเมินยังไม่สมบูรณ์' },
  { id: '000108', name: 'คอมพิวเตอร์เบื้องต้น', teacher: 'อาจารย์ วิทวัส เลิศวงศ์', status: 'การประเมินเสร็จสิ้น' },
  { id: '000109', name: 'การงานอาชีพและเทคโนโลยี', teacher: 'อาจารย์ ปัญญา สินเพิ่ม', status: 'ยังไม่ได้ประเมิน' },
  { id: '000110', name: 'เศรษฐศาสตร์เบื้องต้น', teacher: 'อาจารย์ นารีนาถ วงศ์คำ', status: 'การประเมินยังไม่สมบูรณ์' }
];


interface Props {
  classroomId: string;
}

export default function FilterableTable({ classroomId }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return mockData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(term)
      )
    );
  }, [searchTerm]);

  return (
    <>
    <div className='flex justify-end px-10'>

      <GradeSubjectSearchBar onChange={setSearchTerm} />
    </div>
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={filteredData.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          pagination={10}
        />
      </div>
    </>
  );
}
