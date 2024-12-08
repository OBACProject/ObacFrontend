import { GetAllAcademicUser } from "@/dto/userDto";

export const fetchGetAllAcademicUser = async (): Promise<
  GetAllAcademicUser[]
> => {
  try {

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Academic/GetAllAcademicUserAsync`
    );
    if (!response.ok) {
      throw new Error("Failed to get teacher data");
    }
    const text = await response.text();
    const json = JSON.parse(text)
    const data: GetAllAcademicUser[] = json.data;
    return data;

  } catch (err) {

    console.log(err);
    throw err;

  }
};
