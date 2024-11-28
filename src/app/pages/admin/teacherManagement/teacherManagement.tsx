"use client";
import { makeColumns } from "@/app/components/table/makeColumns";
import { DataTable } from "@/app/components/table/tableComponent";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TeacherColumn, teacherData } from "@/resource/admin/teacherData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function TeacherPage() {
  const [searchTeacher, setSearchTeacher] = useState<string>("");
  const [searchTeacherFilter, setSearchTeacherFilter] = useState<
    TeacherColumn[]
  >([]);

  const router = useRouter();
  const handleEdit = (id: number) => {
    console.log("Edit", id);
    router.push(`/pages/admin/teacherManagement/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    console.log("Delete", id);
  };

  const handleRowClick = (id: number) => {
    console.log("Row clicked. ID:", id);
  };

  const columns = makeColumns<TeacherColumn>(
    {
      id: "",
      name: "",
      surname: "",
      englishName: "",
      englishSurname: "",
      faculty: "",
      email: "",
    },
    "id",
    {
      id: "ID",
      name: "Name",
      surname: "Surname",
      englishName: "English Name",
      englishSurname: "English Surname",
      faculty: "Faculty",
      email: "Email",
    },
    [
      {
        label: "Edit",
        onClick: (id) => handleEdit(Number(id)),
        className: "hover:bg-blue-600 bg-blue-500",
      },
      {
        label: "Delete",
        onClick: (id) => handleDelete(Number(id)),
        className: "hover:bg-red-600 bg-red-500",
      },
    ]
  );

  useEffect(() => {
    const searchMatch = teacherData.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchTeacher.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTeacher.toLowerCase()) ||
        teacher.id.toLowerCase().includes(searchTeacher.toLowerCase()) ||
        teacher.surname.toLowerCase().includes(searchTeacher.toLowerCase()) ||
        teacher.englishName
          .toLowerCase()
          .includes(searchTeacher.toLowerCase()) ||
        teacher.englishSurname
          .toLowerCase()
          .includes(searchTeacher.toLowerCase()) ||
        teacher.faculty.toLowerCase().includes(searchTeacher.toLowerCase())
    );
    setSearchTeacherFilter(searchMatch);
  }, [searchTeacher]);

  return (
    <header className="mx-4 sm:mx-10 lg:mx-44 p-4 mt-10 ">
      <div
        className="flex justify-between p-4 h-20
      "
      >
        <Badge className="text-sm sm:text-base" variant="outline">
          การจัดการบุคคลกรของคณะอาจารย์
        </Badge>
        <div className="w-1/2 flex gap-12 items-center justify-center">
          <Input
            type="text"
            placeholder="Search..."
            className="w-2/3"
            onChange={(event) => setSearchTeacher(event.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/3 hover:bg-blue-600">
            <a href="/pages/admin/teacherManagement/create">Add Teacher</a>
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={searchTeacherFilter}
        onRowClick={handleRowClick}
        selectedValue="id"
      />
    </header>
  );
}
