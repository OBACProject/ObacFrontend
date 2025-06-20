import { cardData } from "@/resource/fetchData/cardContent";
import CardVertical from "@/app/components/card/card-vertical";
import CardHorizontal from "@/app/components/card/card-horizontal";
import Head from "next/head";
import StickerFacebook from "@/app/components/Effect/StickerFacebook";
import StickerYoutube from "@/app/components/Effect/StickerYoutube";
import FadeInOnScroll from "@/app/components/Effect/FadInScroll";
import OpeningScroll from "@/app/components/Effect/OpeningScroll";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Ekawit Business Administration Vocational College",
    alternateName: "OBAC",
    url: "https://ekawit.ac.th",
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
    <div className="bg-white">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="OBAC, วิทยาลัยอาชีวศึกษา, Ekawit, โรงเรียนธุรกิจ, ปวช, ปวส, คอมพิวเตอร์ธุรกิจ, เทคโนโลยี"
        />
        <meta
          name="author"
          content="Ekawit Business Administration Vocational College"
        />

        <link rel="canonical" href="https://ekawit.ac.th" />
      </Head>
      <StickerFacebook />
      <StickerYoutube />
      {/* <CLShomepage /> */}

      <div className="w-full pt-4">
        {/* <FadeInOnScroll> */}
        <div className="relative  group flex items-center justify-center  lg:w-[100%] md:w-[100%] md:h-[400px] lg:h-[390px] w-full h-[220px] sm:w-[100%] sm:h-[300px] overflow-hidden">
          <img
            className="absolute lg:w-[100%] lg:h-[390px] sm:w-[100%] sm:h-[300px] md:w-[100%] md:h-[400px] w-full h-[220px] object-cover duration-1000 group-hover:scale-[102%]"
            src="/images/obac_view.jpg"
            alt="OBAC Campus Banner"
          />
          <div className="relative w-full h-full bg-gradient-to-t from-white via-gray-800/0 to-gray-900/5"></div>
        </div>
        {/* </FadeInOnScroll> */}
      </div>
      <div className="w-full  items-center text-center px-4 ">
        <OpeningScroll>
          <h1 className="lg:text-4xl  text-3xl text-blue-950   font-extrabold px-5 py-1">
            Ekawit Business Administration Vocational College (OBAC)
          </h1>
        </OpeningScroll>
      </div>
      <OpeningScroll>
        <div className="grid place-items-center mt-10 mb-5 w-full">
          <hr className=" w-11/12 border border-blue-950" />
        </div>
      </OpeningScroll>
      <FadeInOnScroll>
        <div className="w-full grid place-items-center">
          <h1 className="text-5xl text-blue-950 my-5  font-extrabold px-5 py-1">
            Welcome to OBAC
          </h1>
          <p className="w-[60%] text-blue-950 text-lg">
            "At the heart of our university lies a powerful vision — to shape
            the future by merging innovation with entrepreneurship. As a leading
            institution in technology and business, we equip students with
            cutting-edge skills, critical thinking, and real-world experience.
            Through dynamic programs, collaborative research, and
            industry-driven education, we empower the next generation of leaders
            to thrive in a rapidly changing world. Here, every idea matters, and
            every student is a catalyst for progress. Join us where technology
            meets opportunity — and futures are built."
          </p>
        </div>
      </FadeInOnScroll>
      <FadeInOnScroll>
        <div className="w-full mt-10 py-4 bg-gradient-to-b from-white to-blue-950/30"></div>
      </FadeInOnScroll>
      <FadeInOnScroll>
        <div className=" relative group flex items-center justify-center  lg:w-[100%] md:w-[100%] md:h-[400px] lg:h-[620px] w-full h-[220px] sm:w-[100%] sm:h-[300px] overflow-hidden">
          <img
            className="absolute lg:w-[100%] lg:h-[620px] sm:w-[100%] sm:h-[300px] md:w-[100%] md:h-[400px] w-full h-[220px] object-cover duration-1000 group-hover:scale-[102%]"
            src="/banner/banner.jpg"
            alt="OBAC Campus Banner"
          />
          <div className="relative w-full h-full bg-gradient-to-t from-gray-900/0 to-gray-900/0"></div>
        </div>
      </FadeInOnScroll>
      <FadeInOnScroll>
        <div className="w-full mb-5 py-4 bg-gradient-to-t from-white to-blue-950/30"></div>
      </FadeInOnScroll>
      <div className="flex w-full bg-white ">
        <div className="w-full items-center text-center px-4 ">
          <FadeInOnScroll>
            <h1 className="text-5xl text-blue-950 my-5  font-extrabold px-5 py-1">
              ข่าวสารและกิจกรรม
            </h1>
          </FadeInOnScroll>
        </div>
      </div>
      <FadeInOnScroll>
        <div className="grid lg:grid-cols-3 gap-x-20 lg:mx-10  mx-5 ">
          <CardVertical cardData={cardData} />
        </div>
      </FadeInOnScroll>

      <div className="lg:flex grid w-full gap-5 lg:px-10 px-5">
        <div className=" h-fit  w-fit">
          <CardHorizontal cardData={cardData} />
        </div>
      </div>
    </div>
  );
}
