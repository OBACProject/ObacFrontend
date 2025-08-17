import {
  CreateStudentRequest,
  GetAllStudentsPagedParams,
  GetAllStudentsPagedResponse,
  GetAllStudentUser,
  GetStudentDetailResponse,
  StudentGroupDetail,
} from "@/dto/studentDto";
import apiClient from "@/lib/apiClient";

export const GetStudentGroupByGroupId = async (
  groupID: number
): Promise<StudentGroupDetail | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: StudentGroupDetail;
    }>(`StudentGroup/GetStudentGroupByGroupId?studentGroupId=${groupID}`);
    return response.data.data ?? null;
  } catch (err) {
    console.log("Error in API route.ts GetStudentGroupByGroupId : ", err);
    return null;
  }
};

export const GetStudentByStudentId = async (
  StudentId: Number
): Promise<StudentGroupDetail | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: StudentGroupDetail;
    }>(`StudentGroup/GetStudentByStudentId?studentGroupId=${StudentId}`);
    return response.data.data ?? null;
  } catch (err) {
    console.log("Error in API route.ts GetStudentByStudentId : ", err);
    return null;
  }
};

export const GetAllStudentsUser = async (): Promise<GetAllStudentUser[] | []> => {
  try {
    const response = await apiClient.get("Admin/GetAllStudentUsers");
    console.log("📦 Response from API:", response.data);

    const users = response.data?.data?.users;

    return Array.isArray(users) ? users : [];
  } catch (err) {
    console.log("Error in GetAllStudents:", err);
    return [];
  }
};

export const GetAllStudentsPaged = async (
  {
    pageNumber = 1,
    pageSize = 10,
    searchTerm = "",
    searchCategory = "all",
    sortBy = "studentCode",
    ascending = true,
  }: GetAllStudentsPagedParams = {}
): Promise<GetAllStudentsPagedResponse> => {
  try {
    const res = await apiClient.get("/Student/GetAllStudents", {
      params: {
        PageNumber: pageNumber,
        PageSize: pageSize,
        SearchTerm: searchTerm || undefined,
        SearchCategory: searchCategory,
        SortBy: sortBy,
        Ascending: ascending,
      },
    });

    const d = res.data?.data;
    const rawItems: any[] = Array.isArray(d?.items) ? d.items : [];

    const items: GetAllStudentUser[] = rawItems.map((r) => ({
      studentId: Number(r.id ?? r.studentId ?? 0),
      studentCode: String(r.studentCode ?? ""),
      class: String(r.class ?? ""),
      groupName: String(r.groupName ?? ""),
      groupCode: String(r.groupCode ?? ""),
      id: String(r.userId ?? r.id ?? ""),      
      userName: String(r.userName ?? r.username ?? ""),
      prefix: String(r.prefix ?? ""),
      firstName: String(r.firstName ?? r.name ?? ""),
      lastName: String(r.lastName ?? ""),
      gender: String(r.gender ?? ""),
      role: String(r.role ?? "Student"),
      isActive: Boolean(r.isActive ?? true),
    }));

    return {
      pageNumber: Number(d?.pageNumber ?? pageNumber),
      pageSize: Number(d?.pageSize ?? pageSize),
      totalCount: Number(d?.totalCount ?? items.length),
      totalPages: Number(d?.totalPages ?? 1),
      hasPreviousPage: Boolean(d?.hasPreviousPage ?? pageNumber > 1),
      hasNextPage: Boolean(d?.hasNextPage ?? false),
      items,
    };
  } catch (err) {
    console.error("GetAllStudentsPaged error:", err);
    return {
      pageNumber,
      pageSize,
      totalCount: 0,
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
      items: [],
    };
  }
};
export const GetStudentDetailById = async (
  studentId: number
): Promise<GetStudentDetailResponse | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: GetStudentDetailResponse;
    }>("/Admin/GetStudentDetails", {
      params: { studentId },
    });

    console.log("Response from API:", response.data);
    return response.data?.data ?? null;
  } catch (err) {
    console.error("Error in GetStudentDetailById: ", err);
    return null;
  }
};

export const CreateStudent = async (
  payload: CreateStudentRequest
): Promise<boolean> => {
  try {
    const response = await apiClient.post("User/CreateStudent", payload);
    return [200, 201, 204].includes(response.status) 
  } catch (err: any) {
    console.error("Error creating academic:", err);
    return false;
  }
};