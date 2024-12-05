import Center from "./center"

export default async function Page({
    params,
  }: {
    params: Promise<{ teacher_id: string }>
  }) {
    const slug = decodeURIComponent((await params).teacher_id)
    return <div className="pl-20">
        <Center slug={slug}/>
    </div>
  }
