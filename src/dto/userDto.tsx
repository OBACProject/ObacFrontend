// export interface GetAllAcademicUser {
//   id : number;
//   userId: string;
//   firstName: string;
//   lastName: string;
//   thaiName: string;
//   thaiLastName: string;
//   gender: string;
//   thaiId: string;
//   email: string;
//   phoneNumber: string;
//   address: string;
//   nationality: string;
//   religion: string;
//   role: string;
//   birthDate: string;
// }
export interface GetAllAcademicUser {
  id : number;
  userId: string;
  prefix : string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  role: string;
  isActive : boolean;
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
