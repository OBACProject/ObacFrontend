"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import THSarabunFont from "../../Font/THSarabunFont";
import THSarabunFontBold from "../../Font/THSarabunBold";
import { StudentNameListInSubject } from "@/dto/pdfDto";

interface DataList {
  data: StudentNameListInSubject;
}

const StudentNameInSubject = ({ data }: DataList) => {
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
  doc.text(`รายชื่อนักเรียน กลุ่มเรียน ${data.groupName}`, 36, 10, {
    align: "center",
  });
  doc.text(`รหัสวิชา ${data.subjectID} วิชา ${data.subjectName}`, 120, 10, {
    align: "center",
  });
  doc.setFontSize(12);

  doc.line(4, 4, 4, 291);
  doc.line(205, 4, 205, 291);
  doc.line(4, 4, 205, 4);
  doc.line(205, 291, 4, 291);

  doc.line(4, 12, 205, 12);

  autoTable(doc, {
    startY: 12,
    body: [["ลำดับ", "รหัสนักศึกษา", `   ชื่อ - นามสกุล   `, "", "หมายเหตุ"]],
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
      3: { cellWidth: 70 },
      4: { cellWidth: 31 },
    },
    margin: { left: 4, right: 0 },
  });
  doc.setFont("THSarabun");
  let y2 = doc.lastAutoTable.finalY;
  let n = 0;
  const students = data.students;
  if (students) {
    for (let i = 0; i < students.length; i++) {
      autoTable(doc, {
        startY: y2,
        body: [
          [
            i + 1,
            students[i].studentCode,
            `${students[i].prefix} ${students[i].studentFirstName}`,
            `${students[i].studentLastName}`,
            "",
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
          1: { cellWidth: 30, halign: "center" },
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
          4: { cellWidth: 70 },
          5: { cellWidth: 31 },
        },
        margin: { left: 4, right: 0 },
      });
      y2 += 7;
      if (y2 >= 280) {
        y2 = 14;
      }
    }
  }
  doc.save(`ใบรายชื่อวิชา ${data.subjectName} ${data.groupName}.pdf`);
};
export default StudentNameInSubject;
