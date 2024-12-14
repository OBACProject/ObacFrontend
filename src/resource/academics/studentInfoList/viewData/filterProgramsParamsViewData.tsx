import { filterProgramsParamsData, EducationData } from "@/dto/studentDto";
import { filterProgramsData } from "../api/filterProgramsApiParams";

export const filterProgramsViewData = async (): Promise<EducationData[]> => {
  try {
    const data = await filterProgramsData();

    const groupedData = data.reduce(
      (acc: Record<string, EducationData>, item: filterProgramsParamsData) => {
        const { classLevel, facultyName, programName, groupId, groupName } =
          item;

        // Initialize classLevel if not exists
        if (!acc[classLevel]) {
          acc[classLevel] = {
            classLevel,
            groupsCourse: [],
          };
        }

        // Find the faculty within the classLevel
        let faculty = acc[classLevel].groupsCourse.find(
          (f) => f.facultyName === facultyName
        );

        // If the faculty doesn't exist, add it
        if (!faculty) {
          faculty = {
            facultyName,
            groupProgram: [],
          };
          acc[classLevel].groupsCourse.push(faculty);
        }

        // Find the program within the faculty
        let program = faculty.groupProgram.find(
          (p) => p.programName === programName
        );

        if (!program) {
          program = {
            programName,
            group: [],
          };
          faculty.groupProgram.push(program);
        }

        // Add the group to the program
        program.group.push({
          groupId: parseInt(groupId, 10),
          groupName,
        });

        return acc;
      },
      {}
    );

    // Convert the grouped data back into an array
    const editData: EducationData[] = Object.values(groupedData);
    console.log("editData", editData);
    return editData;
  } catch (error) {
    console.error("Error fetching or transforming data:", error);
    throw error;
  }
};
