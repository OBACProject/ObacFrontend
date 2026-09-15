import Form from "./Form";
import Head from "next/head";
export const metadata = {
  title: "ข้อมูลการติดต่อ | OBAC",
  description: "ช่องทางติดต่อวิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ (OBAC) โทร. 091-864-9154 แผนที่และที่อยู่วิทยาลัย เขตลาดกระบัง กรุงเทพฯ",
  keywords: [
    "OBAC",
    "วิทยาลัยอาชีวศึกษา",
    "Ekawit",
    "เอกวิทย์บริหารธุรกิจ",
    "ปวช",
    "ปวส",
    "สาขาเทคโนโลยีธุรกิจดิจิทัล",
    "เทคโนโลยี",
    "ติดต่อ",
  ],
  alternates: { canonical: "https://ekawit.ac.th/contact-obac" },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Ekawit Business Administration Vocational College",
    alternateName: "OBAC",
    url: "https://ekawit.ac.th/contact-obac",
    logo: "https://ekawit.ac.th/favicon.ico",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Khet Lat Krabang",
      addressLocality: "Bangkok",
      postalCode: "10520",
      addressCountry: "TH",
    },
    sameAs: ["https://www.facebook.com/obacfanpage/?locale=th_TH"],
  };
  return (
    <div>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Form />
    </div>
  );
}
