import { BaseService } from "./base/base.service";
import { GRADE_ENDPOINTS } from "../endpoints/grade.endpoints";
import {
  GetStudentGradesByTermYearRequest,
  GetStudentIfGradeBelowRequest,
  GetStudentGradeAboveRequest,
  GetStudentTranscriptRequest,
  GetGroupSummaryGradeRequest,
  UpsertStudentGradesRequest,
  // GetGroupSummaryGradeAvailableStatusRequest,
  // GetStudentGroupGradeByGroupIdTermYearRequest,
  // UpdateStudentGradeRequest,
  // PublishGradeRequest,
} from "../models/grade/grade.request";

import {
  GetGradBelowResponse,
  GetGradPerTermYearByStudentIdResponse,
  GetGroupSummaryGradeResponse,
  GetStudentDetailAndSummaryScoreByStudentCodeResponse,
  GetStudentGroupGradeAboveResponse,
  StudentTranscriptResponse,
} from "../models/grade/grade.response";

export class GradeService extends BaseService {
  async getStudentGrades(
    params: GetStudentGradesByTermYearRequest
  ): Promise<GetGradPerTermYearByStudentIdResponse> {
    return this.get<GetGradPerTermYearByStudentIdResponse>(
      GRADE_ENDPOINTS.GET_GRADE_STUDENT_GRADES_BY_TERM_YEAR,
      params
    );
  }

   async getGradeSummary(
    params: GetGroupSummaryGradeRequest
  ): Promise<GetGroupSummaryGradeResponse> {
    return this.get<GetGroupSummaryGradeResponse>(
      GRADE_ENDPOINTS.GET_GRADE_GROUP_SUMMARY_GRADE,
      params
    );
  }

  async getStudentGradesByTermYear(
    params: GetStudentGradesByTermYearRequest
  ): Promise<GetGradPerTermYearByStudentIdResponse> {
    return this.get<GetGradPerTermYearByStudentIdResponse>(
      GRADE_ENDPOINTS.GET_GRADE_STUDENT_GRADES_BY_TERM_YEAR,
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
