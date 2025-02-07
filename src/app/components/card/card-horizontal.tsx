"use client";
import React from "react";
import Image from "next/image";
import FadeInOnScroll from "../Effect/FadInScroll";

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
    <div className="grid lg:gap-4 gap-3 py-5  w-full ">
      {Array.isArray(cardData) &&
        cardData.map((data: any, index) => (
          <FadeInOnScroll>
            <div
              key={data.eventId}
              className="flex rounded-md  lg:w-[800px] group hover:scale-[102%] w-f duration-500 lg:h-[180px] group bg-white w-full h-[120px]   border border-gray-200 overflow-hidden shadow-lg "
            >
              <div className="h-full relative w-52  lg:w-60 overflow-hidden">
                <img
                  src={data.img}
                  alt={data.topic}
                  className="absolute lg:w-60 w-52 h-full object-cover transition  group-hover:opacity-80  duration-700"
                />
                <div className="relative w-full h-full bg-gradient-to-t from-gray-900/40 to-gray-900/5"></div>
              </div>
              <div className=" lg:w-[600px] w-fit group-hover:bg-gray-50 duration-500  grid  py-2 px-2 lg:py-4 lg:px-4">
                <div className="flex justify-between ">
                  <div className="font-semibold text-blue-800 text-lg">
                    {data.topic}
                  </div>
                  <div className="text-gray-700 lg:text-lg text-sm">
                    {data.date}
                  </div>
                </div>
                <div className="h-fit overflow-hidden">
                  <p className=" text-gray-600 lg:text-[16px] text-[12px] line-clamp-4 ">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        ))}
    </div>
  );
}
