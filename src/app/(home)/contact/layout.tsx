import "@app/styles/globals.css";

export const metadata = {
  title: "เอกวิทย์บริหารธุรกิจ ข้อมูลติดต่อ",
  description: "",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ OBAC",
    description: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ | OBAC",
    url: "https://ekawit.ac.th/contact",
    siteName: "ekawit",
    images: [
      {
        url: "/banner/banner.jpg",
        width: 1200,
        height: 630,
        alt: "OBAC Open Graph Image",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
