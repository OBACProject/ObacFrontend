import { SUBJECT_ENDPOINTS } from "../endpoints/subject.endpoint";
import { CreateSubjectRequest, DeleteSubjectRequest, GetSubjectByIdRequest, GetSubjectByTermRequest, GetSubjectsByStudentGroupIdTermYearRequest } from "../models/subject/subject.request";
import { CreateSubjectResponse, DeleteSubjectResponse, GetAllActiveSubjectsResponse, GetAllSubjectAsyncResponse, GetSubjectByIdResponse, GetSubjectsByStudentGroupIdTermYearResponse, UpdateSubjectResponse } from "../models/subject/subject.response";
import { BaseService } from "./base/base.service";




export class SubjectService extends BaseService {
    async getAllSubjects(): Promise<GetAllSubjectAsyncResponse[]>{

        return this.get<GetAllSubjectAsyncResponse[]>(SUBJECT_ENDPOINTS.GET_ALL_SUBJECTS);
    }

    async getAllActiveSubjects(): Promise<GetAllActiveSubjectsResponse[]> {
        return this.get<GetAllSubjectAsyncResponse[]>(SUBJECT_ENDPOINTS.GET_ALL_ACTIVE_SUBJECTS);
    }
    async getSubjectById(params: GetSubjectByIdRequest): Promise<GetSubjectByIdResponse[]> {
        return this.get<GetSubjectByIdResponse[]>(SUBJECT_ENDPOINTS.GET_SUBJECT_BY_ID, params);
    }

    async createSubject(params: CreateSubjectRequest): Promise<CreateSubjectResponse[]> {
        return this.post<CreateSubjectResponse[]>(SUBJECT_ENDPOINTS.POST_CREATE_SUBJECT, params);
    }

    async updateSubject(params: any): Promise<UpdateSubjectResponse[]> {
        return this.put<UpdateSubjectResponse[]>(SUBJECT_ENDPOINTS.PUT_UPDATE_SUBJECT, params);
    }

    async deleteSubject(params: DeleteSubjectRequest): Promise<DeleteSubjectResponse[]> {
        return this.delete<DeleteSubjectResponse[]>(SUBJECT_ENDPOINTS.DELETE_SUBJECT , params);
    }

    async getSubjectByTerm(params : GetSubjectByTermRequest): Promise<any> {
        return this.get<any>(SUBJECT_ENDPOINTS.GET_SUBJECTS_BY_STUDENT_GROUP_ID_TERM_YEAR, params);
    }
    async getSubjectsByStudentGroupIdTermYear(params : GetSubjectsByStudentGroupIdTermYearRequest): Promise<GetSubjectsByStudentGroupIdTermYearResponse> {
        return this.get<GetSubjectsByStudentGroupIdTermYearResponse>(SUBJECT_ENDPOINTS.GET_SUBJECTS_BY_STUDENT_GROUP_ID_TERM_YEAR, params);
    }
    // async getSubjectByTermAndClass(params: any) : Promise<any> {
    //     return this.get<any>(SUBJECT_ENDPOINTS.GET_SUBJECT_BY_TERM_AND_CLASS, params);
    // }
}

export const subjectService = new SubjectService();