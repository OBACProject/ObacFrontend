"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import React from "react";
import { makeColumns } from "@/app/components/table/makeColumns";
import { AcademicColumn, AcademicData } from "@/resource/admin/adminColumns";
import { DataTable } from "@/app/components/table/tableComponent";

export default function Page() {
  const handleEdit = (id: number) => {
    console.log("Edit", id);
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
      email: "",
    },
    "id",
    {
      id: "ID",
      name: "Name",
      email: "Email",
    }, // Assuming no custom headers are needed
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
            // onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/3 hover:bg-blue-600">
            Add Staff
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={AcademicData}
        onRowClick={handleRowClick}
        selectedValue="id"
      />
    </header>
  );
}
