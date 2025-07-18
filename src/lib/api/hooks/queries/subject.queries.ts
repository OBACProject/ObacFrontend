import { UseMutationOptions } from "@tanstack/react-query";
import { CreateSubjectRequest, DeleteSubjectRequest, GetSubjectByIdRequest, GetSubjectByTermRequest, GetSubjectsByStudentGroupIdTermYearRequest, UpdateSubjectRequest } from "../../models/subject/subject.request";
import { CreateSubjectResponse, DeleteSubjectResponse, GetAllActiveSubjectsResponse, GetAllSubjectAsyncResponse, GetSubjectByIdResponse, GetSubjectByTermResponse, GetSubjectsByStudentGroupIdTermYearResponse, UpdateSubjectResponse } from "../../models/subject/subject.response";
import { subjectService } from "../../services/subject.service";
import { createBaseQuery } from "./base/base.queries";
import { useBaseUpdateMutation } from "./base/base.mutation";

export const useGetAllSubjectsQuery = createBaseQuery<GetAllSubjectAsyncResponse[], void>(
    (params) => ['Subjects', params],
    (params) => subjectService.getAllSubjects(),
);

export const usegetAllActiveSubjectsQuery = createBaseQuery<GetAllActiveSubjectsResponse[], void>(
    (params) => ['Subjects', params],
    (params) => subjectService.getAllActiveSubjects(),
);

export const usegetSubjectByIdQuery = createBaseQuery<GetSubjectByIdResponse[], GetSubjectByIdRequest>(
    (params) => ['Subject_Id', params],
    (params) => subjectService.getSubjectById(params),
);




export const useCreateSubjectMutation = (options? : Partial<UseMutationOptions<CreateSubjectResponse[] , Error , CreateSubjectRequest  >>) => {
  return useBaseUpdateMutation<CreateSubjectResponse[] , CreateSubjectRequest, Error>(
    subjectService.createSubject.bind(subjectService),
    options
  );
}

export const useUpdateSubjectMutation = (options? : Partial<UseMutationOptions<UpdateSubjectResponse[] , Error , UpdateSubjectRequest  >>) => {
  return useBaseUpdateMutation<CreateSubjectResponse[] , UpdateSubjectRequest, Error>(
    subjectService.updateSubject.bind(subjectService),
    options
  );
}

export const useDeleteSubjectMutation = (options? : Partial<UseMutationOptions<DeleteSubjectResponse[] , Error , DeleteSubjectRequest  >>) => {
  return useBaseUpdateMutation<DeleteSubjectResponse[] , DeleteSubjectRequest, Error>(
    subjectService.deleteSubject.bind(subjectService),
    options
  );
}

export const useGetSubjectByTermMutation = (options? : Partial<UseMutationOptions<GetSubjectByTermResponse[] , Error , GetSubjectByTermRequest  >>) => {
  return useBaseUpdateMutation<GetSubjectByTermResponse[] , GetSubjectByTermRequest, Error>(
    subjectService.getSubjectByTerm.bind(subjectService),
    options
  );
}

export const getSubjectsByStudentGroupIdTermYearMutation = (options? : Partial<UseMutationOptions<GetSubjectsByStudentGroupIdTermYearResponse, Error , GetSubjectsByStudentGroupIdTermYearRequest  >>) => {
  return useBaseUpdateMutation<GetSubjectsByStudentGroupIdTermYearResponse , GetSubjectsByStudentGroupIdTermYearRequest, Error>(
    subjectService.getSubjectsByStudentGroupIdTermYear.bind(subjectService),
    options
  );
}
