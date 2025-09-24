import {
  BulkUpdateStudentGradeResponse,
  GradBelowResponse,
  GroupStudentsResponse,
  StudentGradesResponse,
  StudentGroupGrade,
  StudentGroupGradeResponse,
  StudentGroupGrades,
  SubjectGradesTermYear,
} from "@/dto/gradDto";
import {
  GetStudentDetailAndSummaryScoreByStudentCodeResponse,
  UpsertStudentGradesRequest,
} from "@/dto/gradingDto";
import apiClient from "@/lib/apiClient";

export const GetStudentDetailAndSummaryScoreByStudentCode = async (
  studentCode: string
): Promise<GetStudentDetailAndSummaryScoreByStudentCodeResponse | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: GetStudentDetailAndSummaryScoreByStudentCodeResponse;
    }>(`Grade/GetStudentDetailAndSummaryScoreByStudentCode`, {
      params: { studentCode },
    });

    return response.data.data;
  } catch (err) {
    console.error("Error fetching student details:", err);
    return null;
  }
};

export const UpsertStudentGrades = async (
  payload: UpsertStudentGradesRequest
): Promise<boolean> => {
  try {
    const response = await apiClient.put("Grade/UpsertStudentGrades", payload);
    return response.status === 200;
  } catch (err) {
    console.error("Error upserting student grades:", err);
    return false;
  }
};

export const GetStudentGroupGradeByScheduleSubjectId = async (
  scheduleSubjectId: number
): Promise<StudentGroupGradeResponse | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: StudentGroupGradeResponse;
    }>(
      `Grade/GetStudentGroupGradeByScheduleSubjectId?scheduleSubjectId=${scheduleSubjectId}`
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching student group grades:", error);
    return null;
  }
};

export const BulkUpdateStudentGradeByScheduleSubjectId = async (
  scheduleSubjectID: number,
  payload: StudentGroupGrade[]
): Promise<BulkUpdateStudentGradeResponse | null> => {
  try {
    const response = await apiClient.put<BulkUpdateStudentGradeResponse>(
      `Grade/BulkUpdateStudentGradeByScheduleSubjectId?scheduleSubjectId=${scheduleSubjectID}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("API error:", err);
    return null;
  }
};

const TRANSFER_TH = "เทียบโอน" as const;

function isTransfer(term: string): boolean {
  return (term ?? "").trim().startsWith(TRANSFER_TH);
}

function transferIndex(term: string): number {
  const t = (term ?? "").trim();
  const m = t.match(/^เทียบโอน\s*(\d+)/);
  return m ? parseInt(m[1], 10) : 1;
}

function normalTermRank(term: string): number {
  const t = (term ?? "").trim().toLowerCase();
  if (["1", "01", "ภาคต้น", "เทอม1", "semester 1"].includes(t)) return 1;
  if (["2", "02", "ภาคปลาย", "เทอม2", "semester 2"].includes(t)) return 2;
  if (["3", "03", "summer", "ฤดูร้อน"].includes(t)) return 3;
  return 99;
}

export function compareSubjectGradesTermYear(
  a: SubjectGradesTermYear,
  b: SubjectGradesTermYear
): number {
  const aIsTr = isTransfer(a.term);
  const bIsTr = isTransfer(b.term);
  if (aIsTr !== bIsTr) return aIsTr ? -1 : 1;
  if (aIsTr && bIsTr) {
    return transferIndex(a.term) - transferIndex(b.term);
  }
  if (a.year !== b.year) return a.year - b.year;
  return normalTermRank(a.term) - normalTermRank(b.term);
}

export const BulkGetTranscriptByGroupID = async (
  groupID: number
): Promise<StudentGroupGrades | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: StudentGroupGrades;
    }>(`Grade/BulkGetTranscriptByGroupID?studentGroupId=${groupID}`);

    const data = response.data.data;

    if (data?.studentGrades) {
      data.studentGrades.sort((a, b) =>
        String(a.studentCode ?? "").localeCompare(
          String(b.studentCode ?? ""),
          "en",
          { numeric: true }
        )
      );
      for (const stu of data.studentGrades) {
        if (Array.isArray(stu.subjectGradesTermYear)) {
          stu.subjectGradesTermYear.sort(compareSubjectGradesTermYear);
        }
      }
    }

    return data;
  } catch (error) {
    console.error("Error fetching student group grades:", error);
    return null;
  }
};

export const GetTranscriptByStudentID = async (
  studentID: number
): Promise<StudentGradesResponse | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: StudentGradesResponse;
    }>(`Grade/GetTranscriptByStudentID?studentId=${studentID}`);

    const data = response.data.data;
    const transferSet = new Set<string>(["เทียบโอน1", "เทียบโอน2"]);
    const items = data.subjectGradesTermYear ?? [];
    const head = items.filter((x) => transferSet.has(x.term));
    const tail = items.filter((x) => !transferSet.has(x.term));
    data.subjectGradesTermYear = [...head, ...tail];

    return data;
  } catch (error) {
    console.error("Error fetching student group grades:", error);
    return null;
  }
};

export const GetStudentIfGradeBelow = async (
  className: string,
  currentLavel: number,
  grade: number,
  year: number
): Promise<GradBelowResponse[]> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: GradBelowResponse[];
    }>(
      `Grade/GetStudentIfGradeBelow?className=${className}&currentLevel=${currentLavel}&grade=${grade}&year=${year}`
    );

    const list = response.data.data ?? [];

    const parseGroup = (s?: string) => {
      const [maj, min] = (s ?? "").split("/").map((t) => t.trim());
      const major = Number.parseInt(maj, 10);
      const minor = Number.parseInt(min, 10);
      return {
        major: Number.isFinite(major) ? major : Number.MAX_SAFE_INTEGER,
        minor: Number.isFinite(minor) ? minor : Number.MAX_SAFE_INTEGER,
      };
    };

    const sorted = [...list].sort((a, b) => {
      const ga = parseGroup((a as any).groupName);
      const gb = parseGroup((b as any).groupName);

      if (ga.major !== gb.major) return ga.major - gb.major;
      if (ga.minor !== gb.minor) return ga.minor - gb.minor;

      return ((a as any).studentCode ?? "").localeCompare(
        (b as any).studentCode ?? "",
        "en",
        { numeric: true, sensitivity: "base" }
      );
    });

    return sorted;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const GetStudentIfGradeAbove = async (
  groupID: number,
  grade: number
): Promise<GroupStudentsResponse> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: GroupStudentsResponse;
    }>(
      `Grade/GetStudentIfGradeAbove?studentGroupId=${groupID}&gradeThreshold=${grade}`
    );

    const data = response.data.data;

    if (!data) {
      return {
        groupName: "",
        groupCode: "",
        class: "",
        level: 0,
        programId: 0,
        facultyName: "",
        programName: "",
        subProgramName: "",
        term: "",
        year: 0,
        students: [],
      };
    }

    const sortedStudents = [...(data.students ?? [])].sort((a, b) =>
      (a.studentCode ?? "").localeCompare(b.studentCode ?? "", "en", {
        numeric: true,
        sensitivity: "base",
      })
    );

    return { ...data, students: sortedStudents };
  } catch (err) {
    console.log("GetStudentIfGradeAbove error:", err);
    return {
      groupName: "",
      groupCode: "",
      class: "",
      level: 0,
      programId: 0,
      facultyName: "",
      programName: "",
      subProgramName: "",
      term: "",
      year: 0,
      students: [],
    };
  }
};
