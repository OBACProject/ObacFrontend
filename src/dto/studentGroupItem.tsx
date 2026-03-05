export interface StudentGroupItem {
	id: number;
	groupName: string;
	class: string;
	groupCode: string;
	level: number;
	programId: number;
	programName: string;
	facultyName: string;
	subProgramName: string;
	isPublish: boolean;
	isComplete: boolean;
	isActive: boolean;
	year: number;
	term: string;
	total: number;
	completeStatus: string;
	section: string;
}

export interface ScheduleItemStudentGroup {
	scheduleSubjectId: number;
	day: string;
	period: number;
	room: string;
	subjectId: number;
	subjectName: string;
	subjectCode: string;
	term: string;
	year: number;
	studentGroupId: number;
	studentGroupName: string;
	studentGroupCode: string;
	studentCount: number;
	class: string;
	level: number;
	curriculumYear: number;
	isComplete: boolean;
	isPublish: boolean;
	teacherId: number;
	teacherName: string;
	teacherLastName: string;
	teacherCode: string;
}

export interface StudentGroupScheduleStatus {
	studentGroupId: number;
	groupName: string;
	groupCode: string;
	class: string;
	level: number;
	facultyName: string;
	programName: string;
	schedules: ScheduleItemStudentGroups[];
}
export interface ScheduleItemStudentGroups {
	class: string;
	curriculumYear: number;
	isComplete: boolean;
	isPublish: boolean;
	scheduleSubjectsId: number;
	subjectCode: string;
	subjectId: number;
	subjectName: string;
	term: string;
	year: number;
	day: string;
	period: number;
	teacherName: string;
	teacherLastname: string;
	room: string;
}

export interface GetAllStudentGroupRequest {
	id?: number;
	groupName?: string;
	groupCode?: string;
	class?: string;
	level?: number;
	programId?: number;
	year?: number;
	term?: string;
	isPublish?: boolean;
	isComplete?: boolean;
	isActive?: boolean;
	totalStudents?: number;
}

export interface CreateStudentGroupRequest {
	groupName: string;
	class: string;
	groupCode: string;
	level: number;
	programId: number;
	isPublish: boolean;
	isComplete: boolean;
	isActive: boolean;
	year: number;
	term: string;
	section: string;
}

export interface UpdateStudentGroupActiveRequest {
	studentGroupId: string;
	isActive: boolean;
}
export interface Students {
	id: number;
	prefix: string;
	firstName: string;
	lastName: string;
	studentCode: string;
	status: string;
}

export interface StudentGroupResponse {
	studentGroupId: number;
	groupName: string;
	groupCode: string;
	class: string;
	level: number;
	students: Students[];
}

export interface UpdateStudentGroupBody {
	studentId: number[];
	studentGroup: {
		groupName: string;
		class: string;
		groupCode: string;
		id: number | null;
		level: number;
		programId: number;
		isPublish: boolean;
		isComplete: boolean;
		isActive: boolean;
		year: number;
		term: string;
	};
	action: string;
}
export interface UpdateStudentGroupRequest {
	id: number;
	groupName: string;
	class: string;
	groupCode: string;
	level: number;
	programId: number;
	isPublish: boolean;
	isComplete: boolean;
	isActive: boolean;
	year: number;
	term: string;
	section: string;
}
