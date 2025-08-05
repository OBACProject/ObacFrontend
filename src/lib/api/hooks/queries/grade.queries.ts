import { BulkUpdateStudentGradeByScheduleSubjectIdRequest, GetGroupSummaryGradeRequest, GetStudentGradesByTermYearRequest, GetStudentIfGradeBelowRequest, UpdateStudentGradeScoreRequest, UpsertStudentGradesRequest } from "@/lib/api/models/grade/grade.request";
import {  GetGroupSummaryGradeResponse, GetStudentDetailAndSummaryScoreByStudentCodeResponse, GetStudentGradesByTermYearResponse, GetStudentGroupGradeByScheduleSubjectIdResponse, GetStudentIfGradeBelowResponse } from "@/lib/api/models/grade/grade.response";
import { gradeService } from "@/lib/api/services/grade.service";
import { createBaseQuery } from "./base/base.queries";
import { UseMutationOptions } from "@tanstack/react-query";
import { useBaseUpdateMutation } from "./base/base.mutation";



export const useGetGroupSummaryGradeQuery = createBaseQuery<
  GetGroupSummaryGradeResponse,
  GetGroupSummaryGradeRequest
>(
  (params) => ['groupSummaryGrade', params],
  (params) => gradeService.getSummaryGrade(params),
);

export const useGetStudentGradesByTermYearQuery = createBaseQuery<
  GetStudentGradesByTermYearResponse,
  GetStudentGradesByTermYearRequest
>(
  (params) => ['studentGradesByTermYear', params],
  (params) => gradeService.getStudentGradesByTermYear(params),
);

// export const useGetStudentDetailAndSummaryScoreByStudentCodeQuery = createBaseQuery<
//   GetStudentDetailAndSummaryScoreByStudentCodeResponse,
//   GetStudentGradesByTermYearRequest>(
//   (params) => ['studentDetailAndSummaryScore', params],
//   (params) => gradeService.GetStudentDetailAndSummaryScoreByStudentCode(params),
// );

export const useGetStudentDetailAndSummaryScoreByStudentCodeQuery = createBaseQuery<
  GetStudentDetailAndSummaryScoreByStudentCodeResponse,
  string
>(
  (params) => ['studentDetailAndSummaryScore', params],
  (params) => gradeService.GetStudentDetailAndSummaryScoreByStudentCode(params),
);

export const useUpdateStudentGradeByGradeIdMutation = (options? : Partial<UseMutationOptions<string, Error, UpdateStudentGradeScoreRequest>>) => {
  return useBaseUpdateMutation<string, UpdateStudentGradeScoreRequest, Error>(
    gradeService.updateStudentGradeByGradeId.bind(gradeService),
    options
  );
}

export const useBulkUpdateStudentGradeByScheduleSubjectId = (options? : Partial<UseMutationOptions<void, Error, { scheduleSubjectId: number; params: BulkUpdateStudentGradeByScheduleSubjectIdRequest[] }>>) => {
  return useBaseUpdateMutation<void, { scheduleSubjectId: number; params: BulkUpdateStudentGradeByScheduleSubjectIdRequest[] }, Error>(
    ({ scheduleSubjectId, params }) => gradeService.BulkUpdateStudentGradeByScheduleSubjectId(scheduleSubjectId, params),
    options
  );
}

export const useGetStudentGroupGradeByScheduleSubjectIdQuery  = createBaseQuery<GetStudentGroupGradeByScheduleSubjectIdResponse, number>(
    (params) => ['studentGroupGrade', params],
    (params) => gradeService.getStudentGroupGradeByScheduleSubjectId(params),
  )

export const useGetStudentIfGradeBelowQuery = createBaseQuery<
  GetStudentIfGradeBelowResponse,
  GetStudentIfGradeBelowRequest
>(
  (params) => ['studentIfGradeBelow', params],
  (params) => gradeService.getStudentIfGradeBelow(params),
);

export const useUpsertStudentGradesMutation = (options? : Partial<UseMutationOptions<void , Error , UpsertStudentGradesRequest  >>) => {
  return useBaseUpdateMutation<void , UpsertStudentGradesRequest, Error>(
    gradeService.upsertStudentGrades.bind(gradeService),
    options
  );
}

export const useDeleteGradeMutation = (options? : Partial<UseMutationOptions<void , Error , number  >>) => {
  return useBaseUpdateMutation<void , number, Error>(
    gradeService.deleteGrade.bind(gradeService),
    options
  );
}