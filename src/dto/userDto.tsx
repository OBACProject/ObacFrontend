export interface GetAllAcademicUser {
  userId: string;
  firstName: string;
  lastName: string;
  thaiName: string;
  thaiLastName: string;
  gender: string;
  thaiId: string;
  email: string;
  phoneNumber: string;
  address: string;
  nationality: string;
  religion: string;
  role: string;
  birthDate: string;
}

export interface GetUserInfoById {
  thaiId: string;
  gender: string;
  firstName: string;
  lastName: string;
  thaiName: string;
  thaiLastname: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  religion: string;
  picId: null;
}
