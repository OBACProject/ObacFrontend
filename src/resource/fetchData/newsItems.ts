export interface NewsItem {
  id: number;
  title: string;
  image: string;
  /** Term/year as it already appears in the title - not a fabricated exact date. */
  period?: string;
}

// Single source of truth for OBAC activity photos - this used to be copy-pasted
// separately (and inconsistently) into news/page.tsx, events/page.tsx, and
// BigCarouselNews.tsx. Items 1-2 (director-appointment notice, a specific
// training announcement) stay out of this list since they read as
// time-sensitive official notices rather than general activity photos.
export const newsItems: NewsItem[] = [
  {
    id: 3,
    title: "กิจกรรมสัมมนาเชิงปฏิบัติการ (ปวส.) ภาคเรียนที่ 1/2566",
    image: "/cls/news/news_3.jpg",
    period: "ภาคเรียนที่ 1/2566",
  },
  {
    id: 4,
    title: "พิธีไหว้ครู ปวช. ปีการศึกษา 2565",
    image: "/cls/news/news_4.jpg",
    period: "ปีการศึกษา 2565",
  },
  {
    id: 5,
    title: "ตักบาตรข้าวสารอาหารแห้ง และถวายเทียนจำนำพรรษา ปีการศึกษา 2565",
    image: "/cls/news/news_5.jpg",
    period: "ปีการศึกษา 2565",
  },
  {
    id: 6,
    title: "กิจกรรมทำบุญวิทยาลัยประจำปีการศึกษา 2565",
    image: "/cls/news/news_6.jpg",
    period: "ปีการศึกษา 2565",
  },
  {
    id: 7,
    title: "สัมมนาเชิงวิชาการ ปวส. ภาคเรียนที่ 1/2565",
    image: "/cls/news/news_7.jpg",
    period: "ภาคเรียนที่ 1/2565",
  },
  {
    id: 8,
    title: "พิธีถวายพระพรชัยมงคล สมเด็จพระนางเจ้าฯ พระบรมราชินี 2565 (ปวช.1)",
    image: "/cls/news/news_8.jpg",
    period: "ปีการศึกษา 2565",
  },
  {
    id: 9,
    title: "กิจกรรมวันภาษาไทย ประจำปีการศึกษา ๒๕๖๕",
    image: "/cls/news/news_9.jpg",
    period: "ปีการศึกษา 2565",
  },
];

export function getNewsItemById(id: number): NewsItem | undefined {
  return newsItems.find((item) => item.id === id);
}
