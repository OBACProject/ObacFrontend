'use client';

import React from 'react';
import { BookText } from 'lucide-react';
import GradRoomsForm from '../student-room/Form';

const columns = [
  { key: 'level', label: 'สาขา' },
  { key: 'years', label: 'ปีการศึกษา' },
  { key: 'semester', label: 'ภาคเรียน' }, 
  { key: 'room', label: 'ห้อง' },
  { key: 'status', label: 'การตรวจคะแนน' },
  { key: 'show', label: 'เผยแพร่เกรด' }
];

const data = [
  { level: 'ปวส.', years: '2567', semester: '1', room: 'ห้อง 1/1', status: 'การประเมินเสร็จสิ้น', show: false },
  { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 1/2', status: 'ยังไม่มีการประเมิน', show: false },
  { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 1/3', status: 'การประเมินยังไม่เสร็จสมบูรณ์', show: false },
  { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 1/4', status: 'แสดงเกรด', show: true },
  { level: 'ปวส.', years: '2567', semester: '1', room: 'ห้อง 2/1', status: 'แสดงเกรด', show: true },
  { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 2/2', status: 'ยังไม่มีการประเมิน', show: false },
  { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 2/3', status: 'การประเมินเสร็จสิ้น', show: false },
  { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 2/4', status: 'การประเมินยังไม่เสร็จสมบูรณ์', show: false },
  { level: 'ปวส.', years: '2567', semester: '1', room: 'ห้อง 3/1', status: 'การประเมินยังไม่เสร็จสมบูรณ์', show: false },
  { level: 'ปวช.', years: '2568', semester: '2', room: 'ห้อง 3/2', status: 'แสดงเกรด', show: true },
  { level: 'ปวช.', years: '2568', semester: '2', room: 'ห้อง 3/3', status: 'การประเมินเสร็จสิ้น', show: false },
  { level: 'ปวช.', years: '2568', semester: '2', room: 'ห้อง 3/4', status: 'ยังไม่มีการประเมิน', show: false },
  { level: 'ปวส.', years: '2568', semester: '2', room: 'ห้อง 4/1', status: 'แสดงเกรด', show: true },
  { level: 'ปวช.', years: '2568', semester: '2', room: 'ห้อง 4/2', status: 'ยังไม่มีการประเมิน', show: false },
  { level: 'ปวช.', years: '2568', semester: '2', room: 'ห้อง 4/3', status: 'การประเมินเสร็จสิ้น', show: false },
  { level: 'ปวช.', years: '2568', semester: '2', room: 'ห้อง 4/4', status: 'การประเมินยังไม่เสร็จสมบูรณ์', show: false },
  { level: 'ปวส.', years: '2568', semester: '2', room: 'ห้อง 5/1', status: 'การประเมินเสร็จสิ้น', show: false },
  { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 5/2', status: 'แสดงเกรด', show: true },
  { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 5/3', status: 'ยังไม่มีการประเมิน', show: false },
  { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 5/4', status: 'แสดงเกรด', show: true }
];




export default function GradsRoomPage() {
  return (
    <main className="p-6">
      <div className="flex items-center py-5 justify-start px-10">
        <h1 className="px-10 py-2 rounded-3xl text-xl w-fit border border-gray-100 shadow-md text-blue-700 flex gap-2 items-center">
          <BookText className="w-8 h-8" />
          ประเมินผลการเรียน
        </h1>
      </div>

      <GradRoomsForm columns={columns} data={data} />
    </main>
  );
}




// 'use client';

// import React from 'react';
// import { BookText } from 'lucide-react';
// import GradRoomsForm from '../student-room/Form';
// import { DataTable } from '@/components/common/MainTable/table_style_1';
// import GradeToggleButton from '../components/ToggleButton';


// const columns = [
//   { label: "สาขา", key: "level", className: "w-2/12 justify-center" },
//   { label: "ปีการศึกษา", key: "years", className: "w-2/12" },
//   { label: "ภาคเรียน", key: "semester", className: "w-2/12" },
//   { label: "ห้อง", key: "room", className: "w-2/12" },
//   { label: "สถานะการประเมิน", key: "status", className: "w-3/12" },
//   {
//     label: "เผยแพร่เกรด",
//     key: "isPublish",
//     className: "w-1/12 justify-center",
//     render: (row: any) => (
//       <GradeToggleButton
//         isOn={row.isPublish}
//         disabled={
//           row.status === 'การประเมินยังไม่เสร็จสมบูรณ์' ||
//           row.status === 'ยังไม่มีการประเมิน'
//         }
//         className={
//           row.status === 'การประเมินยังไม่เสร็จสมบูรณ์' ||
//           row.status === 'ยังไม่มีการประเมิน'
//             ? 'opacity-50 pointer-events-none'
//             : ''
//         }
//       />
//     ),
//   },
// ];
// const data = [
//   { level: 'ปวส.', years: '2567', semester: '1', room: 'ห้อง 1/1', status: 'การประเมินเสร็จสิ้น', show: false },
//   { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 1/2', status: 'ยังไม่มีการประเมิน', show: false },
//   { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 1/3', status: 'การประเมินยังไม่เสร็จสมบูรณ์', show: false },
//   { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 1/4', status: 'แสดงเกรด', show: true },
//   { level: 'ปวส.', years: '2567', semester: '1', room: 'ห้อง 2/1', status: 'แสดงเกรด', show: true },
//   { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 2/2', status: 'ยังไม่มีการประเมิน', show: false },
//   { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 2/3', status: 'การประเมินเสร็จสิ้น', show: false },
//   { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 2/4', status: 'การประเมินยังไม่เสร็จสมบูรณ์', show: false },
//   { level: 'ปวส.', years: '2567', semester: '1', room: 'ห้อง 3/1', status: 'การประเมินยังไม่เสร็จสมบูรณ์', show: false },
//   { level: 'ปวช.', years: '2568', semester: '2', room: 'ห้อง 3/2', status: 'แสดงเกรด', show: true },
//   { level: 'ปวช.', years: '2568', semester: '2', room: 'ห้อง 3/3', status: 'การประเมินเสร็จสิ้น', show: false },
//   { level: 'ปวช.', years: '2568', semester: '2', room: 'ห้อง 3/4', status: 'ยังไม่มีการประเมิน', show: false },
//   { level: 'ปวส.', years: '2568', semester: '2', room: 'ห้อง 4/1', status: 'แสดงเกรด', show: true },
//   { level: 'ปวช.', years: '2568', semester: '2', room: 'ห้อง 4/2', status: 'ยังไม่มีการประเมิน', show: false },
//   { level: 'ปวช.', years: '2568', semester: '2', room: 'ห้อง 4/3', status: 'การประเมินเสร็จสิ้น', show: false },
//   { level: 'ปวช.', years: '2568', semester: '2', room: 'ห้อง 4/4', status: 'การประเมินยังไม่เสร็จสมบูรณ์', show: false },
//   { level: 'ปวส.', years: '2568', semester: '2', room: 'ห้อง 5/1', status: 'การประเมินเสร็จสิ้น', show: false },
//   { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 5/2', status: 'แสดงเกรด', show: true },
//   { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 5/3', status: 'ยังไม่มีการประเมิน', show: false },
//   { level: 'ปวช.', years: '2567', semester: '1', room: 'ห้อง 5/4', status: 'แสดงเกรด', show: true }
// ];




// export default function GradsRoomPage() {
//   return (
//     <main className="p-6">
//       <div className="flex items-center py-5 justify-start px-10">
//         <h1 className="px-10 py-2 rounded-3xl text-xl w-fit border border-gray-100 shadow-md text-blue-700 flex gap-2 items-center">
//           <BookText className="w-8 h-8" />
//           ประเมินผลการเรียน
//         </h1>
//       </div>

//       {/* <GradRoomsForm columns={columns} data={data} /> */}
//      <DataTable
//         columns={columns}
//         data={data}
//         pagination={10}
//       />
//     </main>
//   );
// }


