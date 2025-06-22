import { LabelText } from "@/app/components/labelText/labelText";
import { exampleStudentData } from "@/resource/academics/studentData/studentData";
import { Badge } from "lucide-react";

const studentData = exampleStudentData;
// Component for student general info section
export async function StudentGeneralInfo({ studentId }: { studentId: string }) {
//   const studentData = await studentInfoQuery.execute({ studentId });
  return (
    <div className="">
      <h1 className="py-3 px-5 font-bold text-base flex justify-between">
        ข้อมูลการทั่วไป
      </h1>
      
      <div className="relative gap-2 w-full items-center flex flex-col">
        <LabelText
          topic="รหัสนิสิต"
          data={studentData.generalInfo.studentID}
        />
        <LabelText
          topic="ชื่อ-นามสกุล"
          data={[
            studentData.generalInfo.titleName,
            studentData.generalInfo.name,
            studentData.generalInfo.surname,
          ]}
        />
        <LabelText
          topic="เพศ"
          data={studentData.generalInfo.gender}
        />
        <LabelText
          topic="วันเกิด"
          data={studentData.generalInfo.birthData}
        />
        <LabelText
          topic="สัญชาติ"
          data={studentData.generalInfo.nationality}
        />
        <LabelText
          topic="เบอร์โทรติดต่อ"
          data={studentData.generalInfo.Tel}
        />
        <LabelText
          topic="Email"
          data={studentData.generalInfo.Contract.email}
        />
      </div>
    </div>
  );
}

// Component for father info section
export async function StudentFatherInfo({ studentId }: { studentId: string }) {
//   const studentData = await studentInfoQuery.execute({ studentId });
  
  return (
    <div className="">
      <h1 className="py-3 px-5 font-bold text-base flex justify-between">
        ข้อมูลบิดา
      </h1>
      
      <div className="relative gap-2 w-full items-center flex flex-col">
        <LabelText
          topic="บัตรประชาชน"
          data={studentData.fatherInfo.identificationCard}
        />
        <LabelText
          topic="ชื่อ-นามสกุล"
          data={[
            studentData.fatherInfo.titleName,
            studentData.fatherInfo.name,
            studentData.fatherInfo.surname,
          ]}
        />
        <LabelText
          topic="job"
          data={studentData.fatherInfo.job}
        />
        <LabelText
          topic="เบอร์โทรติดต่อ"
          data={studentData.fatherInfo.tel}
        />
      </div>
    </div>
  );
}

// Component for mother info section
export async function StudentMotherInfo({ studentId }: { studentId: string }) {
//   const studentData = await studentInfoQuery.execute({ studentId });
  
  return (
    <div className="">
      <h1 className="py-3 px-5 font-bold text-base flex justify-between">
        ข้อมูลมารดา
      </h1>
      
      <div className="relative gap-2 w-full items-center flex flex-col">
        <LabelText
          topic="บัตรประชาชน"
          data={studentData.motherInfo.identificationCard}
        />
        <LabelText
          topic="ชื่อ-นามสกุล"
          data={[
            studentData.motherInfo.titleName,
            studentData.motherInfo.name,
            studentData.motherInfo.surname,
          ]}
        />
        <LabelText
          topic="job"
          data={studentData.motherInfo.job}
        />
        <LabelText
          topic="เบอร์โทรติดต่อ"
          data={studentData.motherInfo.tel}
        />
      </div>
    </div>
  );
}

// Component for education info section
export async function StudentEducationInfo({ studentId }: { studentId: string }) {
//   const studentData = await studentInfoQuery.execute({ studentId });
  
  return (
    <div className="p-2">
      <h1 className="p-2 font-bold text-base flex justify-between">
        ข้อมูลการศึกษา
      </h1>
      
      <div className="relative gap-2 w-full items-center flex flex-col">
        <LabelText
          topic="หลักสูตร"
          data={studentData.educationalInfo.faculty}
        />
        <LabelText
          topic="สาขา"
          data={studentData.educationalInfo.program}
        />
        <LabelText
          topic="ระดับการศึกษา"
          data={studentData.educationalInfo.educationLevel}
        />
        <LabelText
          topic="สถานภาพนิสิต"
          data={studentData.educationalInfo.educationStatus}
        />
        <LabelText
          topic="ปวช. / ปวส."
          data={studentData.educationalInfo.class}
        />
        <LabelText
          topic="ที่อยู่สถาบัน"
          data={[
            studentData.educationalInfo.address.address,
            studentData.educationalInfo.address.subDistrict,
            studentData.educationalInfo.address.district,
            studentData.educationalInfo.address.province,
            studentData.educationalInfo.address.postalCode,
          ]}
        />
        <LabelText
          topic="เบอร์โทรสภาพสถาบัน"
          data={studentData.educationalInfo.tel}
        />
      </div>
    </div>
  );
}

// Component for address info section
export async function StudentAddressInfo({ studentId }: { studentId: string }) {
//   const studentData = await studentInfoQuery.execute({ studentId });
  
  return (
    <div className="space-y-4">
      {/* Home Address */}
      <div className="p-2">
        <h1 className="p-2 font-bold text-base flex justify-between">
          ที่อยู่ตามทะเบียนบ้าน
        </h1>
        
        <div className="relative gap-2 w-full items-center flex flex-col">
          <LabelText
            topic="ที่อยู่บ้าน"
            data={studentData.addressInfo.address}
          />
          <LabelText
            topic="ตำบล"
            data={studentData.addressInfo.subDistrict}
          />
          <LabelText
            topic="อำเภอ"
            data={studentData.addressInfo.district}
          />
          <LabelText
            topic="จังหวัด"
            data={studentData.addressInfo.province}
          />
          <LabelText
            topic="รหัสไปรษณีย์"
            data={studentData.addressInfo.postalCode}
          />
        </div>
      </div>

      {/* Present Address */}
      <div className="p-2">
        <h1 className="p-2 font-bold text-base flex justify-between">
          ที่อยู่ปัจจุบัน
        </h1>
        
        <div className="relative gap-2 w-full items-center flex flex-col">
          <LabelText
            topic="ที่อยู่บ้าน"
            data={studentData.presentAddressInfo.address}
          />
          <LabelText
            topic="ตำบล"
            data={studentData.presentAddressInfo.subDistrict}
          />
          <LabelText
            topic="อำเภอ"
            data={studentData.presentAddressInfo.district}
          />
          <LabelText
            topic="จังหวัด"
            data={studentData.presentAddressInfo.province}
          />
          <LabelText
            topic="รหัสไปรษณีย์"
            data={studentData.presentAddressInfo.postalCode}
          />
        </div>
      </div>
    </div>
  );
}

// Component for student header (can be prerendered with basic info)
export async function StudentHeader({ studentId }: { studentId: string }) {
//   const studentData = await studentInfoQuery.execute({ studentId });
  
  return (
    <div className="px-5 text-lg sm:text-xl">
      <div className="px-5 flex gap-2 items-center">
        <div className="text-xl border-[1px] border-gray-300 text-center w-fit px-10 py-1 rounded-md text-white bg-blue-950">
          ประวัตินิสิต
        </div>
        <div className="ml-4 text-lg">สถานะ :</div>
        <div className="px-6 py-1 text-sm bg-green-100 bg-opacity-50 text-green-500 rounded-md">
          กำลังศึกษา
        </div>
      </div>
      
      <div className="flex flex-col">
        <div className="w-full flex justify-start gap-4 px-5 py-4 text-sm">
          <div className="flex justify-start items-center w-full border-[1px] border-gray-200 px-10 gap-10 py-4 shadow-md shadow-gray-200 bg-gradient-to-r from-sky-100 via-gray-100 to-sky-100 rounded-md">
            <div className="flex justify-start items-center w-fit">
              <div className="overflow-hidden">
                <img
                  className="hover:scale-125 w-20 h-20 rounded-full duration-700 justify-start object-cover"
                  src={"/asset/user.jpg"}
                  alt="Student Profile"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2 p-2 w-8/12 font-semibold">
              <div className="text-xl text-gray-700">
                {studentData.generalInfo.studentID}
              </div>
              <div>
                {studentData.generalInfo.titleName}{" "}
                {studentData.generalInfo.name} {studentData.generalInfo.surname}
              </div>
              <div className="flex gap-10">
                    <div>{exampleStudentData.educationalInfo.faculty}</div>
                    <div>{exampleStudentData.educationalInfo.program}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}