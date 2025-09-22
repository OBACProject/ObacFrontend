import LoadingDataTable from "@/components/common/loading/LoadingDataTable";
import Form from "./Form";

export default function Page({ params }: { params: { student_id?: string } }) {
  const studentID = params.student_id;
  if (!params?.student_id) {
    return <div>Error: Missing or invalid route parameters</div>;
  }

  return (
    <div className="pl-20 h-full  bg-gray-100">
      {studentID ? <Form studentID={studentID} /> : <LoadingDataTable />}
    </div>
  );
}
