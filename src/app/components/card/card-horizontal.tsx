"use client";
import React from "react";
import Image from "next/image";

interface CardHorizontalProp {
  img: string;
  topic: string;
  description: string;
  category: string;
  date: string;
  eventId: number;
}

interface CardHorizontalProps {
  cardData: CardHorizontalProp[];
}

export default function CardHorizontal({ cardData }: CardHorizontalProps) {
  return (
    <>
      {Array.isArray(cardData) &&
        cardData.map((data, index) => (
          <div
            key={index}
            className="rounded-md border-[1px] border-[#CFD0D4] bg-card text-card-foreground overflow-hidden shadow-lg  hover:bg-slate-50 group lg:w-[1000px] md:w-[900px] w-full sm:w-[400px] my-3 hover:scale-[1.01] duration-500 bg-white sm:grid grid md:flex"
          >
            <div className="lg:flex md:flex grid sm:grid items-start ">
              <div className="relative  overflow-hidden lg:w-5/12 lg:h-44 md:w-7/12 md:h-44 mr-4 w-full sm:w-full h-36 sm:h-44 ">
                <Image
                  src={data.img}
                  alt={data.topic}
                  fill
                  className="absolute w-12 lg:w-full  object-cover transition group-hover:opacity-80  duration-700"
                />
                <div className="relative w-full h-full bg-gradient-to-t from-gray-900/30 to-gray-900/5"></div>
              </div>
              <div className="grid px-5 w-full">
                <div className="flex justify-between">
                  <span className="font-semibold text-black text-lg">
                    {data.topic}
                  </span>
                  <span className="text-gray-700 text-lg">
                    <span className="text-black font-semibold">category: </span>
                    {data.category}
                  </span>
                </div>
                <div className="mt-3 text-gray-600 line-clamp-4">
                  {data.description}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
