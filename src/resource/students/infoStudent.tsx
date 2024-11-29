interface metaInfo {
  line: string;
  facebook: string;
  email: string;
}
interface GeneralInfo {
  studentID: string;
  imageProfile: string;
  titleName: string;
  name: string;
  surname: string;
  gender: string;
  identificationCard: string;
  issuanceDate: string;
  expirationDate: string;
  birthData: string;
  age: number;
  nationality: string;
  religion: string;
  status: string;
  Tel: string;
  Contract: metaInfo;
}

interface ParentInfo {
  titleName: string;
  identificationCard: string;
  name: string;
  surname: string;
  job: string;
  tel: string;
  address: AddressInfo;
}

interface GuardianInfo {
  titleName: string;
  name: string;
  surname: string;
  job: string;
  tel: string;
  address: AddressInfo;
  relationship: string;
}

// ที่อยู่ใน All Data มี 2 อย่างคือ 1 ที่อยู่ตามทะเบียนบ้าน 2 ที่อยู่ปัจจุบัน
interface AddressInfo {
  address: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
}

interface EducationalInfo {
  educationLevel: string;
  program: string;
  faculty: string;
  class: string; // ปวช ปวส
  educationStatus: string;
  address: AddressInfo;
  tel: string;
}

interface AllData {
  generalInfo: GeneralInfo;
  fatherInfo: ParentInfo;
  motherInfo: ParentInfo;
  guardianInfo: GuardianInfo;
  educationalInfo: EducationalInfo;
  addressInfo: AddressInfo;
  presentAddressInfo: AddressInfo;
}

export const exampleStudentData: AllData = {
  generalInfo: {
    studentID: "6010405090",
    imageProfile: "https://via.placeholder.com/150",
    titleName: "Mr.",
    name: "John",
    surname: "Doe",
    gender: "male",
    identificationCard: "1234567890123",
    issuanceDate: "01/01/2020",
    expirationDate: "01/01/2025",
    birthData: "01/01/1999",
    age: 22,
    nationality: "Thai",
    religion: "Buddhism",
    status: "Single",
    Tel: "0887654321",
    Contract: {
      line: "john_doe",
      facebook: "John Doe",
      email: "tirawat.pst@gmail.com",
    },
  },
  fatherInfo: {
    titleName: "Mr.",
    name: "Michael",
    surname: "Doe",
    job: "Architect",
    tel: "0887654321",
    identificationCard: "1234567890123",
    address: {
      address: "234 Mother's Apartment",
      subDistrict: "SubDistrict X",
      district: "District Y",
      province: "Chiang Mai",
      postalCode: "50100",
    },
  },
  motherInfo: {
    titleName: "Mrs.",
    name: "Sarah",
    surname: "Doe",
    job: "Doctor",
    tel: "0887654322",
    identificationCard: "1234567890123",
    address: {
      address: "234 Mother's Apartment",
      subDistrict: "SubDistrict X",
      district: "District Y",
      province: "Chiang Mai",
      postalCode: "50100",
    },
  },
  guardianInfo: {
    titleName: "Mr.",
    name: "William",
    surname: "Smith",
    job: "Teacher",
    tel: "0876543210",
    address: {
      address: "789 Guardian's House",
      subDistrict: "SubDistrict Z",
      district: "District W",
      province: "Phuket",
      postalCode: "83120",
    },
    relationship: "Uncle",
  },
  educationalInfo: {
    educationLevel: "Bachelor's Degree",
    program: "Computer Science",
    faculty: "Engineering",
    class: "ปวส",
    educationStatus: "Graduated",
    address: {
      address: "456 University Campus",
      subDistrict: "SubDistrict A",
      district: "District B",
      province: "Bangkok",
      postalCode: "10300",
    },
    tel: "022345678",
  },
  addressInfo: {
    address: "567 Home Address",
    subDistrict: "SubDistrict C",
    district: "District D",
    province: "Bangkok",
    postalCode: "10240",
  },
  presentAddressInfo: {
    address: "890 Current Residence",
    subDistrict: "SubDistrict E",
    district: "District F",
    province: "Nonthaburi",
    postalCode: "11000",
  },
};
