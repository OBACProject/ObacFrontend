import { PROGRAM_ENDPOINTS } from "../endpoints/program.endpoints";
import { CreateProgramRequest, UpdateProgramRequest } from "../models/program/program.request";
import { GetAllProgramsWithStudentGroupResponse } from "../models/program/program.response";
import { BaseService } from "./base/base.service";



export class ProgramService extends BaseService {

    async getAllPrograms() : Promise<GetAllProgramsWithStudentGroupResponse[]>{
        return this.get<GetAllProgramsWithStudentGroupResponse[]>(
            PROGRAM_ENDPOINTS.GET_ALL_PROGRAMS
        );
    }

    async createProgram(
        params: CreateProgramRequest
    ): Promise<void> {
        return this.post<void>(
        PROGRAM_ENDPOINTS.CREATE_PROGRAM,
        params
        );
    }
    
    async updateProgram(
        params: UpdateProgramRequest
    ): Promise<void> {
        return this.put<void>(
        `${PROGRAM_ENDPOINTS.PUT_PROGRAM}/${params.id}`,
        params
        );
    }
}

export const programService = new ProgramService();