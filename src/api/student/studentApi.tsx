import { StudentCreateData } from "@/dto/studentDto";

export const fetchCreateStudentAsync = async (
  studentData: StudentCreateData
) => {
  try {
    const response = await fetch(
      "http://139.59.253.55:5111/api/Student/CreateStudent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to post data");
    }

    const data = await response.json();
    console.log("Posted Data:", data);
  } catch (err) {
    console.error("Error:", err);
  }
};
