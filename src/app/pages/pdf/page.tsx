"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import THSarabunFont from "./THSarabunFont";
import { useState } from "react";
const generatePDF = (score:string) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });
  // Add TH Sarabun Font
  doc.addFileToVFS("THSarabun.ttf", THSarabunFont);
  doc.addFont("THSarabun.ttf", "THSarabun", "normal");
  doc.setFont("THSarabun");

  // Header Section (aligned to your image)
  doc.setFontSize(14);
  doc.text("สถานะ รับ 2567 ปวช. การท่องเที่ยว", 105, 10, { align: "center" });
  doc.setFontSize(12);

  doc.text("รหัสสถานศึกษา: 1310100892", 10, 20);
  doc.text("จังหวัด: กรุงเทพมหานคร", 10, 25);
  doc.text("สาขาวิชา: การท่องเที่ยว", 10, 30);
  doc.text("วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ", 105, 25, { align: "center" });

  // Adding border lines for header
  doc.line(10, 32, 200, 32); // Horizontal line under header

  // Custom Table Layout
  autoTable(doc, {
    startY: 35,
    head: [
      ["รหัส", "รายวิชา", "หน่วยกิต", "หมายเหตุ"], // Table header
    ],
    body: [
      ["20000-1101", "ภาษาไทยเพื่อการสื่อสาร", "1", ],
      ["20000-1201", "ภาษาอังกฤษพื้นฐาน", "2", score],
      ["20000-1501", "คณิตศาสตร์พื้นฐาน", "2", score],
      ["20000-2001", "ประวัติศาสตร์เพื่อการท่องเที่ยว", "2", score],
    ],
    styles: {
      font: "THSarabun",
      fontSize: 12,
      cellPadding: 2,
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: [200, 200, 200],
      textColor: [0, 0, 0],
      fontStyle: "bold",
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 30 }, // รหัส width
      1: { cellWidth: 100 }, // รายวิชา width
      2: { cellWidth: 30 }, // หน่วยกิต width
      3: { cellWidth: 30 }, // หมายเหตุ width
    },
  });

  // Adding multiple sections or table summaries
  const finalY = doc.lastAutoTable.finalY + 10; // Position after table
  doc.text("สรุปผลการเรียน", 10, finalY);
  doc.text("รวมหน่วยกิต: 7", 150, finalY);

  // Footer Section
  doc.setFontSize(10);
  doc.text("เกรดเฉลี่ย: ", 10, 285);
  doc.text("หมายเหตุ: เกรด 0-4", 150, 285);

  // Save the PDF
  doc.save("formatted-thai-report.pdf");
};

export default function PDFGenerator() {
    const [score ,  seScore] = useState<string>("144")
  return <button onClick={()=>{generatePDF(score)}}>Generate PDF</button>;
}
