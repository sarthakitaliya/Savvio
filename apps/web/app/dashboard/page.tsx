"use client";

import React from "react";
import { Cardmark } from "../../components/ui/Card";
import { Files } from "../../components/ui/Files";

export default function Dashboard() {
  return (
    <div className="relative bg-white text-black dark:bg-[#171717] h-screen flex-1 flex-col dark:text-white mx-auto flex justify-center items-center ">
      <div className="h-1/2 w-screen flex justify-center items-center flex-col gap-4">
        <div className="text-4xl font-bold">Search You Mark</div>
        <input
          type="text"
          placeholder="Search . . ."
          className=" text-white w-1/3  rounded-2xl p-2 outline-none bg-[#202020]  placeholder:text-center"
        />
      </div>
      <div className="fixed bottom-3 right-3 p-2 px-4 rounded-md bg-[#202020] hover:bg-[#3d3d3d]">
        +
      </div>
      <div className="grid grid-cols-5 gap-6 w-1/2 place-content-center ">
        <Files name="sports" />
        <Files name="sports" />
        <Cardmark
          title="Lofi Music"
          description="Words for me"
          type="youtube"
          link="https://youtu.be/YkuAm0ZLTfY?si=qwn0nQRDv0jRwNYA"
        />
        <Files name="sports" />
        <Files name="sports" />
        <Files name="sports" />
        <Files name="sports" />
        <Files name="sports" />
        <Files name="sports" />
        <Files name="sports" />
      </div>
    </div>
  );
}
