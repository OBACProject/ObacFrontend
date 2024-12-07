"use client";
import { useEffect, useState } from "react";
import MenuBar from "./menuBar";
import SubjectTableForm from "./Form";
import { GetGradBySubjectId } from "@/dto/gradDto";
import { fetchGetGradBySubjectId } from "@/api/grad/gradAPI";

interface Props {
  id: string;
}

const getGradData = async (subjectId: number) => {
  try {
    const data = await fetchGetGradBySubjectId(subjectId);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default function SubjectMainForm({ id }: Props) {
  const [grads, setGrads] = useState<GetGradBySubjectId[]>();

  useEffect(() => {
    getGradData(4).then((items) => {
      setGrads(items);
    });
  }, []);

  const [edit, setEdit] = useState<boolean | null | undefined>();
  const getEdit = (data: boolean) => {
    setEdit(data);
  };

  return (
    <div className="pl-20">
      <MenuBar
        slug={id}
        grads={grads}
        subjectName={"บริหารธุรกิจและการตลาด"}
        onEditReturn={getEdit}
      />
      <div className="px-5 py-5">
        <SubjectTableForm  grads={grads} onEdit={edit} />
      </div>
    </div>
  );
}
