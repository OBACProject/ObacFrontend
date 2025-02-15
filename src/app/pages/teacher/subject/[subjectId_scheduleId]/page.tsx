import Main from "./Main";

export default function Page({
  params,
}: {
  params: { subjectId_scheduleId?: string };
}) {

  if (!params?.subjectId_scheduleId) {
    return <div>Error: Missing or invalid route parameters</div>;
  }

  const [subjectId, scheduleId] = params.subjectId_scheduleId.split("_");

  const scheduleIdInt = parseInt(scheduleId, 10);
  const subjectIdInt = parseInt(subjectId, 10);
  return (
    <div>
      <Main subjectId={subjectIdInt} scheduleId={scheduleIdInt} />
    </div>
  );
}
