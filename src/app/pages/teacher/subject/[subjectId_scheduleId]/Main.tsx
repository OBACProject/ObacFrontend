"use client";
import { useEffect, useState } from "react";
import MenuBar from "./Menu";
import SubjectTableForm from "./Form";
import { GetGradBySubjectId } from "@/dto/gradDto";
import { fetchGetGradBySubjectId } from "@/api/grad/gradAPI";
import { fetchGetScheduleBysubjectId } from "@/api/schedule/scheduleAPI";
import { GetScheduleBysubjectId } from "@/dto/schedule";
import { fetchGetSubjectBySubjectId } from "@/api/subject/subjectAPI";
import { GetSubjectBySubjectId } from "@/dto/subjectDto";

interface Props {
  subjectId: number;
  scheduleId: number;
}

const getGradData = async (subjectId: number, scheduleId: number) => {
  try {
    const data = await fetchGetGradBySubjectId(subjectId, scheduleId);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getScheduleData = async (subjectId: number) => {
  try {
    const data = await fetchGetScheduleBysubjectId(subjectId);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getSubjectBySubjectId = async (subjectId: number) => {
  try {
    const data = await fetchGetSubjectBySubjectId(subjectId);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default function SubjectMainForm({ subjectId, scheduleId }: Props) {
  const [grads, setGrads] = useState<GetGradBySubjectId[]>();
  const [schedules, setSchedules] = useState<GetScheduleBysubjectId>();
  const [subjects, setSubjects] = useState<GetSubjectBySubjectId>();

  useEffect(() => {
    getGradData(subjectId, scheduleId).then((items) => {
      setGrads(items);
    });
    getScheduleData(subjectId).then((items) => {
      setSchedules(items);
    });
    getSubjectBySubjectId(subjectId).then((items) => {
      setSubjects(items);
    });
  }, []);

  const [edit, setEdit] = useState<boolean | null | undefined>();
  const getEdit = (data: boolean) => {
    setEdit(data);
  };
  console.log(subjects);
  return (
    <div className="pl-20">
      {subjects && (
        <MenuBar
          schedules={schedules}
          grads={grads}
          subjects={subjects}
          onEditReturn={getEdit}
        />
      )}
      <div className="px-5 py-5">
        {grads && <SubjectTableForm grads={grads} onEdit={edit} />}
      </div>
    </div>
  );
}
