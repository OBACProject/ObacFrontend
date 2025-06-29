
import {
    CreateSubjectRequest,
  GetSubjectByIdRequest,
  GetSubjectByTermRequest,
  UpdateSubjectRequest,
} from "@/lib/api/models/subject/subject.request";
import {
  CreateSubjectResponse,
  DeleteSubjectResponse,
  GetAllActiveSubjectsResponse,
  GetAllSubjectAsyncResponse,
  GetSubjectByIdResponse,
  UpdateSubjectResponse,
} from "@/lib/api/models/subject/subject.response";
import { subjectService } from "@/lib/api/services/subject.service";
import {
  BaseCreateMutation,
  BaseUpdateMutation,
  BaseDeleteMutation,
} from "./base/base.mutation";
import { BaseQuery } from "./base/base.queries";

export const getAllSubjectsQuery = new BaseQuery<GetAllSubjectAsyncResponse, void>(
  () => ["subjects", "all"],
  () => subjectService.getAllSubjects()
);

export const getAllActiveSubjectsQuery = new BaseQuery<GetAllActiveSubjectsResponse, void>(
  () => ["subjects", "active"],
  () => subjectService.getAllActiveSubjects()
);

export const getSubjectByIdQuery = new BaseQuery<GetSubjectByIdResponse[], GetSubjectByIdRequest>(
  (params) => ["subjects", "byId", params.subjectId], 
  (params) => subjectService.getSubjectById(params)
);

export const getSubjectByTermQuery = new BaseQuery<any, GetSubjectByTermRequest>(
  (params) => ["subjects", "byTerm", params.term],
  (params) => subjectService.getSubjectByTerm(params)
);

export const createSubjectMutation = new BaseCreateMutation<
  CreateSubjectResponse[],
  CreateSubjectRequest
>((params) => subjectService.createSubject(params));

export const updateSubjectMutation = new BaseUpdateMutation<
  UpdateSubjectResponse[],
  UpdateSubjectRequest
>((params) => subjectService.updateSubject(params));

export const deleteSubjectMutation = new BaseDeleteMutation<
  DeleteSubjectResponse[],
  GetSubjectByIdRequest
>((params) => subjectService.deleteSubject(params));
