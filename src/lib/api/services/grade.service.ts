import { BaseService } from "./base/base.service";
import { GRADE_ENDPOINTS } from "../endpoints/grade.endpoints";
import {
  BulkUpdateStudentGradeByScheduleSubjectIdRequest,
  GetGroupSummaryGradeRequest,
  GetStudentGradesByTermYearRequest,
  GetStudentIfGradeBelowRequest,
  UpdateStudentGradeScoreRequest,
  UpsertStudentGradesRequest,

} from "../models/grade/grade.request";

import {
  GetGroupSummaryGradeResponse,
  GetStudentDetailAndSummaryScoreByStudentCodeResponse,
  GetStudentGradesByTermYearResponse,
  GetStudentGroupGradeByScheduleSubjectIdResponse,
  GetStudentIfGradeBelowResponse,
} from "../models/grade/grade.response";

export class GradeService extends BaseService {

  async getSummaryGrade(
    params: GetGroupSummaryGradeRequest
  ): Promise<GetGroupSummaryGradeResponse> {
    return this.get<GetGroupSummaryGradeResponse>(
      GRADE_ENDPOINTS.GET_GRADE_GROUP_SUMMARY_GRADE,
      params
    );
  }
  
  async getStudentGradesByTermYear(
    params : GetStudentGradesByTermYearRequest
  ) : Promise<GetStudentGradesByTermYearResponse> {
    return this.get<GetStudentGradesByTermYearResponse>(
      GRADE_ENDPOINTS.GET_GRADE_STUDENT_GRADES_BY_TERM_YEAR,
      params
    );
  }

  async BulkUpdateStudentGradeByScheduleSubjectId(
    scheduleSubjectId : number,
    params: BulkUpdateStudentGradeByScheduleSubjectIdRequest[]
  ) : Promise<void> {
    return this.put<void>(
      `${GRADE_ENDPOINTS.UPDATE_BULKUPDATE_STUDENTS_GRADE_BY_SCHEDULE_SUBJECT_ID}?scheduleSubjectId=${scheduleSubjectId}`,
      params
    );
  }

  async GetStudentDetailAndSummaryScoreByStudentCode(
    studentCode: string
  ): Promise<GetStudentDetailAndSummaryScoreByStudentCodeResponse> {
    return this.get<GetStudentDetailAndSummaryScoreByStudentCodeResponse>(
      `${GRADE_ENDPOINTS.GET_GRADE_STUDENT_DETAIL_AND_SUMMARY_SCORE_BY_STUDENT_CODE}?studentCode=${studentCode}`
    );
  }
  async getStudentGroupGradeByScheduleSubjectId(
    scheduleSubjectId: number
  ): Promise<GetStudentGroupGradeByScheduleSubjectIdResponse> {
    return this.get<GetStudentGroupGradeByScheduleSubjectIdResponse>(
      `${GRADE_ENDPOINTS.GET_GRADE_STUDENT_GROUP_GRADE_BY_SCHEDULE_SUBJECT_ID}?scheduleSubjectId=${scheduleSubjectId}`
    );
  }

  async getStudentIfGradeBelow(
    params : GetStudentIfGradeBelowRequest
  ) : Promise<GetStudentIfGradeBelowResponse> {
    return this.get<GetStudentIfGradeBelowResponse>(
      GRADE_ENDPOINTS.GET_GRADE_STUDENT_IF_GRADE_BELOW,
      params
    );
  }
  async updateStudentGradeByGradeId(
    params : UpdateStudentGradeScoreRequest
  ) : Promise<string> {
    try {
      const response = await this.client.put(
        GRADE_ENDPOINTS.UPDATE_STUDENT_GRADE_BY_GRADE_ID,
        params
      );
      
      // Handle the specific response format for this endpoint
      if (response.status === 200) {
        // The API returns { "message": "Student grade updated successfully." }
        return response.data?.message || "Grade updated successfully";
      }
      
      throw new Error("Failed to update student grade");
    } catch (error: any) {
      // If it's already an error with a message, re-throw it
      if (error.response?.status === 200 && error.response?.data?.message) {
        return error.response.data.message;
      }
      throw error;
    }
  }

    async upsertStudentGrades(
    params: UpsertStudentGradesRequest
  ): Promise<void> {
    return this.put<void>(
      GRADE_ENDPOINTS.POST_GRADE_UPSERTSTUDENT_GRADES,
      params
    );
  }

  async deleteGrade(
    gradeId: number
  ): Promise<void> {
    return this.delete<void>(
      `${GRADE_ENDPOINTS.DELETE_GRADE_DELETE_GRADE}/${gradeId}`
    );
  }

}

export const gradeService = new GradeService();