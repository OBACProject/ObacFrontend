"use client";
import React from "react";
import Image from "next/image";

interface CardHorizontalProp {
  img: string;
  topic: string;
  description: string;
  category: string;
  date: string;
}

interface CardHorizontalProps {
  cardData: CardHorizontalProp[];
}

export default function CardVertical({ cardData }: CardHorizontalProps) {
  return (
    <>
      {Array.isArray(cardData) &&
        cardData.map((data, index) => (
          <div
            key={index}
            className="rounded-md border-[1px] w-full border-[#CFD0D4] bg-card  shadow-md group hover:bg-gray-100  my-3 bg-white"
          >
            <div className="grid items-start ">
              <div className="relative items-center justify-center flex w-full h-60 overflow-hidden">
                <Image
                  src={data.img}
                  alt={data.topic}
                  fill
                  objectFit="cover" 
                  className="transition-transform rounded-t-md duration-700 group-hover:rounded-t-md group-hover:scale-125 group-hover:opacity-80"
                />
              </div>
              <div className="grid w-full px-10">
                <span className="text-blue-800 text-sm mt-4">
                  {data.category}
                </span>
                <div className="flex justify-between mt-1">
                  <span className="font-semibold text-blue-800 text-xl">
                    {data.topic}
                  </span>
                </div>
                <div className="mt-3 font-semibold text-black">
                  {data.date}
                </div>
                <div className="mt-1 mb-4 text-gray-600">
                  {data.description.slice(0, 200)}...
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
