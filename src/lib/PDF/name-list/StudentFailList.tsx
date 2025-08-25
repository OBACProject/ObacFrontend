"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import THSarabunFont from "../../Font/THSarabunFont";
import THSarabunFontBold from "../../Font/THSarabunBold";
import { GradBelowResponse } from "@/dto/gradDto";

interface DataList {
  student?: GradBelowResponse[];
  currentYear: number;
  classGroup: string;
}

const StudentFailListPDF = ({
  //รายชื่อนักเรียนที่มีผลการเรียนต่ำกว่าเกณฑ์   StudentsNotPassedList (student-notpassed)
  student,
  currentYear,
  classGroup,
}: DataList) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  doc.addFileToVFS("THSarabun.ttf", THSarabunFont);
  doc.addFont("THSarabun.ttf", "THSarabun", "normal");

  doc.addFileToVFS("THSarabunBold.ttf", THSarabunFontBold);
  doc.addFont("THSarabunBold.ttf", "THSarabunBold", "normal");

  doc.setFont("THSarabunBold");
  doc.setFontSize(14);
  doc.text(
    `รายชื่อนักเรียนไม่ผ่านเกณฑ์ ${classGroup} ปีการศึกษา ${currentYear}  เกรดเฉลี่ยไม่ถึง 1.75`,
    56,
    10,
    {
      align: "center",
    }
  );
  doc.setFontSize(12);

  doc.line(4, 12, 205, 12);

  autoTable(doc, {
    startY: 12,
    body: [
      [
        "ลำดับ",
        "รหัสนักศึกษา",
        `   ชื่อ - นามสกุล   `,
        "ห้อง",
        "เกรดเฉลี่ยสะสม",
        "หมายเหตุ",
      ],
    ],
    alternateRowStyles: { fillColor: [255, 255, 255] },
    styles: {
      font: "THSarabunBold",
      fontSize: 14,
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
      1: { cellWidth: 30 },
      2: { cellWidth: 60 },
      3: { cellWidth: 35 },
      4: { cellWidth: 31 },
      5: { cellWidth: 35 },
    },
    margin: { left: 4, right: 0 },
  });
  doc.setFont("THSarabun");
  let y2 = doc.lastAutoTable.finalY;
  let n = 0;
  if (student) {
    for (let i = 0; i < student.length; i++) {
      autoTable(doc, {
        startY: y2,
        body: [
          [
            i + 1,
            student[i].studentCode,
            `${student[i].prefix} ${student[i].firstName}`,
            `${student[i].lastName}`,
            `${student[i].class}.${student[i].groupName}`,
            `${student[i].gpa.toFixed(2)}`,
            "",
          ],
        ],
        alternateRowStyles: { fillColor: [255, 255, 255] },
        styles: {
          font: "THSarabun",
          fontSize: 12,
          cellPadding: 0.5,
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
          1: { cellWidth: 30, halign: "center" },
          2: {
            cellWidth: 30,
            halign: "left",
            lineWidth: { right: 0, top: 0.2, bottom: 0.2, left: 0.2 },
            cellPadding: { left: 5, right: 0, top: 0.5, bottom: 0.5 },
          },
          3: {
            cellWidth: 30,
            halign: "left",
            lineWidth: { right: 0.2, left: 0, top: 0.2, bottom: 0.2 },
            cellPadding: { left: 0, right: 0, top: 0.5, bottom: 0.5 },
          },
          4: { cellWidth: 35 },
          5: { cellWidth: 31 },
          6: { cellWidth: 35 },
        },
        margin: { left: 4, right: 0 },
      });
      y2 += 6;
      if (y2 >= 255) {
        doc.addPage();
        y2 = 14;
      }
    }
  }
  doc.save(`รายชื่อนักเรียนไม่ผ่านเกณฑ์ ${classGroup} ${currentYear}.pdf`);
};
export default StudentFailListPDF;
