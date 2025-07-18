import { UseMutationOptions } from "@tanstack/react-query";
import { GetAllProgramsWithStudentGroupResponse } from "../../models/program/program.response";
import { programService } from "../../services/program.service";
import { createBaseQuery } from "./base/base.queries";
import { CreateProgramRequest, UpdateProgramRequest } from "../../models/program/program.request";
import { useBaseCreateMutation, useBaseUpdateMutation } from "./base/base.mutation";



export const useGetAllProgramsQuery = createBaseQuery<GetAllProgramsWithStudentGroupResponse[], void>(
  () => ['allPrograms'],
  () => programService.getAllPrograms(),
);

export const useCreateProgramMutation = (options?: Partial<UseMutationOptions<void, Error, CreateProgramRequest>>) => {
  return useBaseCreateMutation<void, CreateProgramRequest, Error>(
    programService.createProgram.bind(programService),
    options
  );
};

export const useUpdateProgramMutation = (options?: Partial<UseMutationOptions<void, Error, UpdateProgramRequest>>) => {
  return useBaseUpdateMutation<void, UpdateProgramRequest, Error>(
    programService.updateProgram.bind(programService),
    options
  );
};