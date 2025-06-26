"use client";

import React from "react";

export default function Dashboard() {
  

  return (
    <div className="h-screen w-full">
        
        <div className="flex flex-col gap-3 justify-center items-center w-full h-full">
            <div className="text-4xl font-bold">
                Search You Mark
            </div>
            <input type="text" className="bg-white text-black w-1/2 rounded-md p-3"/>
        </div>
    </div>
  );
}
