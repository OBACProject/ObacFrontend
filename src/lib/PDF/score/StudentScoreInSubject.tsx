"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import THSarabunFont from "../../Font/THSarabunFont";
import THSarabunFontBold from "../../Font/THSarabunBold";
import { StudentScorenSubject } from "@/dto/pdfDto";
import { getCurrentThaiTermYear } from "@/lib/utils";

interface DataList {
  data: StudentScorenSubject;
}

const StudentScoreInSubjectPDF = ({ data }: DataList) => {
  const { defaultTerm, currentYear } = getCurrentThaiTermYear();
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });
  const imgBanner = new Image();
  imgBanner.src = "/images/obac_navbar_logo.png";
  const pageImgWidth = doc.internal.pageSize.getWidth();
  const imageWidth = 35;
  const imageHeight = (imgBanner.height * imageWidth) / imgBanner.width;
  const x = (pageImgWidth - imageWidth) / 2;

  doc.addFileToVFS("THSarabun.ttf", THSarabunFont);
  doc.addFont("THSarabun.ttf", "THSarabun", "normal");

  doc.addFileToVFS("THSarabunBold.ttf", THSarabunFontBold);
  doc.addFont("THSarabunBold.ttf", "THSarabunBold", "normal");

  doc.addImage(imgBanner, "PNG", x, 5, imageWidth, imageHeight);

  doc.setFont("THSarabunBold");
  doc.setFontSize(20);
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.text("วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ", pageWidth / 2, 45, {
    align: "center",
  });

  doc.setFontSize(16);

  doc.text("เขตลาดกระบัง กรุงเทพมหานคร", pageWidth / 2, 51, {
    align: "center",
  });

  doc.text("สมุดประเมินผลรายวิชา", pageWidth / 2, 61, {
    align: "center",
  });

  doc.text("ระดับประกาศนียบัตรวิชาชีพขั้นสูง", pageWidth / 2, 67, {
    align: "center",
  });
  doc.setFontSize(14);
  doc.text("ระดับชั้น", 15, 77);
  doc.text(data.groupName + "." + data.groupName + "  รอบ บ่าย", 35, 77);
  doc.text(
    `ภาคเรียนที่   ${defaultTerm}   ปีการศึกษา   ${currentYear}`,
    105,
    77
  );

  doc.text(`รายวิชา ${data.subjectName}`, 15, 83);
  doc.text(`รหัสวิชา ${data.subjectCode}`, 105, 83);
  doc.text(`หน่วยกิต ${data.credits || "-"}`, 150, 83);

  doc.text(`เวลาเรียน ${data.hour}`, 15, 89);

  doc.text(`อาจารย์ผู้สอน ${data.subjectTeacher} `, 80, 98);
  doc.text(`อาจารย์ที่ปรึกษา `, 80, 104);

  // table header
  doc.line(15, 115, 195, 115); // horizantol
  doc.line(33, 122, 177, 122); // horizantol
  doc.line(33, 136, 177, 136); // horizantol
  doc.line(15, 142, 195, 142); // horizantol
  doc.line(15, 163, 195, 163); // horizantol

  doc.line(15, 115, 15, 163); // vertical
  doc.line(195, 115, 195, 163); // vertical
  doc.line(33, 115, 33, 163); // vertical
  doc.line(177, 115, 177, 163); // vertical
  doc.line(105, 122, 105, 163); // vertical
  doc.line(42, 136, 42, 163); // vertical
  doc.line(51, 136, 51, 163); // vertical
  doc.line(60, 136, 60, 163); // vertical
  doc.line(69, 136, 69, 163); // vertical
  doc.line(78, 136, 78, 163); // vertical
  doc.line(87, 136, 87, 163); // vertical
  doc.line(96, 136, 96, 163); // vertical
  doc.line(114, 136, 114, 163); // vertical
  doc.line(123, 136, 123, 163); // vertical
  doc.line(131, 136, 131, 163); // vertical
  doc.line(140, 136, 140, 163); // vertical
  doc.line(149, 136, 149, 163); // vertical
  doc.line(158, 136, 158, 163); // vertical
  doc.line(167, 136, 167, 163); // vertical

  //table 2
  doc.line(15, 170, 195, 170); // horizantol
  doc.line(15, 280, 195, 280); // horizantol
  doc.line(15, 170, 15, 280); // vertical
  doc.line(195, 170, 195, 280); // vertical

  doc.text("สรุปผลการเรียน", pageWidth / 2, 119.5, {
    align: "center",
  });
  doc.text("จำนวน", 18, 119.5);
  doc.text("นักศีกษา", 17.5, 126.5);
  doc.text("ทั้งหมด", 18, 133.5);

  doc.text("จำนวนนักศึกษา", 57, 126.5);
  doc.text("ที่ได้ผลการเรียน", 57, 133);

  doc.text("จำนวนนักศึกษา", 137, 126.5);
  doc.text("ที่ได้ผลการเรียน", 137, 133);

  doc.setFontSize(20);
  doc.text("การอนุมัติการเรียน", pageWidth / 2, 177, {
    align: "center",
  });
  doc.setFontSize(14);
  doc.text(
    "ลงชื่อ..................................................................................................................",
    pageWidth / 2,
    185,
    {
      align: "center",
    }
  );
  doc.text("อาจารย์ผู้สอน", pageWidth / 2, 192, {
    align: "center",
  });
  doc.text(
    "ลงชื่อ..................................................................................................................",
    pageWidth / 2,
    199,
    {
      align: "center",
    }
  );
  doc.text("หัวหน้าหมวดวิชา", pageWidth / 2, 206, {
    align: "center",
  });
  doc.text(
    "ลงชื่อ..................................................................................................................",
    pageWidth / 2,
    213,
    {
      align: "center",
    }
  );
  doc.text("ฝ่ายวัดผลการศึกษา", pageWidth / 2, 219, {
    align: "center",
  });

  doc.text("เรียนเสนอให้พิจารณา", pageWidth / 2, 230, {
    align: "center",
  });
  doc.text(
    "ลงชื่อ..................................................................................................................",
    pageWidth / 2,
    237,
    {
      align: "center",
    }
  );
  doc.text("รองผู้อำนวยการฝ่ายวิชาการ", pageWidth / 2, 244, {
    align: "center",
  });
  doc.text("อนุมัติ", 90, 251);
  doc.text("ไม่อนุมัติ", 120, 251);
  doc.text(
    "ลงชื่อ..................................................................................................................",
    pageWidth / 2,
    258,
    {
      align: "center",
    }
  );
  doc.text("ผู้อำนวยการ", pageWidth / 2, 265, {
    align: "center",
  });
  doc.text("......../......../........", pageWidth / 2, 272, {
    align: "center",
  });

  // Next page.....
  doc.addPage();
  doc.setFontSize(14);
  doc.text(`รายชื่อนักเรียน ${data.groupName}`, 36, 10, {
    align: "center",
  });
  doc.setFontSize(14);
  doc.text(`รหัสวิชา ${data.subjectID} วิชา ${data.subjectName}`, 120, 10, {
    align: "center",
  });

  doc.setFontSize(12);

  doc.line(4, 4, 4, 15); // เส้นเริ่มแนวตั้ง
  doc.line(205, 4, 205, 15); // เส้นเริ่มแนวนอนอีกอัน
  doc.line(4, 4, 205, 4); // เส้นเริ่ม แนวนอน
  // doc.line(205, 291, 4, 291);

  doc.line(4, 12, 205, 12);

  autoTable(doc, {
    startY: 12,
    body: [
      [
        "ลำดับ",
        "รหัสนักศึกษา",
        `   ชื่อ - นามสกุล   `,
        "ภาระงาน",
        "คะแนนเก็บ",
        "จิตพิสัย",
        "กลางภาค",
        "ปลายภาค",
        "รวม",
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
      1: { cellWidth: 20 },
      2: { cellWidth: 55 },
      3: { cellWidth: 17 },
      4: { cellWidth: 17 },
      5: { cellWidth: 17 },
      6: { cellWidth: 17 },
      7: { cellWidth: 17 },
      8: { cellWidth: 16 },
      9: { cellWidth: 15 },
    },
    margin: { left: 4, right: 0 },
  });

  doc.setFont("THSarabun");
  let y2 = doc.lastAutoTable.finalY;
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
            `${students[i].assignmentScore}`,
            `${students[i].collectScore}`,
            `${students[i].affectiveScore}`,
            `${students[i].midtermScore}`,
            `${students[i].finaltermScore}`,
            `${students[i].totalScore}`,
            `${students[i].remark !== null ? students[i].remark : ""}`,
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
          1: { cellWidth: 20 },
          2: {
            cellWidth: 30,
            halign: "left",
            lineWidth: { right: 0, top: 0.2, bottom: 0.2, left: 0.2 },
            cellPadding: { left: 5, right: 0, top: 0.5, bottom: 0.5 },
          },
          3: {
            cellWidth: 25,
            halign: "left",
            lineWidth: { right: 0.2, left: 0, top: 0.2, bottom: 0.2 },
            cellPadding: { left: 0, right: 0, top: 0.5, bottom: 0.5 },
          },
          4: { cellWidth: 17 },
          5: { cellWidth: 17 },
          6: { cellWidth: 17 },
          7: { cellWidth: 17 },
          8: { cellWidth: 17 },
          9: { cellWidth: 16 },
          10: { cellWidth: 15 },
        },
        margin: { left: 4, right: 0 },
      });
      y2 = doc.lastAutoTable.finalY;

      if (y2 > 250) {
        doc.addPage();

        y2 = 14;
      }
    }
  }

  doc.save(`ใบคะแนนวิชา ${data.subjectName} ${data.groupName}.pdf`);
};
export default StudentScoreInSubjectPDF;
