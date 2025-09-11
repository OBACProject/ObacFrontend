"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import THSarabunFont from "../../Font/THSarabunFont";
import THSarabunFontBold from "../../Font/THSarabunBold";
import { getCurrentThaiTermYear } from "@/lib/utils";
import { StudentGroupGradeResponse } from "@/dto/gradDto";

type GradeBucket = 0 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4;
type RemarkKey = "ผ." | "ม.ผ." | "ร." | "ข.ร." | "ข.ส.";
function normalizeRemark(raw: string): RemarkKey | null {
  const s = (raw ?? "").trim();
  if (!s) return null;
  const t = s
    .replace(/\s+/g, "")
    .replace("ผ่าน", "ผ.")
    .replace("ไม่ผ่าน", "ม.ผ.")
    .replace("รอ", "ร.")
    .replace("ขาดเรียน", "ข.ร.")
    .replace("ขาดสอบ", "ข.ส.");

  if (["ผ.", "ม.ผ.", "ร.", "ข.ร.", "ข.ส."].includes(t)) return t as RemarkKey;
  if (t === "ผ") return "ผ.";
  if (t === "ม.ผ") return "ม.ผ.";
  if (t === "ร") return "ร.";
  if (t === "ข.ร") return "ข.ร.";
  if (t === "ข.ส") return "ข.ส.";
  return null;
}

function summarizeGradesAndRemarks(data: StudentGroupGradeResponse) {
  const gradeCounts: Record<GradeBucket, number> = {
    4: 0,
    3.5: 0,
    3: 0,
    2.5: 0,
    2: 0,
    1.5: 0,
    1: 0,
    0: 0,
  };
  const remarkCounts: Record<RemarkKey, number> = {
    "ผ.": 0,
    "ม.ผ.": 0,
    "ร.": 0,
    "ข.ร.": 0,
    "ข.ส.": 0,
  };

  for (const s of data.subjectGrades ?? []) {
    const rk = normalizeRemark(s.remarks ?? "");
    if (rk) {
      remarkCounts[rk] += 1;
      continue;
    }
    const g =
      typeof s.finalGrade === "string"
        ? Number((s.finalGrade as string).replace(",", "."))
        : Number(s.finalGrade);

    if ([4, 3.5, 3, 2.5, 2, 1.5, 1, 0].includes(g)) {
      gradeCounts[g as GradeBucket] += 1;
    }
  }

  const totalEligible = Object.values(gradeCounts).reduce((a, b) => a + b, 0);
  return { gradeCounts, remarkCounts, totalEligible };
}
interface DataList {
  data: StudentGroupGradeResponse;
}

const StudentScoreInSubjectPDF = ({ data }: DataList) => {
  const { gradeCounts, remarkCounts, totalEligible } =
    summarizeGradesAndRemarks(data);

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

  doc.text("รบ. 3 ป", 180, 51);

  doc.text("สมุดประเมินผลรายวิชา", pageWidth / 2, 61, {
    align: "center",
  });

  let Classifier = "";
  if (data.class.trim() === "ปวส") {
    Classifier = "ระดับประกาศนียบัตรวิชาชีพชั้นสูง";
  } else {
    Classifier = "ระดับประกาศนียบัตรวิชาชีพ";
  }

  doc.text(`${Classifier}`, pageWidth / 2, 67, {
    align: "center",
  });
  doc.setFontSize(14);
  doc.text("ระดับชั้น", 15, 77);
  doc.text(data.class + "." + data.groupName + `  รอบ ${data.section}`, 35, 77);
  doc.text(
    `ภาคเรียนที่   ${defaultTerm}   ปีการศึกษา   ${currentYear}`,
    105,
    77
  );

  doc.text(`รายวิชา ${data.subjectName || "ยังไม่ทราบรายวิชา"}`, 15, 83);
  doc.text(`รหัสวิชา ${data.subjectCode || "00000-0000"}`, 105, 83);
  doc.text(`หน่วยกิต ${data.credits || "-"}`, 150, 83);

  doc.text(`เวลาเรียน ${data.hour}`, 15, 89);

  doc.text(
    `อาจารย์ผู้สอน ${data.subjectTeacher || "ทดสอบชื่อ ทดสอบนามสกุล"} `,
    80,
    98
  );
  doc.text(
    `อาจารย์ที่ปรึกษา...........................................................................`,
    80,
    104
  );

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

  doc.line(119, 136, 119, 163); // vertical
  doc.line(133, 136, 133, 163); // vertical
  doc.line(147, 136, 147, 163); // vertical
  doc.line(161, 136, 161, 163); // vertical

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

  doc.text("จำนวนนักศึกษา", 60, 126.5);
  doc.text("ที่ได้ผลการเรียน", 60, 133);

  doc.text("จำนวนนักศึกษา", 133, 126.5);
  doc.text("ที่ได้ผลการเรียน", 133, 133);

  doc.text("หมายเหตุ", 179, 126.5);

  doc.text(`${data.subjectGrades.length}`, 22.5, 153.5);

  doc.text("4", 37, 140);
  doc.text("3.5", 44, 140);
  doc.text("3", 55.5, 140);
  doc.text("2.5", 62, 140);
  doc.text("2", 73, 140);
  doc.text("1.5", 80, 140);
  doc.text("1", 91, 140);
  doc.text("0", 100, 140);
  //////////////////////
  doc.text("ผ.", 111, 140);
  doc.text("ม.ผ.", 124, 140);
  doc.text("ร.", 139, 140);
  doc.text("ข.ร.", 151, 140);
  doc.text("ข.ส.", 167, 140);

  //// คำนวนคะแนน
  doc.text(String(gradeCounts[4]), 37, 153.5);
  doc.text(String(gradeCounts[3.5]), 46, 153.5);
  doc.text(String(gradeCounts[3]), 55, 153.5);
  doc.text(String(gradeCounts[2.5]), 64, 153.5);
  doc.text(String(gradeCounts[2]), 72, 153.5);
  doc.text(String(gradeCounts[1.5]), 82, 153.5);
  doc.text(String(gradeCounts[1]), 91, 153.5);
  doc.text(String(gradeCounts[0]), 100, 153.5);

  doc.text(String(remarkCounts["ผ."]), 111, 153.5);
  doc.text(String(remarkCounts["ม.ผ."]), 125, 153.5);
  doc.text(String(remarkCounts["ร."]), 139, 153.5);
  doc.text(String(remarkCounts["ข.ร."]), 153, 153.5);
  doc.text(String(remarkCounts["ข.ส."]), 167, 153.5);

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
    239,
    {
      align: "center",
    }
  );
  doc.text("รองผู้อำนวยการฝ่ายวิชาการ", pageWidth / 2, 246, {
    align: "center",
  });

  doc.line(81, 250, 81, 254);
  doc.line(85, 250, 85, 254);
  doc.line(81, 250, 85, 250);
  doc.line(81, 254, 85, 254);
  doc.text("อนุมัติ", 90, 253);

  doc.line(111, 250, 111, 254);
  doc.line(115, 250, 115, 254);
  doc.line(111, 250, 115, 250);
  doc.line(111, 254, 115, 254);
  doc.text("ไม่อนุมัติ", 119, 253);
  doc.text(
    "ลงชื่อ..................................................................................................................",
    pageWidth / 2,
    262,
    {
      align: "center",
    }
  );
  doc.text("ผู้อำนวยการ", pageWidth / 2, 269, {
    align: "center",
  });
  doc.text("......../......../........", pageWidth / 2, 277, {
    align: "center",
  });

  // Next page.....
  doc.addPage();
  doc.setFontSize(14);
  doc.text(`รายชื่อนักเรียน ${data.class}.${data.groupName}`, 36, 10, {
    align: "center",
  });
  doc.setFontSize(14);
  doc.text(`รหัสวิชา ${data.subjectCode} วิชา ${data.subjectName}`, 120, 10, {
    align: "center",
  });

  doc.setFontSize(12);

  doc.line(4, 4, 4, 15); // เส้นเริ่มแนวตั้ง
  doc.line(205, 4, 205, 15); // เส้นเริ่มแนวนอนอีกอัน
  doc.line(4, 4, 205, 4); // เส้นเริ่ม แนวนอน
  // doc.line(205, 291, 4, 291);

  doc.line(4, 12, 205, 12);
  let checkNewPage = false;
  autoTable(doc, {
    startY: 12,
    body: [
      [
        "ลำดับ",
        "รหัสนักศึกษา",
        `   ชื่อ - นามสกุล   `,
        "จิตพิสัย",
        "ทดสอบ",
        "ภาระงาน",
        "กลางภาค",
        "ปลายภาค",
        "รวม",
        "เกรด",
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
      3: { cellWidth: 16 },
      4: { cellWidth: 16 },
      5: { cellWidth: 17 },
      6: { cellWidth: 17 },
      7: { cellWidth: 17 },
      8: { cellWidth: 10 },
      9: { cellWidth: 10 },
      10: { cellWidth: 13, fontSize: 12 },
    },
    margin: { left: 4, right: 0 },
  });

  doc.setFont("THSarabun");
  let y2 = doc.lastAutoTable.finalY;
  const students = data.subjectGrades;
  if (students) {
    for (let i = 0; i < students.length; i++) {
      autoTable(doc, {
        startY: y2,
        body: [
          [
            i + 1,
            students[i].studentCode,
            `${students[i].prefix} ${students[i].firstName}`,
            `${students[i].lastName}`,
            `${students[i].affectiveScore}`,
            `${students[i].collectScore}`,
            `${students[i].assignmentScore}`,
            `${students[i].midtermScore}`,
            `${students[i].finaltermScore}`,
            `${students[i].totalScore}`,
            `${
              students[i].remarks !== ""
                ? students[i].remarks
                : students[i].finalGrade
            }`,
            ``,
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
          4: { cellWidth: 16 },
          5: { cellWidth: 16 },
          6: { cellWidth: 17 },
          7: { cellWidth: 17 },
          8: { cellWidth: 17 },
          9: { cellWidth: 10 },
          10: { cellWidth: 10 },
          11: { cellWidth: 13 },
        },
        margin: { left: 4, right: 0 },
      });
      y2 = doc.lastAutoTable.finalY;

      if (y2 > 250) {
        if (students.length <= 40) {
          doc.setFontSize(16);
          doc.text(
            "ลงชื่อ.............................................",
            167,
            270,
            {
              align: "center",
            }
          );
          doc.text(
            "(.............................................)",
            170,
            277,
            {
              align: "center",
            }
          );
          doc.text("ผู้ตรวจ", 170, 284, { align: "center" });
        }
        checkNewPage = true;
        doc.addPage();
        y2 = 14;
      }
    }
  }

  if (students.length <= 40 && checkNewPage != true) {
    doc.setFontSize(16);
    doc.text("ลงชื่อ.............................................", 167, 270, {
      align: "center",
    });
    doc.text("(.............................................)", 170, 277, {
      align: "center",
    });
    doc.text("ผู้ตรวจ", 170, 284, { align: "center" });
  } else if (students.length > 40) {
    if (checkNewPage != true) {
      doc.addPage();
    }
    let y3 = y2 + 14;
    doc.setFontSize(16);
    doc.text("ลงชื่อ.............................................", 165, y3, {
      align: "center",
    });
    doc.text(
      "(.............................................)",
      167 + 3,
      y3 + 6,
      {
        align: "center",
      }
    );
    doc.text("ผู้ตรวจ", 167 + 3, y3 + 13, { align: "center" });
  }

  doc.save(`ใบคะแนนวิชา ${data.subjectName} ${data.groupName}.pdf`);
};
export default StudentScoreInSubjectPDF;
