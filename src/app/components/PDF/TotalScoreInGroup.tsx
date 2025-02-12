"use client";
import jsPDF from "jspdf";
import THSarabunFont from "../font/THSarabunFont";
import THSarabunFontBold from "../font/THSarabunBold";
import autoTable from "jspdf-autotable";

// max 280 y
// max 205 x
type Data = {};

export default function TotalScoreInGroup() {
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

  doc.text("วันที่พิมพ์ 04 ตุลาคม 2567", 10, 15);

  doc.setFont("THSarabunBold");
  doc.text("วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ", 100, 15);
  doc.text(
    "สรุปเกรดนักศึกษา ภาคเรียนที่ 1 ปีการศึกษา 2567 ห้อง xxx-xxx",
    10,
    25
  );

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
  for (let i = 0; i < 55; i++) {
    autoTable(doc, {
      startY: y2,
      body: [
        [
          `${i + 1}`,
          "1234567",
          `นาย ภัทรจาริน นภากาญจน์`,
          "1",
          "2",
          "3",
          "4",
          "ข.ว.",
          "6",
          "7",
          "8",
          "9",
          "10",
          "3.11",
          "3.11",
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
    y2 += 7;
    if (y2 >= 280) {
      y2 = 14;
    }
  }
  doc.setFont("THSarabun");

  doc.save(`ใบคะแนนรวมของห้อง.pdf`);
}
