"use client";
import { useParams } from "next/navigation";
import Form from "./Form";
export default function StudentDetailsPage() {
  const params = useParams();
  const studentId = Number(params.id);

  return (
    <div className="p-6">
      <Form studentId={studentId} />
    </div>
  );
}
