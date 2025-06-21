// grade.queries.ts
import { BaseQuery } from '@/lib/hooks/queries/base/base.queries';
import { getGroupSummaryGradeTransform } from '@/lib/transforms/grade.transforms';
import { gradeService } from '@/lib/api/services/grade.service';
import {
  GetGroupSummaryGradeRequest,
  GetStudentGradesByTermYearRequest,
} from '@/lib/api/models/grade/grade.request';
import {
  GetGradPerTermYearByStudentIdResponse,
} from '@/lib/api/models/grade/grade.response';
import { GroupSummaryGradeResponse } from '@/lib/views/grade/grade.view';

export const gradeSummaryQuery = new BaseQuery<GroupSummaryGradeResponse, GetGroupSummaryGradeRequest>(
  (params) => ['group-summary', params],
  (params) => getGroupSummaryGradeTransform(params)
);

export const studentGradesQuery = new BaseQuery<GetGradPerTermYearByStudentIdResponse, GetStudentGradesByTermYearRequest>(
  (params) => ['studentGrades', params],
  (params) => gradeService.getStudentGrades(params)
);
