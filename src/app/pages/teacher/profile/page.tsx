import React from "react";
import ProfileForm from "./Form";
import Notice from "./Notice";

export default function page() {
  return (
    <div className="pl-20">
      <div className="grid place-items-center border-[1px] border-gray-300 shadow-md shadow-gray-100 mx-5 rounded-md  my-3 text-center text-4xl  py-2  font-semibold ">
        Teacher Actor
      </div>
      <div className="flex pb-20">
        <ProfileForm />
        <Notice />
      </div>
    </div>
  );
}
