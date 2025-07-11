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
        cardData.slice(0, 3).map((data, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-300 bg-white shadow-md group overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full max-w-sm mx-auto my-4"
          >
      
            <div className="relative w-full h-48 md:h-56 overflow-hidden">
              <Image
                src={data.img}
                alt={data.topic}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </div>

         
            <div className="px-5 py-4">
              <span className="text-blue-700 font-light text-sm">
                {data.category}
              </span>
              <h3 className="text-lg font-semibold text-blue-900 mt-1 line-clamp-2">
                {data.topic}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{data.date}</p>
              <p className="text-gray-700 text-sm mt-2 line-clamp-3">
                {data.description}
              </p>
            </div>
          </div>
        ))}
    </>
  );
}