import { GetGroupSummaryGradeRequest, GetStudentGradesByTermYearRequest, GetStudentIfGradeBelowRequest, UpsertStudentGradesRequest } from "@/lib/api/models/grade/grade.request";
import {  GetGroupSummaryGradeResponse, GetStudentDetailAndSummaryScoreByStudentCodeResponse, GetStudentIfGradeBelowResponse } from "@/lib/api/models/grade/grade.response";
import { gradeService } from "@/lib/api/services/grade.service";
import { createBaseQuery } from "./base/base.queries";
import { UseMutationOptions } from "@tanstack/react-query";
import { useBaseUpdateMutation } from "./base/base.mutation";



export const useGetGroupSummaryGradeQuery = createBaseQuery<
  GetGroupSummaryGradeResponse,
  GetGroupSummaryGradeRequest
>(
  (params) => ['groupSummaryGrade', params],
  (params) => gradeService.getGroupSummaryGrade(params),
);

export const useGetStudentGradesByTermYearQuery = createBaseQuery<
  GetStudentDetailAndSummaryScoreByStudentCodeResponse,
  GetStudentGradesByTermYearRequest
>(
  (params) => ['studentGradesByTermYear', params],
  (params) => gradeService.getStudentGradesByTermYear(params),
);

export const useGetStudentDetailAndSummaryScoreByStudentCodeQuery = (studentCode: string) => {
  return createBaseQuery<GetStudentDetailAndSummaryScoreByStudentCodeResponse, string>(
    () => ['studentDetailAndSummaryScore', studentCode],
    () => gradeService.GetStudentDetailAndSummaryScoreByStudentCode(studentCode),
  )
};

export const useGetStudentGroupGradeByScheduleSubjectIdQuery = (scheduleSubjectId: number) => {
  return createBaseQuery<GetStudentDetailAndSummaryScoreByStudentCodeResponse, number>(
    () => ['studentGroupGrade', scheduleSubjectId],
    () => gradeService.getStudentGroupGradeByScheduleSubjectId(scheduleSubjectId),
  )
};

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