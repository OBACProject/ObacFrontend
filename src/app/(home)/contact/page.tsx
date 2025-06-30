import Form from "./Form";

export const metadata = {
  title: "ข้อมูลการติดต่อ | OBAC",
  description: "โทร. 091-864-9154",
  keywords: [
    "OBAC",
    "วิทยาลัยอาชีวศึกษา",
    "Ekawit",
    "เอกวิทย์บริหารธุรกิจ",
    "ปวช",
    "ปวส",
    "คอมพิวเตอร์ธุรกิจ",
    "เทคโนโลยี",
  ],
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
    url: "https://ekawit.ac.th/contact",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <meta name="robots" content="index, follow" />
      <meta
        name="keywords"
        content="OBAC, วิทยาลัยอาชีวศึกษา, Ekawit, โรงเรียนธุรกิจ, ปวช, ปวส, คอมพิวเตอร์ธุรกิจ, เทคโนโลยี"
      />
      <meta name="author" content="Ekawit Business College | OBAC" />
      <link rel="canonical" href="https://ekawit.ac.th/contact" />
      <Form />
    </div>
  );
}
