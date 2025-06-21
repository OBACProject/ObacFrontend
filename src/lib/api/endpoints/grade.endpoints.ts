export const GRADE_ENDPOINTS = {
  GET_STUDENT_GRADE_BY_TERM_YEAR: '/api/Grade/GetStudentGradeByTermYear',
  GET_STUDENT_IF_GRADE_BELOW: '/api/Grade/GetStudentIfGradeBelow',
  GET_GROUP_GRADE_ABOVE: '/api/Grade/GetGroupGradeAbove',
  GET_STUDENT_TRANSCRIPT: '/api/Grade/GetStudentTranscript',
  GET_GROUP_SUMMARY_GRADE: '/api/Grade/GetGroupSummaryGrade',
  GET_GROUP_SUMMARY_GRADE_AVAILABLE_STATUS: '/api/Grade/GetGroupSummaryGradeAvailableStatus',
  GET_STUDENT_GROUP_GRADE_BY_GROUP_ID_TERM_YEAR: '/api/Grade/GetStudentGroupGradeByGroupIdTermYear',
} as const;