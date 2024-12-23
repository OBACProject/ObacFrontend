
"use client"
import { useState } from "react";
import MenuBar from "./menuBar";
import SubjectTableForm from "./subjectTableForm";

interface Props {
  id: string;
}

export default function SubjectMainForm({ id }: Props) {
  const [edit , setEdit] = useState<boolean|null|undefined>()
  const getEdit = (data: boolean) => {
    setEdit(data)
  };
  return (
    <div className="pl-20">
      <MenuBar
        slug={id}
        subjectName={"บริหารธุรกิจและการตลาด"}
        onEditReturn={getEdit}
      />
      <div className="px-5 py-5">
        <SubjectTableForm
          slug={id}
          studentData={[]}
          onEdit={edit}
        />
      </div>
    </div>
  );
}