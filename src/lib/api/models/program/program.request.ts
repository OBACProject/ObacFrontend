

export interface CreateProgramRequest {
    facultyId: number;
    programName: string;
    subProgramName?: string;
    class: string;
}

export interface UpdateProgramRequest {
    id: number;
    facultyId?: number;
    programName?: string;
    subProgramName?: string;
    class?: string;
}