import Form from "./Form";

export default function Page({ params }: { params: { academic_id?: string } }) {
  const academicId = params.academic_id;

  if (!academicId) {
    return <div>Error: Missing or invalid route parameters</div>;
  }

  return (
    <div className="pl-20">
      <Form academicId={Number(academicId)} />
    </div>
  );
}
