import "@app/styles/globals.css";
import { NavbarRegisterStudent } from "./navbar";
import HomeFooter from "@/components/common/Footer/HomeFooter";


export const metadata = {
  title: "เปิดรับสมัครเอกวิทย์บริหารธุรกิจ",
  description: "ปวช/ปวส รับสมัครพร้อมทุนมากมาย",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <NavbarRegisterStudent />{children}<HomeFooter/></body>
    </html>
  );
}
