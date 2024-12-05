"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import THSarabunFont from "./THSarabunFont";
import THSarabunBold from "./THSarabunBold"
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
  doc.addFont("THSarabun.ttf", "THSarabunB", "bold");
  doc.setFont("THSarabun");

  // Header Section (aligned to your image)
  doc.setFontSize(16);
  doc.text("สำเนา รบ 2567 ปวส. การจัดการสำนักงานดิจิทัล", 105, 10, { align: "center" });
  doc.setFontSize(12);

  doc.text("รหัสสถานศึกษา: 1310100892", 10, 15);
  doc.text("จังหวัด: กรุงเทพมหานคร", 10, 19);
  doc.text("เลขประจำตัว", 10, 23);
  doc.text("ชื่อ - ชื่อสกุล", 10, 27);
  doc.text("เชื้อชาติ", 10, 31);doc.text("สัญชาติ", 35, 31);doc.text("ศาสนา", 55, 31);
  doc.text("วัน เดือน ปีเกิด", 10, 35);
  doc.text("รหัสประจำตัวประชาชน", 10, 39);
  doc.text("ชื่อบิดา", 10, 43);
  doc.text("ชื่อมารดา", 10, 47);

  doc.text("ประเภทวิชา บริหารธุรกิจ", 10, 51);
  doc.text("กลุ่มอาชีพ  การจัดการ", 10, 55);
  doc.text("สาขาวิชา  การจัดการสำนักงานดิจิทัล", 10, 59);

  doc.line(170 , 10 , 170 ,47)
  doc.line(200 , 10 , 200 ,47)

  doc.line(170 , 10 , 200 ,10)
  doc.line(170 , 47 , 200 ,47)


  doc.text("ชื่อสถาศึกษา  วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ", 105, 15);
  doc.text("สถาศึกษาเดิม", 105, 19);
  doc.text("จังหวัด", 105, 23);
  doc.text("ชั้นเรียนสุดท้าย", 105, 27);
  doc.text("ผลการศึกษา", 105, 31); doc.text("หน่วยการเรียน", 140, 31);
  doc.text("เข้ารับการศึกษาเมื่อ", 105, 35);
  doc.text("หน่วยกิตที่ได้รับโอน", 105, 39);doc.text("หน่วยกิต", 150, 39);
  doc.text("หน่วยกิตที่เรียน", 105, 43);doc.text("หน่วยกิต", 150, 43);
  doc.text("หน่วยกิตที่ได้", 105, 47);doc.text("หน่วยกิต", 150, 47);
  doc.text("หน่วยกิตที่ได้ บริหารธุรกิจ", 105, 51);
  doc.text("ระดับคะแนนเฉลี่ยสะสม  การจัดการ", 105, 55);
  doc.text("มาตรฐานวิชาชีพ ( ) ผ่าน ( ) ไม่ผ่าน", 105, 59);
  
  doc.line(4,4,4,291);
  doc.line(205,4,205,291);
  doc.line(4,4,205,4);
  doc.line(205,291,4,291);

  doc.line(4,62 ,205,62);
  doc.line(4,75 ,205,75);
  doc.text("รหัส", 13, 70);doc.text("รายวิชา", 45, 70); doc.line(26,62 , 26,75);doc.line(74,62 , 74,75)
  doc.text("หน่วยกิต",78, 74,{
    angle: 90, 
  })
  doc.line(79,62 , 79,75)
  doc.text("ผลสอบ",83, 74,{
    angle: 90, 
  })
  doc.line(84,62 , 84,75)
  doc.text("สอบแก้ตัว",88, 74,{
    angle: 90, 
  })
  doc.line(89,62 , 89,75)
  doc.text("เรียนเสริม",93, 74,{
    angle: 90, 
  })
  doc.line(94,62 , 94,75)
  doc.text("สรุปคะแนน",98, 75,{
    angle: 90, 
  })
  doc.line(99,62 , 99,75)
  doc.text("ใบเสร็จ",103, 73,{
    angle: 90, 
  })
  doc.line(104,62 , 104,290)

  doc.text("รหัส", 111, 70);doc.text("รายวิชา", 146, 70); doc.line(127,62 , 127,75)
  doc.line(175,62,175,75)
  doc.text("หน่วยกิต",179, 74,{
    angle: 90, 
  })
  doc.line(180,62,180,75)
  doc.text("ผลสอบ",184, 74,{
    angle: 90, 
  })
  doc.line(185,62,185,75)
  doc.text("สอบแก้ตัว",189, 74,{
    angle: 90, 
  })
  doc.line(190,62,190,75)
  doc.text("เรียนเสริม",194, 74,{
    angle: 90, 
  })
  doc.line(195,62,195,75)
  doc.text("สรุปคะแนน",199, 75,{
    angle: 90, 
  })
  doc.line(200,62,200,75)
  doc.text("ใบเสร็จ",204, 73,{
    angle: 90, 
  })
  
  
  doc.text("ภาคเรียนที่ 1 ", 42, 79);
  autoTable(doc, {
    startY: 81,
    body: [
      ["20000-1101", "ภาษาไทยเพื่อการสื่อสาร", "1",score ],
      ["20000-1201", "ภาษาอังกฤษพื้นฐาน", "2", score],
      ["20000-1501", "คณิตศาสตร์พื้นฐาน", "2", score],
      ["20000-2001", "ประวัติศาสตร์เพื่อการท่องเที่ยว", "2", score],
      ["20000-1501", "คณิตศาสตร์พื้นฐาน", "2", score],
      ["20000-2001", "ประวัติศาสตร์เพื่อการท่องเที่ยว", "2", score],
      ["", "", "", ],
      ["", "", "", ],
      ["", "", "", ],
      ["", "รวม", "", ],
    ],
    alternateRowStyles: { fillColor: [255, 255, 255] },
    styles: {
      font: "THSarabun",
      fontSize: 12,
      cellPadding: 0,
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    bodyStyles: {
      textColor: [0, 0, 0],
      
    },
    columnStyles: {
      0: { cellWidth: 22 }, 
      1: { cellWidth: 48 }, 
      2: { cellWidth: 5 }, 
      3: { cellWidth: 25 }, 
    },margin: { left: 4, right: 0 }
  });

  doc.text("ภาคเรียนที่ 2 ", 143, 79);
  autoTable(doc, {
    startY: 81,
    body: [
      ["20000-1101", "ภาษาไทยเพื่อการสื่อสาร", "1",score ],
      ["20000-1201", "ภาษาอังกฤษพื้นฐาน", "2", score],
      ["20000-1501", "คณิตศาสตร์พื้นฐาน", "2", score],
      ["20000-2001", "ประวัติศาสตร์เพื่อการท่องเที่ยว", "2", score],
      ["20000-1501", "คณิตศาสตร์พื้นฐาน", "2", score],
      ["20000-2001", "ประวัติศาสตร์เพื่อการท่องเที่ยว", "2", score],
      ["", "", "", ],
      ["", "", "", ],
      ["", "", "", ],
      ["", "รวม", "", ],
    ],alternateRowStyles: { fillColor: [255, 255, 255] },
    styles: {
      font: "THSarabun",
      fontSize: 12,
      cellPadding: 0,
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 23 }, 
      1: { cellWidth: 48 }, 
      2: { cellWidth: 5 }, 
      3: { cellWidth: 25 }, 
    },margin: { left: 104, right: 10 },
    
  });

  const PadY2  = doc.lastAutoTable.finalY + 6
  doc.text("ภาคเรียนที่ 3 ", 42, PadY2-2);
  autoTable(doc, {
    startY: PadY2,
    body: [
      ["20000-1101", "ภาษาไทยเพื่อการสื่อสาร", "1",score ],
      ["20000-1201", "ภาษาอังกฤษพื้นฐาน", "2", score],
      ["20000-1501", "คณิตศาสตร์พื้นฐาน", "2", score],
      ["20000-2001", "ประวัติศาสตร์เพื่อการท่องเที่ยว", "2", score],
      ["20000-1501", "คณิตศาสตร์พื้นฐาน", "2", score],
      ["20000-2001", "ประวัติศาสตร์เพื่อการท่องเที่ยว", "2", score],
      ["", "", "", ],
      ["", "", "", ],
      ["", "", "", ],
      ["", "รวม", "", ],
    ],alternateRowStyles: { fillColor: [255, 255, 255] },
    styles: {
      font: "THSarabun",
      fontSize: 12,
      cellPadding: 0,
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 22 }, 
      1: { cellWidth: 48 }, 
      2: { cellWidth: 5 }, 
      3: { cellWidth: 25 }, 
    },margin: { left: 4, right: 0 }
  });

  doc.text("ภาคเรียนที่ 4 ", 143, PadY2-2);
  autoTable(doc, {
    startY: PadY2,
    body: [
      ["20000-1101", "ภาษาไทยเพื่อการสื่อสาร", "1",score ],
      ["20000-1201", "ภาษาอังกฤษพื้นฐาน", "2", score],
      ["20000-1501", "คณิตศาสตร์พื้นฐาน", "2", score],
      ["20000-2001", "ประวัติศาสตร์เพื่อการท่องเที่ยว", "2", score],
      ["20000-1501", "คณิตศาสตร์พื้นฐาน", "2", score],
      ["20000-2001", "ประวัติศาสตร์เพื่อการท่องเที่ยว", "2", score],
      ["", "", "", ],
      ["", "", "", ],
      ["", "", "", ],
      ["", "รวม", "", ],
    ],alternateRowStyles: { fillColor: [255, 255, 255] },
    styles: {
      font: "THSarabun",
      fontSize: 12,
      cellPadding: 0,
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 23 }, 
      1: { cellWidth: 48 }, 
      2: { cellWidth: 5 }, 
      3: { cellWidth: 25 }, 
    },margin: { left: 104, right: 10 }
  });

  const PadY3  = doc.lastAutoTable.finalY + 6
  doc.text("ภาคเรียนที่ 5 ", 42, PadY3-2);
  autoTable(doc, {
    startY: PadY3,
    body: [
      ["20000-1101", "ภาษาไทยเพื่อการสื่อสาร", "1",score ],
      ["20000-1201", "ภาษาอังกฤษพื้นฐาน", "2", score],
      ["20000-1501", "คณิตศาสตร์พื้นฐาน", "2", score],
      ["20000-2001", "ประวัติศาสตร์เพื่อการท่องเที่ยว", "2", score],
      ["20000-1501", "คณิตศาสตร์พื้นฐาน", "2", score],
      ["20000-2001", "ประวัติศาสตร์เพื่อการท่องเที่ยว", "2", score],
      ["", "", "", ],
      ["", "", "", ],
      ["", "", "", ],
      ["", "รวม", "", ],
    ],alternateRowStyles: { fillColor: [255, 255, 255] },
    styles: {
      font: "THSarabun",
      fontSize: 12,
      cellPadding: 0,
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 22 }, 
      1: { cellWidth: 48 }, 
      2: { cellWidth: 5 }, 
      3: { cellWidth: 25 }, 
    },margin: { left: 4, right: 0 }
  });

  doc.text("ภาคเรียนที่ 6 ", 143, PadY3-2);
  autoTable(doc, {
    startY: PadY3,
    body: [
      ["20000-1101", "ภาษาไทยเพื่อการสื่อสาร", "1",score ],
      ["20000-1201", "ภาษาอังกฤษพื้นฐาน", "2", score],
      ["20000-1501", "คณิตศาสตร์พื้นฐาน", "2", score],
      ["20000-2001", "ประวัติศาสตร์เพื่อการท่องเที่ยว", "2", score],
      ["20000-1501", "คณิตศาสตร์พื้นฐาน", "2", score],
      ["20000-2001", "ประวัติศาสตร์เพื่อการท่องเที่ยว", "2", score],
      ["", "", "", ],
      ["", "", "", ],
      ["", "", "", ],
      ["", "รวม", "", ],
    ],alternateRowStyles: { fillColor: [255, 255, 255] },
    styles: {
      font: "THSarabun",
      fontSize: 12,
      cellPadding: 0,
      halign: "center",
      valign: "middle",
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 23 }, 
      1: { cellWidth: 48 }, 
      2: { cellWidth: 5 }, 
      3: { cellWidth: 25 }, 
    },margin: { left: 104, right: 10 }
  });


  doc.setFontSize(10);
  doc.text("เกรดเฉลี่ย: ", 10, 285);
  doc.text("หมายเหตุ: เกรด 0-4", 150, 285);

  doc.save("tester.pdf");
};



export default function PDFGenerator() {
    const [score ,  seScore] = useState<string>("144")
  return <button onClick={()=>{generatePDF(score)}}>Generate PDF</button>;
}
