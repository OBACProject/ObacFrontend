import { Suspense } from "react";
import { StudentHeader, StudentGeneralInfo, StudentFatherInfo, StudentEducationInfo, StudentAddressInfo, StudentMotherInfo } from "./test_component/section/section";
import { AddressInfoSkeleton, EducationInfoSkeleton, FatherInfoSkeleton, GeneralInfoSkeleton, MotherInfoSkeleton } from "./test_component/skeleton/skeleton";
interface studentInfoByStudentIdProps {
    params: {
        studentId: string;
    };
}
export default async function Page({ params }: studentInfoByStudentIdProps) {
  const { studentId } = params;

  return (
    <header className="w-full lg:px-40 px-5 py-4">
      {/* Student Header - Can be prerendered */}
      <Suspense fallback={
        <div className="animate-pulse px-5">
          <div className="flex gap-2 items-center mb-4">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      }>
        <StudentHeader studentId={studentId} />
      </Suspense>

      {/* Main Content - Single page layout */}
      <div className="px-5 flex w-full">
        <div className="w-full">
          <div className="w-full flex transition shadow-lg shadow-gray-200 border-[1px] border-gray-200 rounded-md bg-white overflow-hidden">
            
            {/* Content Area - All sections in one page */}
            <div className="w-full flex flex-col space-y-6 p-6">
              
              {/* General Information Section */}
              <div className="border-b pb-6">
                <Suspense fallback={<GeneralInfoSkeleton />}>
                  <StudentGeneralInfo studentId={studentId} />
                </Suspense>
              </div>

              {/* Father Information Section */}
              <div className="border-b pb-6">
                <Suspense fallback={<FatherInfoSkeleton />}>
                  <StudentFatherInfo studentId={studentId} />
                </Suspense>
              </div>

              {/* Mother Information Section */}
              <div className="border-b pb-6">
                <Suspense fallback={<MotherInfoSkeleton />}>
                  <StudentMotherInfo studentId={studentId} />
                </Suspense>
              </div>

              {/* Education Information Section */}
              <div className="border-b pb-6">
                <Suspense fallback={<EducationInfoSkeleton />}>
                  <StudentEducationInfo studentId={studentId} />
                </Suspense>
              </div>

              {/* Address Information Section */}
              <div>
                <Suspense fallback={<AddressInfoSkeleton />}>
                  <StudentAddressInfo studentId={studentId} />
                </Suspense>
              </div>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}