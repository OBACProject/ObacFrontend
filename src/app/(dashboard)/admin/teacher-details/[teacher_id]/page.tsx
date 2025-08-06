import Form from "./Form";

export default function Page({ params }: { params: { teacher_id?: string } }) {
  const teacher_id = params.teacher_id;

  if (!teacher_id) {
    return <div>Error: Missing or invalid route parameters</div>;
  }

  return (
    <div className="pl-20">
      <Form teacherId={Number(teacher_id)} />
    </div>
  );
}
