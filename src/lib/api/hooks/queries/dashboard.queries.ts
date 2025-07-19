import { DashboardGetGenderInfoCountRequest } from "@/lib/api/models/dashboard/dashboard.request";
import { DashboardGetGenderInfoCountResponse } from "@/lib/api/models/dashboard/dashboard.response";
import { dashboardService } from "@/lib/api/services/dashboard.service";
import { createBaseQuery } from "./base/base.queries";



export const GetGenderInfoCountQuery = createBaseQuery<DashboardGetGenderInfoCountResponse[], DashboardGetGenderInfoCountRequest>(
    (params) => ['genderInfoCount', params],
    (params) => dashboardService.getGenderInfoCount(params),
);