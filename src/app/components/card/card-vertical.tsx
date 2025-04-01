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
        cardData.slice(0,3).map((data:any, index:any) => (
          <div
            key={index}
            className="rounded-md border-[1px] w-full border-[#CFD0D4] bg-card  shadow-md group overflow-hidden hover:bg-gray-100  my-3 bg-white"
          >
            <div className="grid items-start ">
              <div className="relative  items-center justify-center flex w-full h-60 overflow-hidden">
                <Image
                  src={data.img}
                  alt={data.topic}
                  fill
                   
                  className="absolute h-36 lg:h-44 object-cover transition-transform rounded-t-md duration-700 group-hover:rounded-t-md group-hover:scale-125 group-hover:opacity-80"
                />
                <div className="relative w-full h-full bg-gradient-to-t from-gray-900/40 to-gray-900/5"></div>
              </div>
              <div className="grid w-full px-10">
                <span className="text-blue-800 font-prompt_Light text-[18px] mt-4">
                  {data.category}
                </span>
                <div className="flex justify-between mt-1">
                  <span className="font-prompt text-blue-800 text-xl">
                    {data.topic}
                  </span>
                </div>
                <div className="mt-2 font-prompt text-black">
                  {data.date}
                </div>
                <div className="mt-1 font-prompt_Light mb-4 line-clamp-3 text-gray-600">
                  {data.description}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
