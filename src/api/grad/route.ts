import {
  BulkUpdateStudentGradeResponse,
  GradBelowResponse,
  StudentGradesResponse,
  StudentGroupGrade,
  StudentGroupGradeResponse,
  StudentGroupGrades,
  StudentInfo,
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

    if (data && data.studentGrades) {
      data.studentGrades.sort((a, b) =>
        a.studentCode.localeCompare(b.studentCode, "en", { numeric: true })
      );
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

    return response.data.data;
  } catch (error) {
    console.error("Error fetching student group grades:", error);
    return null;
  }
};

export const GetStudentIfGradeBelow = async (
  className: string,
  currentLavel: number,
  grade: number,
  term: string,
  year: number
): Promise<GradBelowResponse[]> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: GradBelowResponse[];
    }>(
      `Grade/GetStudentIfGradeBelow?className=${className}&currentLevel=${currentLavel}&grade=${grade}&term=${term}&year=${year}`
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
): Promise<StudentInfo[]> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: StudentInfo[];
    }>(
      `Grade/GetStudentIfGradeAbove?studentGroupId=${groupID}&gradeThreshold=${grade}`
    );

    const list = response.data.data ?? [];
    const sorted = [...list].sort((a, b) =>
      (a.studentCode ?? "").localeCompare(b.studentCode ?? "", "en", {
        numeric: true,
        sensitivity: "base",
      })
    );

    return sorted;
  } catch (err) {
    console.log(err);
    return [];
  }
};
