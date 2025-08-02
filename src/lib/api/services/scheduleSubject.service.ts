import { SCHEDULE_SUBJECTS_ENDPOINTS } from "../endpoints/scheduleSubject.endpoints";
import { ScheduleSubjectRequest } from "../models/scheduleSubject/scheduleSubject.request";
import { BaseService } from "./base/base.service";



export class ScheduleSubjectService extends BaseService {
    async updateScheduleSubject(
        request: ScheduleSubjectRequest
    ): Promise<void> {
        return this.post<void>(
            `${SCHEDULE_SUBJECTS_ENDPOINTS.POST_ISCOMPLETE_SCHEDULE_SUBJECTS}?scheduleSubjectId=${request.scheduleSubjectId}&isComplete=${request.isComplete}`
        );
    }
}

export const scheduleSubjectService = new ScheduleSubjectService();