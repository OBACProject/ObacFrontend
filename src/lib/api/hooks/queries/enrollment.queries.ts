import { CreateEnrollmentWithGradeAndScheduleRequest } from "@/lib/api/models/enrollment/enrollment.request";
import { UseMutationOptions } from "@tanstack/react-query";
import { useBaseCreateMutation } from "./base/base.mutation";
import { enrollmentService } from "@/lib/api/services/enrollment.service";



export const useCreateEnrollment = (options ? : Partial<UseMutationOptions<void, Error, CreateEnrollmentWithGradeAndScheduleRequest>>) => {
  return useBaseCreateMutation<void, CreateEnrollmentWithGradeAndScheduleRequest, Error>(
    enrollmentService.createEnrollmentWithGradeAndSchedule.bind(enrollmentService),
    options
  );
}