import { DashboardGetGenderInfoCountRequest } from "@/lib/api/models/dashboard/dashboard.request";
import { DashboardGetGenderInfoCountResponse, DashboardGetStudentClassCountDtosResponse, DashboardGetStudentClassCountResponse } from "@/lib/api/models/dashboard/dashboard.response";
import { dashboardService } from "@/lib/api/services/dashboard.service";
import { createBaseQuery } from "./base/base.queries";



export const useGetGenderInfoCountQuery = createBaseQuery<DashboardGetGenderInfoCountResponse[], DashboardGetGenderInfoCountRequest>(
    (params) => ['genderInfoCount', params],
    (params) => dashboardService.getGenderInfoCount(params),
);

export const useGetStudentClassCountQuery = createBaseQuery<DashboardGetStudentClassCountResponse[] , void>(
    () => ['studentClassCount'],
    () => dashboardService.getStudentClassCount(),
);

export const useGetStudentClassCountDtosQuery = createBaseQuery<DashboardGetStudentClassCountDtosResponse[] , void>(
    () => ['studentClassCountDtos'],
    () => dashboardService.getStudentClassCountDtos(),
);