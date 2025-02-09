"use client";
import React from "react";
import CardHorizontalProps from "./card-horizontalProps";


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
         <div key={index}>
          <CardHorizontalProps img={data.img} topic={data.topic} category={data.category} description={data.description} date={data.date} eventId={data.eventId}/>
         </div>
        ))}
    </div>
  );
}
