"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import THSarabunFont from "@/app/components/PDF/THSarabunFont";
import { GetGradBySubjectId } from "@/dto/gradDto";

interface DataList {
  grads?: GetGradBySubjectId[];
  studentGroup: string;
  subjectName:string | undefined;
  subjectId:string | undefined;
}

const GenSubjectScore = ({ grads ,studentGroup,subjectId,subjectName}: DataList) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  doc.addFileToVFS("THSarabun.ttf", THSarabunFont);

  doc.addFont("THSarabun.ttf", "THSarabun", "normal");
  doc.addFont("THSarabun.ttf", "THSarabunB", "bold");
  doc.setFont("THSarabun");

  doc.setFontSize(16);
  doc.text(`รายชื่อนักเรียน กลุ่มเรียน ${studentGroup}`, 36, 10, { align: "center" });
  doc.setFontSize(16);
  doc.text(`รหัสวิชา ${subjectId} วิชา ${subjectName}`, 100, 10, { align: "center" });
  doc.setFontSize(12);

  doc.line(4, 4, 4, 291);
  doc.line(205, 4, 205, 291);
  doc.line(4, 4, 205, 4);
  doc.line(205, 291, 4, 291);

  doc.line(4, 12, 205, 12);

  autoTable(doc, {
    startY: 12,
    body: [
      [
        "ลำดับ",
        "รหัสนักศึกษา",
        `   ชื่อ - นามสกุล   `,
        "คะแนนเก็บ",
        "คะแนนสอบ",
        "จิตพิสัย",
        "รวม",
        "หมายเหตุ",
      ],
    ],
    alternateRowStyles: { fillColor: [255, 255, 255] },
    styles: {
      font: "THSarabun",
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
      3: { cellWidth: 18 },
      4: { cellWidth: 18 },
      5: { cellWidth: 18 },
      6: { cellWidth: 16 },
      7: { cellWidth: 31 },
    },
    margin: { left: 4, right: 0 },
  });
  let n = 0;
  if (grads) {
    for (let i = 0; i < grads.length; i++) {
      autoTable(doc, {
        startY: 19 + n,
        body: [
          [
            i + 1,
            grads[i].studentCode,
            `${grads[i].firstName}`,
            `${grads[i].lastName}`,
            `${grads[i].collectScore}`,
            `${grads[i].affectiveScore}`,
            `${grads[i].testScore}`,
            `${grads[i].totalScore}`,
            "",
          ],
        ],
        alternateRowStyles: { fillColor: [255, 255, 255] },
        styles: {
          font: "THSarabun",
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
          2: {
            cellWidth: 30,
            halign: "left",
            lineWidth: { right: 0, top: 0.2, bottom: 0.2, left: 0.2 },
            cellPadding: { left: 5, right: 0, top: 1, bottom: 1 },
          },
          3: {
            cellWidth: 30,
            halign: "left",
            lineWidth: { right: 0.2, left: 0, top: 0.2, bottom: 0.2 },
            cellPadding: { left: 0, right: 0, top: 1, bottom: 1 },
          },
          4: { cellWidth: 18 },
          5: { cellWidth: 18 },
          6: { cellWidth: 18 },
          7: { cellWidth: 16 },
          8: { cellWidth: 31 },
        },
        margin: { left: 4, right: 0 },
      });
      n += 7;
    }
  }

  doc.save(`ใบคะแนนวิชา${subjectName} กลุ่มเรียน ${studentGroup}.pdf`);
};
export default GenSubjectScore;
