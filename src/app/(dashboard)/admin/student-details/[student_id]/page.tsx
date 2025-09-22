

import Form from "./Form";

export default function Page({ params }: { params: { student_id?: string } }) {
  const student_id = params.student_id;

  if (!student_id) {
    return <div>Error: Missing or invalid route parameters</div>;
  }

  return (
    <div className="pl-20 h-full">
      <Form studentId={(student_id)} />
    </div>
  );
}
