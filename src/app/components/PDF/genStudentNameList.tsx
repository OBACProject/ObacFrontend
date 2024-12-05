"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import THSarabunFont from "@/app/pages/pdf/THSarabunFont";

type Data = {
  FirstName: string;
  LastName: string;
}

const GenStudentNameList = ({FirstName , LastName}:Data) => {
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
  doc.text("รายชื่อนักเรียน กลุ่มเรียน", 105, 10, { align: "center" });
  doc.setFontSize(12);

  doc.line(4,4,4,291);
  doc.line(205,4,205,291);
  doc.line(4,4,205,4);
  doc.line(205,291,4,291);


  doc.line(4,12,205,12);


  autoTable(doc, {
    startY: 12,
    body: [
      ['ลำดับ',"รหัสนักศึกษา",`   ชื่อ - นามสกุล   `, "",'หมายเหตุ' ],
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
      3: { cellWidth: 70 }, 
      4: { cellWidth: 31 }, 
    },margin: { left: 4, right: 0 }

  });
    let n = 0;
  for ( let i = 0 ; i< 35; i++){
    autoTable(doc, {
    startY: 19+(n),
    body: [
      [i+1,"26580",`${FirstName}  ${LastName}`, "",'' ],
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
      3: { cellWidth: 70 }, 
      4: { cellWidth: 31 }, 
    },margin: { left: 4, right: 0 }

  });
  n+=7
  }
  

  doc.save("tester.pdf");
};
export default GenStudentNameList;