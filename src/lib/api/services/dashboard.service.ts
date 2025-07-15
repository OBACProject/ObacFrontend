import { EVENT_ENDPOINTS } from "../endpoints/event.endpoints";
import { DashboardGetGenderInfoCountRequest } from "../models/dashboard/dashboard.request";
import { DashboardGetGenderInfoCountResponse } from "../models/dashboard/dashboard.response";
import { BaseService } from "./base/base.service";




export class DashboardService extends BaseService {
    async getGenderInfoCount(params: DashboardGetGenderInfoCountRequest): Promise<DashboardGetGenderInfoCountResponse[]> {
        return this.get<DashboardGetGenderInfoCountResponse[]>(EVENT_ENDPOINTS.GET_EDIT_SCORE_EVENT, params);
    }
}

export const dashboardService = new DashboardService();