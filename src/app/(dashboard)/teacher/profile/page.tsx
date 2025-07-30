import React from "react";
import ProfileForm from "./Form";
// import Notice from "./Notice";

export default function page() {
  return (
    <div className="h-full">
      <div className="lg:flex justify-center h-full w-full grid gap-5 ">
        <ProfileForm />
      </div>
    </div>
  );
}
