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
    <div className="grid lg:gap-4 py-5  ">
      {Array.isArray(cardData) &&
        cardData.map((data: any, index) => (
          <div
            key={data.eventId}
            className="flex rounded-md lg:w-[800px] group hover:scale-[102%] duration-500 lg:h-[180px] group bg-white  border border-gray-200 overflow-hidden shadow-lg "
          >
            <div className="h-full relative  lg:w-60 overflow-hidden">
              <img
                src={data.img}
                alt={data.topic}
                className="absolute lg:w-60 lg:h-full object-cover transition  group-hover:opacity-80  duration-700"
              />
              <div className="relative w-full h-full bg-gradient-to-t from-gray-900/40 to-gray-900/5"></div>
            </div>
            <div className=" lg:w-[600px] group-hover:bg-gray-50 duration-500  grid  py-4 px-4">
              <div className="flex justify-between ">
                <div className="font-semibold text-blue-800 text-lg">
                  {data.topic}
                </div>
                <div className="text-gray-700 text-lg">{data.category}</div>
              </div>
              <div className="h-fit overflow-hidden">
                <p className=" text-gray-600 lg:text-[16px] text-sm line-clamp-4 ">
                  {data.description}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
