import React from "react";
import { Button } from "@/components/ui/button";
interface Button1Prop {
  label_btn: string;
  bg_btn?:string | null;
}

export default function Button1(props: Button1Prop) {
  return (
    <>
      {props.bg_btn ? (
        <Button className={`bg-[#${props.bg_btn}] hover:bg-[#${props.bg_btn}] hover:opacity-80`}>{props.label_btn}</Button>
      ) : (
        <Button className={`bg-black`}>{props.label_btn}</Button>
      )}
    </>
  );
}
