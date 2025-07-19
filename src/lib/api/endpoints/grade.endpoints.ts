export const GRADE_ENDPOINTS = {
  GET_GRADE_GROUP_SUMMARY_GRADE : "Grade/GetGroupSummaryGrade",
  GET_GRADE_STUDENT_GRADES_BY_TERM_YEAR : "Grade/GetStudentGradesByTermYear",
  GET_GRADE_STUDENT_DETAIL_AND_SUMMARY_SCORE_BY_STUDENT_CODE : "Grade/GetStudentDetailAndSummaryScoreByStudentCode",
  GET_GRADE_STUDENT_GRADE_BY_SCHUDULE_ID : "Grade/GetStudentGroupGradeByScheduleSubjectId",
  GET_GRADE_STUDENT_GROUP_GRADE_BY_SCHEDULE_SUBJECT_ID : "Grade/GetStudentGroupGradeByScheduleSubjectId",
  GET_GRADE_STUDENT_IF_GRADE_BELOW : "Grade/GetStudentIfGradeBelow",
  POST_GRADE_UPSERTSTUDENT_GRADES : "Grade/UpsertStudentGrades",
  DELETE_GRADE_DELETE_GRADE : "Grade/DeleteGrade",
} as const;

