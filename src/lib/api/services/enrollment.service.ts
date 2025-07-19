import { ENROLLMENT_ENDPOINTS } from "../endpoints/enrollment.endpoints";
import { CreateEnrollmentWithGradeAndScheduleRequest } from "../models/enrollment/enrollment.request";
import { BaseService } from "./base/base.service";



export class EnrollmentService extends BaseService {
    async createEnrollmentWithGradeAndSchedule(request: CreateEnrollmentWithGradeAndScheduleRequest): Promise<void> {
        return this.post<void>(ENROLLMENT_ENDPOINTS.CREATE_ENROLLMENT_WITH_GRADE_AND_SCHEDULE, request);
    }
}

export const enrollmentService = new EnrollmentService();