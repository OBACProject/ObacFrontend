"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import THSarabunFont from "../../Font/THSarabunFont";
import THSarabunFontBold from "../../Font/THSarabunBold";
import { StudentGroupResponse } from "@/dto/studentGroupItem";

interface DataProps {
  data: StudentGroupResponse[];
  year: number;
  classGroup: string;
  level: number;
}

const BulkStudentNameListInLevelPDF = ({
  data,
  year,
  classGroup,
  level,
}: DataProps) => {
  if (!data?.length) return;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  doc.addFileToVFS("THSarabun.ttf", THSarabunFont);
  doc.addFont("THSarabun.ttf", "THSarabun", "normal");
  doc.addFileToVFS("THSarabunBold.ttf", THSarabunFontBold);
  doc.addFont("THSarabunBold.ttf", "THSarabunBold", "normal");

  for (let i = 0; i < data.length; i++) {
    const group = data[i];

    // Header
    doc.setFont("THSarabunBold");
    doc.setFontSize(20);
    doc.text("วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ", 105, 10, {
      align: "center",
    });

    doc.setFont("THSarabun");
    doc.setFontSize(16);
    doc.text(
      `รายชื่อนักศึกษา ห้อง ${group["class"]}.${group.groupName}     ประจำปีการศึกษา ${year}    แผนก.....................................................`,
      105,
      18,
      { align: "center" }
    );
    doc.text(
      `นักศึกษามาสอบ.........คน   ขาดสอบ.........คน    รหัส.......................ชื่อวิชา................................................................................................`,
      105,
      24,
      { align: "center" }
    );

    const rows = (group.students ?? []).map((s, idx) => [
      idx + 1,
      s.studentCode,
      `${s.prefix} ${s.firstName} ${s.lastName}`,
      "",
      "",
    ]);

    autoTable(doc, {
      startY: 27,
      head: [
        ["ลำดับ", "รหัสนักศึกษา", "ชื่อ - นามสกุล", "ลายเซ็น", "หมายเหตุ"],
      ],
      body: rows,
      styles: {
        font: "THSarabun",
        fontSize: 12,
        cellPadding: 0.8,
        halign: "center",
        valign: "middle",
        lineColor: [0, 0, 0],
        lineWidth: 0.2,
      },
      headStyles: {
        font: "THSarabunBold",
        fontSize: 14,
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: { textColor: [0, 0, 0] },
      margin: { left: 7, right: 7 },
      columnStyles: {
        0: { cellWidth: 12 },
        1: { cellWidth: 30, halign: "center" },
        2: {
          cellWidth: 80,
          halign: "left",
          cellPadding: { left: 4, right: 2, top: 0.8, bottom: 0.8 },
        },
        3: { cellWidth: 56 },
        4: { cellWidth: 18 },
      },
      theme: "grid",

      didDrawPage: () => {
        doc.setFont("THSarabun");
      },
    });

    let y = (doc as any).lastAutoTable?.finalY ?? 27;
    if (y + 25 > 287) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("THSarabun");
    doc.setFontSize(16);
    doc.text(
      "ลงชื่อ.............................................",
      58,
      y + 10,
      { align: "center" }
    );
    doc.text("(.............................................)", 61, y + 16, {
      align: "center",
    });
    doc.text("กรรมการคุมสอบ", 61, y + 23, { align: "center" });

    doc.text(
      "ลงชื่อ.............................................",
      147,
      y + 10,
      { align: "center" }
    );
    doc.text("(.............................................)", 150, y + 16, {
      align: "center",
    });
    doc.text("กรรมการคุมสอบ", 150, y + 23, { align: "center" });

    if (i < data.length - 1) doc.addPage();
  }

  doc.save(`ใบรายชื่อ ${classGroup}.${level}.pdf`);
};

export default BulkStudentNameListInLevelPDF;
