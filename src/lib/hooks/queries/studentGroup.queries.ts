import { createBaseQuery } from "./base/base.queries";
import { studentGroupService } from "@/lib/api/services/studentGroup.service";
import { GetAllStudentGroupByTermYearResponse } from "@/lib/api/models/studentGroup/studentGroup.response";
import { GetAllStudentGroupByTermYearRequest } from "@/lib/api/models/studentGroup/studentGroup.request";





export const GetAllStudentGroupByTermYearQuery = createBaseQuery<GetAllStudentGroupByTermYearResponse[], GetAllStudentGroupByTermYearRequest>(
    (params) => ['studentGroup', params],
    (params) => studentGroupService.getAllStudentGroups(params),
);