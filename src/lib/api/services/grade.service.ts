import { BaseService } from "./base/base.service";
import { GRADE_ENDPOINTS } from "../endpoints/grade.endpoints";
import {
  GetGroupSummaryGradeRequest,
  GetStudentGradesByTermYearRequest,
  GetStudentIfGradeBelowRequest,
  UpsertStudentGradesRequest,

} from "../models/grade/grade.request";

import {
  GetGroupSummaryGradeResponse,
  
  GetStudentGroupGradeAboveResponse,
  StudentTranscriptResponse,
  GetStudentIfGradeBelowResponse,
  GetStudentDetailAndSummaryScoreByStudentCodeResponse,
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
  ) : Promise<GetStudentDetailAndSummaryScoreByStudentCodeResponse> {
    return this.get<GetStudentDetailAndSummaryScoreByStudentCodeResponse>(
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
  async getStudentGroupGradeByScheduleSubjectId(
    scheduleSubjectId: number
  ): Promise<GetStudentDetailAndSummaryScoreByStudentCodeResponse> {
    return this.get<GetStudentDetailAndSummaryScoreByStudentCodeResponse>(
      `${GRADE_ENDPOINTS.GET_GRADE_STUDENT_GROUP_GRADE_BY_SCHEDULE_SUBJECT_ID}/${scheduleSubjectId}`
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
