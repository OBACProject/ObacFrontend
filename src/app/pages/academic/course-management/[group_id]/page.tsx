import Center from "./center";

export default async function Page({
  params,
}: {
  params: Promise<{ group_id: string }>;
}) {
  const slug = decodeURIComponent((await params).group_id);
  return (
    <div className="pl-20">
      <Center slug={slug} />
    </div>
  );
}
