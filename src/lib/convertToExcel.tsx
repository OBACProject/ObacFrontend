import { convertGradBySubjectId } from "@/dto/gradDto";
import ExcelJS from "exceljs";

export async function ConvertToExcel(
  data: convertGradBySubjectId[],
  term: string,
  year: string,
  subjectCode: string,
  subjectName: string,
  classroom: string
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Grades");

  worksheet.mergeCells("A1:H1");
  const header1 = worksheet.getCell("A1");
  header1.value = `ภาคเรียนที่ ${term} ปีการศึกษา ${year}`;
  header1.alignment = { horizontal: "center", vertical: "middle" };
  header1.font = { size: 14, bold: true };
  worksheet.getRow(1).height = 20;

  worksheet.mergeCells("A2:H2");
  const header2 = worksheet.getCell("A2");
  header2.value = `รหัสวิชา ${subjectCode} : ${subjectName}`;
  header2.alignment = { horizontal: "center", vertical: "middle" };
  header2.font = { size: 12, bold: true };
  worksheet.getRow(2).height = 18;

  const headerRow = worksheet.addRow([
    "ลำดับ",
    "รหัสนักเรียน",
    "ชื่อ-นามสกุล",
    "ห้องเรียน",
    "คะแนนจิตพิสัย (20)",
    "คะแนนเก็บ (50)",
    "คะแนนสอบ (30)",
    "คะแนนรวม",
  ]);

  // Style the header row
  headerRow.eachCell((cell) => {
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.font = { bold: true, size: 10 };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });
  worksheet.getRow(headerRow.number).height = 15;

  worksheet.columns = [
    { key: "index", width: 8 },
    { key: "studentCode", width: 15 },
    { key: "name", width: 25 },
    { key: "classroom", width: 10 },
    { key: "affectiveScore", width: 15 },
    { key: "collectScore", width: 15 },
    { key: "testScore", width: 15 },
    { key: "totalScore", width: 15 },
  ];

  data.forEach((item, index) => {
    const row = worksheet.addRow([
      index + 1, // ลำดับ
      item.studentCode, // รหัสนักเรียน
      item.name, // ชื่อ-นามสกุล
      classroom, // ห้องเรียน
      item.affectiveScore, // คะแนนจิตพิสัย (20)
      item.collectScore, // คะแนนเก็บ (50)
      item.testScore, // คะแนนสอบ (30)
      item.totalScore, // คะแนนรวม
    ]);
    row.eachCell((cell) => {
      cell.font = { size: 10 };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    row.height = 15;
  });

  // Save the Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  const filename = `ห้องเรียน ${classroom} Grade.xlsx`;

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
