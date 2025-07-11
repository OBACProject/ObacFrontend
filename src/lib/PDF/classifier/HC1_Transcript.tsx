"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import THSarabunFont from "../../Font/THSarabunFont";
type Data = {
  score: number;
};
const HC1_Transcript = ({ score }: Data) => {
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
  doc.text("สำเนา รบ 2567 ปวส. การจัดการสำนักงานดิจิทัล", 105, 10, {
    align: "center",
  });
  doc.setFontSize(12);
  doc.text("รหัสสถานศึกษา: 1310100892", 10, 15);
  doc.text("จังหวัด: กรุงเทพมหานคร", 10, 19);
  doc.text("เลขประจำตัว", 10, 23);
  doc.text("ชื่อ - ชื่อสกุล", 10, 27);
  doc.text("เชื้อชาติ", 10, 31);
  doc.text("สัญชาติ", 35, 31);
  doc.text("ศาสนา", 55, 31);
  doc.text("วัน เดือน ปีเกิด", 10, 35);
  doc.text("รหัสประจำตัวประชาชน", 10, 39);
  doc.text("ชื่อบิดา", 10, 43);
  doc.text("ชื่อมารดา", 10, 47);
  doc.text("ประเภทวิชา บริหารธุรกิจ", 10, 51);
  doc.text("กลุ่มอาชีพ  การจัดการ", 10, 55);
  doc.text("สาขาวิชา  การจัดการสำนักงานดิจิทัล", 10, 59);
  doc.line(170, 10, 170, 47);
  doc.line(200, 10, 200, 47);
  doc.line(170, 10, 200, 10);
  doc.line(170, 47, 200, 47);
  doc.text("ชื่อสถาศึกษา  วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ", 105, 15);
  doc.text("สถาศึกษาเดิม", 105, 19);
  doc.text("จังหวัด", 105, 23);
  doc.text("ชั้นเรียนสุดท้าย", 105, 27);
  doc.text("ผลการศึกษา", 105, 31);
  doc.text("หน่วยการเรียน", 140, 31);
  doc.text("เข้ารับการศึกษาเมื่อ", 105, 35);
  doc.text("หน่วยกิตที่ได้รับโอน", 105, 39);
  doc.text("หน่วยกิต", 150, 39);
  doc.text("หน่วยกิตที่เรียน", 105, 43);
  doc.text("หน่วยกิต", 150, 43);
  doc.text("หน่วยกิตที่ได้", 105, 47);
  doc.text("หน่วยกิต", 150, 47);
  doc.text("หน่วยกิตที่ได้ บริหารธุรกิจ", 105, 51);
  doc.text("ระดับคะแนนเฉลี่ยสะสม  การจัดการ", 105, 55);
  doc.text("มาตรฐานวิชาชีพ ( ) ผ่าน ( ) ไม่ผ่าน", 105, 59);
  doc.line(4, 4, 4, 291);
  doc.line(205, 4, 205, 291);
  doc.line(4, 4, 205, 4);
  doc.line(205, 291, 4, 291);
  doc.line(4, 62, 205, 62);
  doc.line(4, 75, 205, 75);
  doc.text("รหัส", 13, 70);
  doc.text("รายวิชา", 45, 70);
  doc.line(26, 62, 26, 75);
  doc.line(74, 62, 74, 75);
  doc.text("หน่วยกิต", 78, 74, {
    angle: 90,
  });
  doc.line(79, 62, 79, 75);
  doc.text("ผลสอบ", 83, 74, {
    angle: 90,
  });
  doc.line(84, 62, 84, 75);
  doc.text("สอบแก้ตัว", 88, 74, {
    angle: 90,
  });
  doc.line(89, 62, 89, 75);
  doc.text("เรียนเสริม", 93, 74, {
    angle: 90,
  });
  doc.line(94, 62, 94, 75);
  doc.text("สรุปคะแนน", 98, 75, {
    angle: 90,
  });
  doc.line(99, 62, 99, 75);
  doc.text("ใบเสร็จ", 103, 73, {
    angle: 90,
  });
  doc.text("รหัส", 113, 70);
  doc.text("รายวิชา", 146, 70);
  doc.line(127, 62, 127, 75);
  doc.line(175, 62, 175, 75);
  doc.text("หน่วยกิต", 179, 74, {
    angle: 90,
  });
  doc.line(180, 62, 180, 75);
  doc.text("ผลสอบ", 184, 74, {
    angle: 90,
  });
  doc.line(185, 62, 185, 75);
  doc.text("สอบแก้ตัว", 189, 74, {
    angle: 90,
  });
  doc.line(190, 62, 190, 75);
  doc.text("เรียนเสริม", 194, 74, {
    angle: 90,
  });
  doc.line(195, 62, 195, 75);
  doc.text("สรุปคะแนน", 199, 75, {
    angle: 90,
  });
  doc.line(200, 62, 200, 75);
  doc.text("ใบเสร็จ", 204, 73, {
    angle: 90,
  });
  //=======================================================================================================================================
  doc.text("ภาคเรียนที่ 1 ", 42, 79);
  autoTable(doc, {
    startY: 81,
    body: [
      [
        "30000-1101",
        "ทักษะภาษาไทยเพื่อการสื่อสารในสายงานอาชีพ",
        "2",
        score,
        7,
        8,
        9,
        11,
      ],
      ["30000-1201", "ภาษาอังกฤษสำหรับงานอาชีพ", "2", score, 7, 8, 9, 11],
      [
        "30000-1401",
        "คณิตศาสตร์และสถิติเพื่องานอาชีพ",
        "3",
        score,
        7,
        8,
        9,
        11,
      ],
      ["30000-1001", "การเป็นผู้ประกอบการ", "3", score, 7, 8, 9, 11],
      ["30000-1002", "หลักการตลาด", "3", score, 7, 8, 9, 11],
      ["300216-2001", "การจัดสำนักงานสมัยใหม่", "3", score, 7, 8, 9, 11],
      ["300216-2002", "ธุรการสำนักงาน", "3", score, 7, 8, 9, 11],
      [
        "300216-2003",
        "การใช้โปรแกรมสำเร็จรูปในงานสำนักงานดิจิทัล",
        "3",
        score,
        7,
        8,
        9,
        11,
      ],
      [
        "30000-2001",
        "กิจกรรมเสริมสร้างสุจริต จิตอาสา",
        "0",
        score,
        0,
        0,
        9,
        11,
      ],
      ["", "รวม", "22"],
    ],
    alternateRowStyles: { fillColor: [255, 255, 255] },
    styles: {
      font: "THSarabun",
      fontSize: 12,
      cellPadding: 0,
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: { right: 0.2, top: 0.1, bottom: 0.1, left: 0.2 },
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 22, cellPadding: { left: 3 }, halign: "left" },
      1: {
        cellWidth: 48,
        fontSize: 10,
        cellPadding: { left: 1 },
        halign: "left",
      },
      2: { cellWidth: 5 },
      3: { cellWidth: 5 },
      4: { cellWidth: 5 },
      5: { cellWidth: 5 },
      6: { cellWidth: 5 },
      7: { cellWidth: 5 },
    },
    margin: { left: 4, right: 0 },
    didParseCell: (data) => {
      if (
        data.row.index === 9 ||
        data.row.index === 1 ||
        data.row.index === 2 ||
        data.row.index === 3 ||
        data.row.index === 4 ||
        data.row.index === 5 ||
        data.row.index === 6 ||
        data.row.index === 8
      ) {
        data.cell.styles.fontSize = 12;
      }
    },
  });
  const PadY2 = doc.lastAutoTable.finalY + 6;
  doc.text("ภาคเรียนที่ 2 ", 42, PadY2 - 2);
  autoTable(doc, {
    startY: PadY2,
    body: [
      ["30000-1102", "ทักษะการเขียนและการพูดภาษาไทย", "2", score, 7, 8, 9, 11],
      [
        "30000-1201",
        "การเขียนและการนำเสนอโครงงานภาษาอังกฤษ",
        "1",
        score,
        7,
        8,
        9,
        11,
      ],
      ["30000-1301", "คณิตศาสตร์พื้นฐาน", "3", score, 7, 8, 9, 11],
      [
        "30000-1503",
        "หลักปรัชญาเศรษฐกิจพอเพียงเพื่อการดำเนินชีวิต",
        "1",
        score,
        7,
        8,
        9,
        11,
      ],
      ["30000-1002", "องค์การและการบริหารงานคุณภาพ", "3", score, 7, 8, 9, 11],
      [
        "30216-2004",
        "มนุษย์สัมพันธ์และการทำงานเป็นทีมในงานสำนัก",
        "3",
        score,
        7,
        8,
        9,
        11,
      ],
      ["30216-2005", "เทคนิคการฝึกอบรมเชิงปฏิบัติการ", "3", score, 7, 8, 9, 11],
      [
        "30216-2006",
        "เทคโนโลยีสารสนเทศเพื่อการจัดการสำนักงาน",
        "3",
        score,
        7,
        8,
        9,
        11,
      ],
      ["30216-2002", "กิจกรรมองค์การวิชาชีพ", "0", score, 7, 8, 9, 11],
      ["", "รวม", "19"],
    ],
    alternateRowStyles: { fillColor: [255, 255, 255] },
    styles: {
      font: "THSarabun",
      fontSize: 12,
      cellPadding: 0,
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: { right: 0.2, top: 0.1, bottom: 0.1, left: 0.2 },
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 22, cellPadding: { left: 3 }, halign: "left" },
      1: {
        cellWidth: 48,
        fontSize: 10,
        cellPadding: { left: 1 },
        halign: "left",
      },
      2: { cellWidth: 5 },
      3: { cellWidth: 5 },
      4: { cellWidth: 5 },
      5: { cellWidth: 5 },
      6: { cellWidth: 5 },
      7: { cellWidth: 5 },
    },
    margin: { left: 4, right: 0 },
    didParseCell: (data) => {
      if (
        data.row.index === 9 ||
        data.row.index === 0 ||
        data.row.index === 2 ||
        data.row.index === 4 ||
        data.row.index === 6 ||
        data.row.index === 8
      ) {
        data.cell.styles.fontSize = 12;
      }
    },
  });
  doc.text("ภาคเรียนที่ 3 ", 143, 79);
  autoTable(doc, {
    startY: 81,
    body: [
      ["30000-1601", "การพัฒนาสุขภาพ", "2", score, 7, 8, 9, 11],
      [
        "30001-1003",
        "การประยุกต์ใช้เทคโนโลยีดิจิทัลในอาชีพ",
        "3",
        score,
        7,
        8,
        9,
        11,
      ],
      ["30200-1003", "หลักเศรษฐศาสตร์", "3", score, 7, 8, 9, 11],
      [
        "30216-2007",
        "สัมนาเชิงปฏิบัติการจัดการสำนักงาน",
        "4",
        score,
        7,
        8,
        9,
        11,
      ],
      ["30216-2008", "เทคนิคการปฎิบัติงานสำนักงาน", "3", score, 7, 8, 9, 11],
      [
        "30216-2014",
        "โครงงานการจัดการสำนักงานดิจิทัล",
        "4",
        score,
        7,
        8,
        9,
        11,
      ],
      ["30000-1104", "ทักษะภาษาไทยเชิงสร้างสรรค์", "2", score, 7, 8, 9, 11],
      ["30000-2003", "กิจกรรมองค์การวิชาชีพ", "0", score, 7, 8, 9, 11],
      ["", "", ""],
      ["", "รวม", "21"],
    ],
    alternateRowStyles: { fillColor: [255, 255, 255] },
    styles: {
      font: "THSarabun",
      fontSize: 12,
      cellPadding: 0,
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: { right: 0.2, top: 0.1, bottom: 0.1, left: 0.2 },
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 22, cellPadding: { left: 3 }, halign: "left" },
      1: {
        cellWidth: 48,
        fontSize: 10,
        cellPadding: { left: 1 },
        halign: "left",
      },
      2: { cellWidth: 5 },
      3: { cellWidth: 5 },
      4: { cellWidth: 5 },
      5: { cellWidth: 5 },
      6: { cellWidth: 5 },
      7: { cellWidth: 5 },
    },
    margin: { left: 104, right: 0 },
    didParseCell: (data) => {
      if (
        data.row.index === 9 ||
        data.row.index === 0 ||
        data.row.index === 2 ||
        data.row.index === 3 ||
        data.row.index === 4 ||
        data.row.index === 5 ||
        data.row.index === 6 ||
        data.row.index === 7
      ) {
        data.cell.styles.fontSize = 12;
      }
    },
  });
  doc.text("ภาคเรียนที่ 4 ", 143, PadY2 - 2);
  autoTable(doc, {
    startY: PadY2,
    body: [
      ["30200-1001", "กฎหมายธุรกิจ", "3", score, 7, 8, 9, 11],
      ["30216-2009", "การประเมินผลการปฏิบัติงาน", "3", score, 7, 8, 9, 11],
      ["30216-2010", "หลักการจัดการเอกสาร", "3", score, 7, 8, 9, 11],
      ["30216-2011", "การผลิตเอกสารเพื่องานสำนักงาน", "3", score, 7, 8, 9, 11],
      ["30216-2012", "เทคนิคการพัฒนาบุคลิกภาพ", "3", score, 7, 8, 9, 11],
      [
        "30216-2013",
        "การประชาสัมพันธ์เพื่องานสำนักงาน",
        "3",
        score,
        7,
        8,
        9,
        11,
      ],
      ["31401-2007", "การจัดการโลจิสติกส์และซัพพลาย", "3", score, 7, 8, 9, 11],
      ["30000-2004", "กิจกรรมองค์การวิชาชีพ", "0", score, 7, 8, 9, 11],
      ["", "", ""],
      ["", "รวม", "21"],
    ],
    alternateRowStyles: { fillColor: [255, 255, 255] },
    styles: {
      font: "THSarabun",
      fontSize: 12,
      cellPadding: 0,
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: { right: 0.2, top: 0.1, bottom: 0.1, left: 0.2 },
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 22, cellPadding: { left: 3 }, halign: "left" },
      1: {
        cellWidth: 48,
        fontSize: 10,
        cellPadding: { left: 1 },
        halign: "left",
      },
      2: { cellWidth: 5 },
      3: { cellWidth: 5 },
      4: { cellWidth: 5 },
      5: { cellWidth: 5 },
      6: { cellWidth: 5 },
      7: { cellWidth: 5 },
    },
    margin: { left: 104, right: 0 },
    didParseCell: (data) => {
      if (data.row.index !== 10) {
        data.cell.styles.fontSize = 12;
      }
    },
  });
  const PadY3 = doc.lastAutoTable.finalY + 6;
  doc.text("ปวส.1 ภาคเรียนฤดูร้อน 1 ปีการศึกษา........ ", 38, PadY3 - 2);
  autoTable(doc, {
    startY: PadY3,
    body: [
      ["30200-0001", "การบัญชีเบื้องต้น", "3", score, 7, 8, 9, 11],
      ["30216-0001", "พิมพ์ไทย อังกฤษดิจิทัล", "2", score, 7, 8, 9, 11],
      ["30216-0002", "งานสารบรรณเชิงปฏิบัติการ", "3", score, 7, 8, 9, 11],
      ["", "รวม", "8"],
    ],
    alternateRowStyles: { fillColor: [255, 255, 255] },
    styles: {
      font: "THSarabun",
      fontSize: 12,
      cellPadding: 0,
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: { right: 0.2, top: 0.1, bottom: 0.1, left: 0.2 },
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 22, cellPadding: { left: 3 }, halign: "left" },
      1: {
        cellWidth: 48,
        fontSize: 12,
        cellPadding: { left: 1 },
        halign: "left",
      },
      2: { cellWidth: 5 },
      3: { cellWidth: 5 },
      4: { cellWidth: 5 },
      5: { cellWidth: 5 },
      6: { cellWidth: 5 },
      7: { cellWidth: 5 },
    },
    margin: { left: 4, right: 0 },
  });
  doc.text("ปวส.1 ภาคเรียนฤดูร้อน 2 ปีการศึกษา........ ", 140, PadY3 - 2);
  autoTable(doc, {
    startY: PadY3,
    body: [
      ["30216-0003", "การจัดประชุมและนิทรรศการ", "3", score, 7, 8, 9, 11],
      ["30200-0005", "การโต้ตอบจดหมายในงานสำนักงาน", "2", score, 7, 8, 9, 11],
      ["30200-0007", "งานสำนักงานเชิงปฏิบัติการ", "3", score, 7, 8, 9, 11],
      ["", "รวม", "8"],
    ],
    alternateRowStyles: { fillColor: [255, 255, 255] },
    styles: {
      font: "THSarabun",
      fontSize: 12,
      cellPadding: 0,
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: { right: 0.2, top: 0.1, bottom: 0.1, left: 0.2 },
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 22, cellPadding: { left: 3 }, halign: "left" },
      1: {
        cellWidth: 48,
        fontSize: 12,
        cellPadding: { left: 1 },
        halign: "left",
      },
      2: { cellWidth: 5 },
      3: { cellWidth: 5 },
      4: { cellWidth: 5 },
      5: { cellWidth: 5 },
      6: { cellWidth: 5 },
      7: { cellWidth: 5 },
    },
    margin: { left: 104, right: 0 },
  });
  doc.line(104, 62, 104, doc.lastAutoTable.finalY);
  doc.line(4, 246, 205, 246);
  doc.text("สรุปผลการเรียน", 23, 252.5);
  doc.line(62, 246, 62, 291);
  doc.line(62, 251, 205, 251);
  doc.line(4, 256, 146, 256);
  doc.text("ระดับผลการเรียน", 165, 249.5);
  doc.line(146, 246, 146, 291);
  doc.line(104, 246, 104, 291);
  doc.line(167, 251, 167, 291);
  doc.line(186, 251, 186, 291);
  doc.line(76, 251, 76, 291);
  doc.line(90, 246, 90, 291);
  doc.line(118, 251, 118, 291);
  doc.line(132, 246, 132, 291);
  doc.text("หน่วยกิตที่ได้ในภาคเรียนนี้", 6, 260);
  doc.text("หน่วยกิตสะสม", 6, 265);
  doc.text("ระดับคะแนนเฉลี่ยภาคเรียนนี้", 6, 270);
  doc.text("ระดับคะแนนเฉลี่ยสะสม", 6, 275);
  doc.text("อาจารย์ที่ปรึกษา", 6, 280);
  doc.text("หัวหน้างานทะเบียน", 6, 285);
  doc.text("ผู้อำนวยการ  (นายวิทวัต โยธินนรธรรม)", 6, 290);
  doc.line(4, 261, 146, 261);
  doc.line(4, 266, 146, 266);
  doc.line(4, 271, 146, 271);
  doc.setLineWidth(0.3);
  doc.line(4, 276, 146, 276);
  doc.setLineWidth(0.2);
  doc.line(4, 281, 146, 281);
  doc.line(4, 286, 146, 286);
  doc.text("ปีการศึกษา.........", 64, 249.5);
  doc.text("ภาคที่1", 64, 254.5);
  doc.text("ภาคที่2", 78, 254.5);
  doc.text("ภาคที่1", 92, 254.5);
  doc.text("ปีการศึกษา.........", 106, 249.5);
  doc.text("ภาคฤดูร้อน", 133, 249.5);
  doc.text("ภาคฤดูร้อน", 91, 249.5);
  doc.setFontSize(12);
  doc.text("ภาคที่1", 106, 254.5);
  doc.text("ภาคที่2", 120, 254.5);
  doc.text("ภาคที่2", 134, 254.5);
  doc.text("4", 156, 254.5);
  doc.text("80-100", 173, 254.5);
  doc.text("ดีเยี่ยม", 192, 254.5);
  doc.text("3.5", 155, 259.5);
  doc.text("75-79", 174, 259.5);
  doc.text("ดีมาก", 192, 259.5);
  doc.text("3", 156, 264.5);
  doc.text("70-74", 174, 264.5);
  doc.text("ดี", 194, 264.5);
  doc.text("2.5", 155, 269.5);
  doc.text("65-69", 174, 269.5);
  doc.text("ดีพอใช้", 192, 269.5);
  doc.text("2", 156, 274.5);
  doc.text("60-64", 174, 274.5);
  doc.text("ปลานกลาง", 190, 274.5);
  doc.text("1.5", 155, 279.5);
  doc.text("55-59", 174, 279.5);
  doc.text("อ่อน", 194, 279.5);
  doc.text("1", 156, 284.5);
  doc.text("50-54", 174, 284.5);
  doc.text("อ่อนมาก", 191.5, 284.5);
  doc.text("0", 156, 289.5);
  doc.text("0-49", 175, 289.5);
  doc.text("ตก", 194, 289.5);
  doc.save("Transcript การจัดการสำนักงานดิจิทัล.pdf");
};
export default HC1_Transcript;
