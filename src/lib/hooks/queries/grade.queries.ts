import { GetGroupSummaryGradeRequest, GetStudentGradesByTermYearRequest, UpsertStudentGradesRequest } from "@/lib/api/models/grade/grade.request";
import { GetGradPerTermYearByStudentIdResponse, GetGroupSummaryGradeResponse, GetStudentDetailAndSummaryScoreByStudentCodeResponse } from "@/lib/api/models/grade/grade.response";
import { gradeService } from "@/lib/api/services/grade.service";
import { createBaseQuery } from "./base/base.queries";
import { UseMutationOptions } from "@tanstack/react-query";
import { useBaseUpdateMutation } from "./base/base.mutation";



export const useGetGroupSummaryGradeQuery = createBaseQuery<
  GetGroupSummaryGradeResponse,
  GetGroupSummaryGradeRequest
>(
  (params) => ['groupSummaryGrade', params],
  (params) => gradeService.getGradeSummary(params),
);

export const useGetStudentGradesByTermYearQuery = createBaseQuery<
  GetGradPerTermYearByStudentIdResponse,
  GetStudentGradesByTermYearRequest
>(
  (params) => ['studentGradesByTermYear', params],
  (params) => gradeService.getStudentGradesByTermYear(params),
);


// export const useGetStudentDetailAndSummaryScoreByStudentCodeQuery = (studentCode: string) => {
//   return createBaseQuery<GetStudentDetailAndSummaryScoreByStudentCodeResponse>(
//     ['studentDetailAndSummaryScore', studentCode],
//     () => gradeService.GetStudentDetailAndSummaryScoreByStudentCode(studentCode)
//   );
// };
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