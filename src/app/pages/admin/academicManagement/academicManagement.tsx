"use client";

import { useRouter } from "next/navigation";
import { makeColumns } from "@/app/components/table/makeColumns";
import { DataTable } from "@/app/components/table/tableComponent";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { useState, useEffect } from "react";
import { AcademicColumn, AcademicData } from "@/resource/admin/academicData";

export function AcademicPage() {
  const [searchStaff, setSearchStaff] = useState<string>("");
  const [searchStaffFilter, setSearchStaffFilter] = useState<AcademicColumn[]>(
    []
  );
  const router = useRouter();

  const handleEdit = (id: number) => {
    console.log("Edit", id);
    router.push(`/pages/admin/academicManagement/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    console.log("Delete", id);
  };

  const handleRowClick = (id: number) => {
    console.log("Row clicked. ID:", id);
  };

  const columns = makeColumns<AcademicColumn>(
    {
      id: "",
      name: "",
      surname: "",
      email: "",
    },
    "id",
    {
      id: "ID",
      name: "Name",
      surname: "Surname",
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
    const searchMatch = AcademicData.filter(
      (staff) =>
        staff.name.toLowerCase().includes(searchStaff.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchStaff.toLowerCase()) ||
        staff.id.toLowerCase().includes(searchStaff.toLowerCase()) ||
        staff.surname.toLowerCase().includes(searchStaff.toLowerCase())
    );
    setSearchStaffFilter(searchMatch);
  }, [searchStaff]);

  return (
    <header className="mx-4 sm:mx-10 lg:mx-44 p-4 mt-10 ">
      <div
        className="flex justify-between p-4 h-20
      "
      >
        <Badge className="text-sm sm:text-base" variant="outline">
          การจัดการบุคคลกรภายใน
        </Badge>
        <div className="w-1/2 flex gap-12 items-center justify-center">
          <Input
            type="text"
            placeholder="Search..."
            className="w-2/3"
            onChange={(event) => setSearchStaff(event.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/3 hover:bg-blue-600">
            <a href="/pages/admin/academicManagement/create">Add Staff </a>
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={searchStaffFilter}
        onRowClick={handleRowClick}
        selectedValue="id"
      />
    </header>
  );
}
