import type { Metadata } from "next";

const SITE = "https://www.obac.ac.th";
const TITLE = "OBAC | เข้าสู่ระบบ";
const DESC = "เข้าสู่ระบบผู้ใช้ OBAC";
const LOGIN_URL = `${SITE}/login`;
const OG_IMAGE = `${SITE}/homepage/common/img03.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE),

  title: TITLE,
  description: DESC,

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },

  alternates: {
    canonical: "/login",
    languages: {
      "th-TH": "/th/login",
      "en-US": "/en/login",
    },
  },

  openGraph: {
    type: "website",
    url: LOGIN_URL,
    siteName: "OBAC",
    title: TITLE,
    description: DESC,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "OBAC Login",
      },
    ],
    locale: "th_TH",
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [OG_IMAGE],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/asset/obac-logo.png",
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
