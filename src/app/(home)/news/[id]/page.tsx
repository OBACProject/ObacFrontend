import React from "react";
import { GetEventsById } from "./newsById";

export default function page() {
  return (
    <>
      <div className="mx-4 sm:mx-10 lg:mx-44 p-4 mt-10 ">
        <GetEventsById />
      </div>
    </>
  );
}
