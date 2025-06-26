"use client";

import React from "react";
import { signIn } from "../../lib/auth-client";
import { GoogleIcon } from "../../public/icons/google";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/auth/error",
    });
  };

  return (
    <div className=" flex flex-col justify-center items-center min-h-screen w-full">
      <div className="flex flex-grow  flex-col gap-2 items-center ">
        <div className="text-4xl font-bold">Login to Mark-me</div>
        <button className="w-full border-[#202020] border-2 flex gap-2 justify-center rounded-sm hover:bg-[#202020] transition-all duration-300 ease-out ease-in items-center h-10" onClick={handleGoogleLogin}>
            <GoogleIcon/>  
            <span>Continue with Google</span>
        </button>
      </div>

      
      
      <div className="flex justify-center">Return home</div>
      <div className="flex justify-center gap-3 text-[10px]">
          <a href="">Term of Service</a>
          <a href="">Privacy Policy</a>
      </div>
      
    </div>
  );
}
