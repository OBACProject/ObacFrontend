"use client";
import CLSEvents from "@/components/common/CLS/cls-event";
import React, { useState } from "react";

type EventsProps = {
  id: string;
  topic: string;
  header: string;
  detail: string;
  date: string;
};

export default function Page() {
  const [events, setEvent] = useState<EventsProps[]>([
    {
      id: "1",
      topic: "Topic1",
      header: "Header1",
      detail:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae ea illo libero, consequuntur similique expedita sapiente eaque neque sint, id aliquam quia adipisci inventore porro nesciunt a voluptas nobis minus.",
      date: "10/12/30",
    },
    {
      id: "2",
      topic: "Topic2",
      header: "Header2",
      detail:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae ea illo libero, consequuntur similique expedita sapiente eaque neque sint, id aliquam quia adipisci inventore porro nesciunt a voluptas nobis minus.",
      date: "10/12/30",
    },
    {
      id: "3",
      topic: "Topic3",
      header: "Header3",
      detail:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae ea illo libero, consequuntur similique expedita sapiente eaque neque sint, id aliquam quia adipisci inventore porro nesciunt a voluptas nobis minus.",
      date: "10/12/30",
    },
    {
      id: "1",
      topic: "Topic1",
      header: "Header1",
      detail:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae ea illo libero, consequuntur similique expedita sapiente eaque neque sint, id aliquam quia adipisci inventore porro nesciunt a voluptas nobis minus.",
      date: "10/12/30",
    },
    {
      id: "2",
      topic: "Topic2",
      header: "Header2",
      detail:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae ea illo libero, consequuntur similique expedita sapiente eaque neque sint, id aliquam quia adipisci inventore porro nesciunt a voluptas nobis minus.",
      date: "10/12/30",
    },
    {
      id: "3",
      topic: "Topic3",
      header: "Header3",
      detail:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae ea illo libero, consequuntur similique expedita sapiente eaque neque sint, id aliquam quia adipisci inventore porro nesciunt a voluptas nobis minus.",
      date: "10/12/30",
    },
    {
      id: "1",
      topic: "Topic1",
      header: "Header1",
      detail:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae ea illo libero, consequuntur similique expedita sapiente eaque neque sint, id aliquam quia adipisci inventore porro nesciunt a voluptas nobis minus.",
      date: "10/12/30",
    },
    {
      id: "2",
      topic: "Topic2",
      header: "Header2",
      detail:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae ea illo libero, consequuntur similique expedita sapiente eaque neque sint, id aliquam quia adipisci inventore porro nesciunt a voluptas nobis minus.",
      date: "10/12/30",
    },
    {
      id: "3",
      topic: "Topic3",
      header: "Header3",
      detail:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae ea illo libero, consequuntur similique expedita sapiente eaque neque sint, id aliquam quia adipisci inventore porro nesciunt a voluptas nobis minus.",
      date: "10/12/30",
    },
  ]);
  return (
    <div className="w-full pt-8">
      <div className="w-full grid lg:grid-cols-[30%_70%]  place-items-center">
        <div className="relative my-14 py-10 px-0 flex justify-center items-center w-full border-blue-300  max-w-lg">
          <div className="absolute mix-blend-multiply filter blur-lg top-0 left-10 w-40 h-40 bg-sky-300 opacity-70 rounded-full animate-blob"></div>
          <div className="absolute mix-blend-multiply filter blur-lg top-0 right-10 w-40 h-40  bg-yellow-300 opacity-70 rounded-full  animate-blob animation-delay-2000"></div>
          <div className="absolute mix-blend-multiply filter blur-lg bottom-0 left-30 w-40 h-40 bg-pink-300 opacity-70 rounded-full  animate-blob animation-delay-4000"></div>
          <h1 className="text-5xl animate-fadeIn text-blue-950 my-5 font-bold px-2 py-1 bg-white   z-10 rounded-lg">
            Events
          </h1>
        </div>
        <div className="w-full  grid place-items-center lg:py-5  lg:px-5">
          <CLSEvents />
        </div>
      </div>

      <div className="w-full lg:mt-2 mt-5  justify-center flex">
        <div className="grid gap-5 w-full px-5 lg:place-items-center">
          {events?.map((item) => (
            <div
              className="py-2 lg:px-10 px-5 border rounded-md shadow-md shadow-gray-100 grid gap-1 w-full lg:w-[80%] overflow-hidden border-gray-200"
              key={item.id}
            >
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold  text-gray-600">
                  {item.topic}
                </h1>
                <div className="px-4 py-1 rounded-md bg-blue-950 text-white lg:translate-x-8 translate-x-4">
                  {item.date}
                </div>
              </div>
              <div className="px-2 font-semibold text-gray-500 ">{item.header}</div>
              <div className="line-clamp-3  text-gray-500 px-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.detail}{item.detail}{item.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
