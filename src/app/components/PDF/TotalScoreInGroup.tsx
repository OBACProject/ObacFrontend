"use client";
import jsPDF from "jspdf";
import THSarabunFont from "../font/THSarabunFont";
import THSarabunFontBold from "../font/THSarabunBold";
import autoTable from "jspdf-autotable";
import {
  GeneralData,
  StudentList,
} from "@/app/pages/academic/score/management/classroom/[...params]/page";

export interface DataList {
  generalData: GeneralData;
  studentList: StudentList[];
}

export default function TotalScoreInGroup(data: DataList) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });
  doc.addFileToVFS("THSarabun.ttf", THSarabunFont);
  doc.addFont("THSarabun.ttf", "THSarabun", "normal");

  doc.addFileToVFS("THSarabunBold.ttf", THSarabunFontBold);
  doc.addFont("THSarabunBold.ttf", "THSarabunBold", "normal");

  doc.setFont("THSarabun");

  const dateTime = new Date();
  const thaiMonths = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const day = dateTime.getDate().toString().padStart(2, "0");
  const month = thaiMonths[dateTime.getMonth()];
  const year = dateTime.getFullYear() + 543;

  const formattedDate = `วันที่พิมพ์ ${day} ${month} ${year}`;

  doc.text(formattedDate, 10, 15);

  doc.setFont("THSarabunBold");
  doc.text("วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ", 100, 15);
  doc.text(
    `สรุปเกรดนักศึกษา ภาคเรียนที่ ${data.generalData.term} ปีการศึกษา ${year} ห้อง ${data.generalData.class}.${data.generalData.groupName}`,
    10,
    25
  );
  const header = [
    "ลำดับ",
    "รหัสนักศึกษา",
    `   ชื่อ - นามสกุล   `,
    "เฉลี่ย",
    "เฉลี่ยสะสม",
  ];

  autoTable(doc, {
    startY: 28,
    body: [
      [
        "ลำดับ",
        "รหัสนักศึกษา",
        `   ชื่อ - นามสกุล   `,
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "เฉลี่ย",
        "เฉลี่ยสะสม",
      ],
    ],
    alternateRowStyles: { fillColor: [255, 255, 255] },
    styles: {
      font: "THSarabunBold",
      fontSize: 12,
      cellPadding: 1,
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 20 },
      2: { cellWidth: 53 },
      3: { cellWidth: 8 },
      4: { cellWidth: 8 },
      5: { cellWidth: 8 },
      6: { cellWidth: 8 },
      7: { cellWidth: 8 },
      8: { cellWidth: 8 },
      9: { cellWidth: 8 },
      10: { cellWidth: 8 },
      11: { cellWidth: 8 },
      12: { cellWidth: 8 },
      13: { cellWidth: 13 },
      14: {
        cellWidth: 13,
        cellPadding: { left: 0, right: 0, top: 1, bottom: 1 },
      },
    },
    margin: { left: 10, right: 0 },
  });

  let y2 = doc.lastAutoTable.finalY;

  data.studentList.forEach((student, index) => {
    const { studentCode, name, gpa, gpax, subjects } = student;
    const subjectGrades = Object.values(subjects || {});

    const subjectsWithGrades = [
      ...subjectGrades.map((grade) => (grade ? grade : "0")),
      ...Array(10 - subjectGrades.length).fill("-"),
    ];

    autoTable(doc, {
      startY: y2,
      body: [
        [
          `${index + 1}`,
          studentCode,
          name,
          ...subjectsWithGrades.slice(0, 10),
          gpa.toFixed(2),
          gpax.toFixed(2),
        ],
      ],
      alternateRowStyles: { fillColor: [255, 255, 255] },
      styles: {
        font: "THSarabun",
        fontSize: 12,
        cellPadding: 1,
        halign: "center",
        valign: "middle",
        lineColor: [0, 0, 0],
        lineWidth: 0.2,
      },
      bodyStyles: {
        textColor: [0, 0, 0],
      },
      columnStyles: {
        0: { cellWidth: 10 },
        1: {
          cellWidth: 20,
          halign: "left",
          cellPadding: { left: 3, right: 0, top: 1, bottom: 1 },
        },
        2: {
          cellWidth: 53,
          halign: "left",
          cellPadding: { left: 3, right: 0, top: 1, bottom: 1 },
        },
        3: { cellWidth: 8 },
        4: { cellWidth: 8 },
        5: { cellWidth: 8 },
        6: { cellWidth: 8 },
        7: { cellWidth: 8 },
        8: { cellWidth: 8 },
        9: { cellWidth: 8 },
        10: { cellWidth: 8 },
        11: { cellWidth: 8 },
        12: { cellWidth: 8 },
        13: { cellWidth: 13 },
        14: { cellWidth: 13 },
      },
      margin: { left: 10, right: 0 },
    });

    y2 = doc.lastAutoTable.finalY;
    if (y2 >= 280) {
      y2 = 14;
      doc.addPage();
    }
  });

  doc.setFont("THSarabun");
  doc.save(
    `ใบคะแนนรวมของห้อง ${data.generalData.class}-${data.generalData.groupName}.pdf`
  );
}
