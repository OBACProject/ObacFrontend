import { SUBJECT_ENDPOINTS } from "../endpoints/subject.endpoint";
import { GetSubjectByIdRequest, GetSubjectByTermRequest } from "../models/subject/subject.request";
import { CreateSubjectResponse, DeleteSubjectResponse, GetAllActiveSubjectsResponse, GetAllSubjectAsyncResponse, GetSubjectByIdResponse, UpdateSubjectResponse } from "../models/subject/subject.response";
import { BaseService } from "./base/base.service";




export class SubjectService extends BaseService {
    async getAllSubjects(): Promise<GetAllSubjectAsyncResponse>{

        return this.get<GetAllSubjectAsyncResponse>(SUBJECT_ENDPOINTS.GET_ALL_SUBJECTS);
    }

    async getAllActiveSubjects(): Promise<GetAllActiveSubjectsResponse> {
        return this.get<GetAllSubjectAsyncResponse>(SUBJECT_ENDPOINTS.GET_ALL_ACTIVE_SUBJECTS);
    }
    async getSubjectById(params: GetSubjectByIdRequest): Promise<GetSubjectByIdResponse[]> {
        return this.get<GetSubjectByIdResponse[]>(SUBJECT_ENDPOINTS.GET_SUBJECT_BY_ID, params);
    }

    async createSubject(params: any): Promise<CreateSubjectResponse[]> {
        return this.post<CreateSubjectResponse[]>(SUBJECT_ENDPOINTS.CREATE_SUBJECT, params);
    }

    async updateSubject(params: any): Promise<UpdateSubjectResponse[]> {
        return this.put<CreateSubjectResponse[]>(SUBJECT_ENDPOINTS.UPDATE_SUBJECT, params);
    }

    async deleteSubject(params: GetSubjectByIdRequest): Promise<DeleteSubjectResponse[]> {
        return this.delete<DeleteSubjectResponse[]>(SUBJECT_ENDPOINTS.DELETE_SUBJECT , params);
    }

    async getSubjectByTerm(params : GetSubjectByTermRequest): Promise<any> {
        return this.get<any>(SUBJECT_ENDPOINTS.GET_SUBJECT_BY_TERM, params);
    }
}

export const subjectService = new SubjectService();