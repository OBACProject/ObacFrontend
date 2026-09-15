import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import HeaderHomePageMenu from "@/components/common/Header/Header";
import SciFiBackgroundNormal from "@/app/styles/bg-normal";
import { getNewsItemById, newsItems } from "@/resource/fetchData/newsItems";

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return newsItems.map((item) => ({ id: String(item.id) }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = getNewsItemById(Number(params.id));
  if (!item) return { title: "ไม่พบข่าวสาร | OBAC" };

  return {
    title: `${item.title} | OBAC`,
    description: `ภาพบรรยากาศ${item.title} วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ (OBAC)`,
    alternates: { canonical: `https://ekawit.ac.th/news/${item.id}` },
    openGraph: {
      title: item.title,
      images: [{ url: item.image }],
      type: "article",
    },
  };
}

export default function NewsDetailPage({ params }: PageProps) {
  const item = getNewsItemById(Number(params.id));
  if (!item) notFound();

  const otherItems = newsItems.filter((n) => n.id !== item.id).slice(0, 3);

  return (
    <div className="mt-16 sm:mt-[8px] md:pt-[80px] lg:mt-16">
      <HeaderHomePageMenu title={item.title} />
      <SciFiBackgroundNormal>
        <div className="container mx-auto px-4 py-8 max-w-4xl text-blue-950 font-prompt">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับไปหน้าข่าวสาร
          </Link>

          <div className="relative w-full h-[260px] sm:h-[400px] md:h-[480px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-6 space-y-2">
            {item.period && (
              <p className="text-sm text-gray-500">{item.period}</p>
            )}
            <p className="text-base sm:text-lg leading-relaxed">
              ภาพบรรยากาศ{item.title} ของวิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ
              (OBAC)
            </p>
          </div>

          {otherItems.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">ข่าวสารอื่นๆ</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {otherItems.map((n) => (
                  <Link
                    key={n.id}
                    href={`/news/${n.id}`}
                    className="relative rounded-lg overflow-hidden shadow-md h-40 group block"
                  >
                    <Image
                      src={n.image}
                      alt={n.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium line-clamp-2">
                      {n.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </SciFiBackgroundNormal>
    </div>
  );
}
