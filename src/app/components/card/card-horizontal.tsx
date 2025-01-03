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
          <a href={`/pages/home/news/${data.eventId}`}>
            <div
              key={index}
              className="rounded-md border-[1px] border-[#CFD0D4] bg-card text-card-foreground shadow-sm lg:w-[1000px] md:w-[900px] sm:w-[300px] my-3 bg-white sm:grid md:flex hover:bg-gray-100 my-3 bg-white"
            >
              <div className="lg:flex md:flex sm:grid items-start px-5 py-4">
                <div className="relative lg:w-5/12 lg:h-44 md:w-7/12 md:h-44 mr-4 sm:w-full sm:h-44 ">
                  <Image
                    src={data.img}
                    alt={data.topic}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform rounded-t-md duration-300 group-hover:rounded-t-md group-hover:scale-110"
                  />
                </div>
                <div className="grid w-full">
                  <div className="flex justify-between">
                    <span className="font-semibold text-black text-lg">
                      {data.topic}
                    </span>
                    <span className="text-gray-700 text-lg">
                      <span className="text-black font-semibold">
                        category:{" "}
                      </span>
                      {data.category}
                    </span>
                  </div>
                  <div className="mt-3 text-gray-600">
                    {data.description.slice(0, 200)}...
                  </div>
                  <div className="text-end mt-2 font-semibold text-gray-700">
                    {data.date}
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
    </>
  );
}
