import { BaseService } from './base/base.service';
import { GRADE_ENDPOINTS } from '../endpoints/grade.endpoints';
import {
    GetStudentGradesByTermYearRequest,
    GetStudentIfGradeBelowRequest,
    GetStudentGradeAboveRequest,
    GetStudentTranscriptRequest,
    GetGroupSummaryGradeRequest,
    GetGroupSummaryGradeAvailableStatusRequest,
    GetStudentGroupGradeByGroupIdTermYearRequest,
    UpdateStudentGradeRequest,
    PublishGradeRequest,
} from '../models/grade/grade.request';

import {
    GetGradBelowResponse,
    GetGradPerTermYearByStudentIdResponse,
    GetGroupSummaryGradeResponse,
    GetStudentGroupGradeAboveResponse,
    StudentTranscriptResponse,
} from '../models/grade/grade.response';


export class GradeService extends BaseService {
  async getStudentGrades(params: GetStudentGradesByTermYearRequest): Promise<GetGradPerTermYearByStudentIdResponse> {
    return this.get<GetGradPerTermYearByStudentIdResponse>(GRADE_ENDPOINTS.GET_STUDENT_GRADE_BY_TERM_YEAR, params);
  }

  async getStudentsBelowGrade(params: GetStudentIfGradeBelowRequest): Promise<GetGradBelowResponse[]> {
    return this.get<GetGradBelowResponse[]>(GRADE_ENDPOINTS.GET_STUDENT_IF_GRADE_BELOW, params);
  }

  async getGroupGradesAbove(params: GetStudentGradeAboveRequest): Promise<GetStudentGroupGradeAboveResponse[]> {
    return this.get<GetStudentGroupGradeAboveResponse[]>(GRADE_ENDPOINTS.GET_GROUP_GRADE_ABOVE, params);
  }

  async getStudentTranscript(params : GetStudentTranscriptRequest): Promise<StudentTranscriptResponse> {
    return this.get<StudentTranscriptResponse>(
      `${GRADE_ENDPOINTS.GET_STUDENT_TRANSCRIPT , params}/`
    );
  }

  async getGradeSummary(params: GetGroupSummaryGradeRequest): Promise<GetGroupSummaryGradeResponse> {
    return this.get<GetGroupSummaryGradeResponse>(GRADE_ENDPOINTS.GET_GROUP_SUMMARY_GRADE, params);
  }

//   async getGradeStatistics(
//     subjectId: number,
//     classId: number,
//     term: number,
//     year: number
//   ): Promise<GradeStatisticsResponse> {
//     return this.get<GradeStatisticsResponse>(GRADE_ENDPOINTS.GET_STATISTICS, {
//       subjectId,
//       classId,
//       term,
//       year,
//     });
//   }

//   // Create new grade
//   async createGrade(data: CreateGradeRequest): Promise<StudentGradeResponse> {
//     return this.post<StudentGradeResponse>(GRADE_ENDPOINTS.CREATE, data);
//   }

//   // Update grade
//   async updateGrade(gradeId: number, data: UpdateGradeRequest): Promise<StudentGradeResponse> {
//     return this.put<StudentGradeResponse>(`${GRADE_ENDPOINTS.UPDATE}/${gradeId}`, data);
//   }

//   // Delete grade
//   async deleteGrade(gradeId: number): Promise<void> {
//     return this.delete<void>(`${GRADE_ENDPOINTS.DELETE}/${gradeId}`);
//   }

//   // Bulk update grades
//   async bulkUpdateGrades(data: BulkGradeUpdateRequest): Promise<StudentGradeResponse[]> {
//     return this.post<StudentGradeResponse[]>(GRADE_ENDPOINTS.BULK_UPDATE, data);
//   }

}

export const gradeService = new GradeService();