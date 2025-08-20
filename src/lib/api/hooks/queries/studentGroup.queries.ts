import { createBaseQuery } from "./base/base.queries";
import { studentGroupService } from "@/lib/api/services/studentGroup.service";
import { GetAllStudentGroupByTermYearResponse, GetStudentGroupByGroupIdResponse, GetStudentGroupScheduleStatusResponse } from "@/lib/api/models/studentGroup/studentGroup.response";
import { GetAllStudentGroupByTermYearRequest, GetStudentGroupScheduleStatusRequest, UpdateStudentGroupByStudentGroupIdRequest } from "@/lib/api/models/studentGroup/studentGroup.request";
import { useBaseUpdateMutation } from "./base/base.mutation";
import { UseMutationOptions } from "@tanstack/react-query";





export const useGetAllStudentGroupByTermYearQuery = createBaseQuery<GetAllStudentGroupByTermYearResponse[], GetAllStudentGroupByTermYearRequest>(
    (params) => ['studentGroup', params],
    (params) => studentGroupService.getAllStudentGroups(params),
);

export const useGetStudentGroupByGroupIdQuery = createBaseQuery<GetStudentGroupByGroupIdResponse, string>(
    (groupId) => ['studentGroup', groupId],
    (groupId) => studentGroupService.getStudentGroupByGroupId(groupId),
);

export const useGetStudentGroupScheduleStatusQuery = createBaseQuery<GetStudentGroupScheduleStatusResponse[], GetStudentGroupScheduleStatusRequest>(
    (params) => ['studentGroup', params],
    (params) => studentGroupService.getStudentGroupScheduleStatus(params),
);

export const useUpdateStudentGroupByStudentGroupIdMutation = (options? : Partial<UseMutationOptions<void , Error , UpdateStudentGroupByStudentGroupIdRequest  >>) => {
  return useBaseUpdateMutation<void , UpdateStudentGroupByStudentGroupIdRequest, Error>(
    studentGroupService.updateStudentGroupByStudentGroupId.bind(studentGroupService),
    options
  );
}

export const useUpdatePublishStatusByStudentGroupIdMutation = (options? : Partial<UseMutationOptions<void , Error , { studentGroupId: number; isPublished: boolean }>>) => {
  return useBaseUpdateMutation<void, { studentGroupId: number; isPublished: boolean }, Error>(
    ({ studentGroupId, isPublished }) => studentGroupService.updatePublishStatusByStudentGroupId(studentGroupId, isPublished),
    options
  );
}