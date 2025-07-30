import { UseMutationOptions } from "@tanstack/react-query";
import { useBaseUpdateMutation } from "./base/base.mutation";
import { ScheduleSubjectRequest } from "../../models/scheduleSubject/scheduleSubject.request";
import { scheduleSubjectService } from "../../services/scheduleSubject.service";



export const useUpdateScheduleSubject = (options? : Partial<UseMutationOptions<void, Error, {params: ScheduleSubjectRequest}>>) => {
  return useBaseUpdateMutation<void, {params: ScheduleSubjectRequest }, Error>(
    ({ params }) => scheduleSubjectService.updateScheduleSubject(params),
    options
  );
}