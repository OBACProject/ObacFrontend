'use client';

import { BookText } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import GradeSubjectForm from '../student-subject/Form';

const mockSubjects = [
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

const columns = [
  { key: 'code_subject', label: 'รหัสวิชา' },
  { key: 'name_subject', label: 'ชื่อรายวิชา' },
  { key: 'teacher', label: 'อาจารย์ผู้สอน' }, 
  { key: 'status_graded', label: 'สถานะการออกเกรด'}
];

export default function GradeSubjectPage() {
  const params = useSearchParams();
  const level = params.get('level') || '';
  const year = params.get('year') || '';
  const semester = params.get('semester') || '';
  const room = params.get('room') || '';

  const headerText = `รายชื่อประเมินผลการเรียน : ${level} ปี ${year} ภาคเรียน ${semester} ห้อง ${room}`;

  return (
    <main className="p-6">
      <div className="flex items-center py-5 justify-start px-10">
        <h1 className="px-10 py-2 rounded-3xl text-xl w-fit border border-gray-100 shadow-md text-blue-700 flex gap-2 items-center">
          <BookText className="w-8 h-8" />
          {headerText}
        </h1>
      </div>

      <GradeSubjectForm columns={columns} data={mockSubjects} />
    </main>
  );
}