import { GetAllSubject, GetSubjectBySubjectId } from "@/dto/subjectDto";

export const fetchGetSubjectBySubjectId = async (
  id: number
): Promise<GetSubjectBySubjectId> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Subject/GetSubjectByIdAsync?id=${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to get  data");
    }
    const text = await response.text();
    const json = JSON.parse(text);
    const data: GetSubjectBySubjectId = json.data;
    return data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

export const fetchGetAllSubject = async (): Promise<GetAllSubject[]> => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoic3RyaW5nIHN0cmluZyIsIlJvbGUiOiJBY2FkZW1pYyIsIlVzZXJJRCI6IjJmMTI0NGU2LWMxYTUtNGI1NC05N2Q1LTA5NjEzZmVkMWY4YSIsImp0aSI6ImQ2NzYzMWY5LTVhNjEtNDYwOC05ZTE1LTQ5MzI4MDZkYThlOSIsIm5iZiI6MTczOTAzOTA3NywiZXhwIjoxNzM5MDQ2Mjc2LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxMTEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ.N3rob4WTfilVaAr1pIcurXMswDi29XwYKBUVLpwCHMM"
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Subject/GetAllSubjectAsync`,{
        method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch subject");
    }
    const text = await response.text();
    const json = JSON.parse(text);

    if (!json?.data) {
      throw new Error("Invalid API response: Missing 'data' field");
    }

    const data: GetAllSubject[] = json.data;
    return data;
  } catch (err) {
    console.error("Error fetching subjects:", err);
    return [];
  }
};