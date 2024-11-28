import SubjectMainForm from "./subjectMain"




export default async function Page({
    params,
  }: {
    params: Promise<{ subject_id: string }>
  }) {
    const slug = (await params).subject_id
    return <div>
        <SubjectMainForm id={slug}/>
    </div>
  }



