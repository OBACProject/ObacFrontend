import { Suspense } from "react";
import dynamic from "next/dynamic";

// 👇 This ensures FilterableTable is client-rendered only
const FilterableTable = dynamic(() => import("./content/FilterableTable"), {
  ssr: false,
});

interface PageProps {
  params: {
    params: string[];
  };
}


export default async function Page({ params }: PageProps) {
  const [classroom_id, term, year] = params.params;

  return (
    <div className="h-screen bg-gray-50">

      <main className="mx-4 sm:mx-10 lg:mx-10 p-4">
        <Suspense fallback={<div>Loading table...</div>}>
          <FilterableTable classroomId={Number(classroom_id)} term={term} year={Number(year)} />
        </Suspense>
      </main>
    </div>
  );
}
