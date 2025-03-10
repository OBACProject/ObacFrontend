import React from "react";
import ProfileForm from "./Form";
import Notice from "./Notice";

export default function page() {
  return (
    <div className="lg:px-10 py-5 px-5">
      <div className="lg:flex justify-center grid gap-5 pb-20">
        <ProfileForm />
        {/* <Notice /> */}
      </div>
    </div>
  );
}
