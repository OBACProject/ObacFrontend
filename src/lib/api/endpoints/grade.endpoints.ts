export const GRADE_ENDPOINTS = {
  GET_STUDENT_GRADE_BY_TERM_YEAR: '/Grade/GetStudentGradeByTermYear',
  GET_STUDENT_IF_GRADE_BELOW: '/Grade/GetStudentIfGradeBelow',
  GET_GROUP_GRADE_ABOVE: '/Grade/GetGroupGradeAbove',
  GET_STUDENT_TRANSCRIPT: '/Grade/GetStudentTranscript',
  GET_GROUP_SUMMARY_GRADE: '/Grade/GetGroupSummaryGrade',
  GET_GROUP_SUMMARY_GRADE_AVAILABLE_STATUS: '/Grade/GetGroupSummaryGradeAvailableStatus',
  GET_STUDENT_GROUP_GRADE_BY_GROUP_ID_TERM_YEAR: '/Grade/GetStudentGroupGradeByGroupIdTermYear',
} as const;