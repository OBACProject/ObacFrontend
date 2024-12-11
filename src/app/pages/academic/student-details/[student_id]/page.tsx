import Form from "./Form";


export default function Page({ params }: { params: { student_id?: string } }) {
  console.log("Params received:", params);
    const student_id = params.student_id
  if (!params?.student_id) {
    return <div>Error: Missing or invalid route parameters</div>;
  }

  return (
    <div className="pl-20">
        <Form/>
    </div>
  );
}