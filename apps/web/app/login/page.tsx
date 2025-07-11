"use client";

import React from "react";
import { signIn } from "../../lib/auth-client";
import { GoogleIcon } from "../../public/icons/google";
import Link from "next/link";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      errorCallbackURL: "/auth/error",
    });
  };

  return (
    <div className="flex flex-col min-h-screen w-full ">
      {/* Centered login box */}
      <div className="flex flex-grow flex-col justify-center items-center gap-6">
        <div className="text-4xl font-bold">Login to Savvio</div>

        <div className="w-64">
          <button
            className="w-full border-[#202020] border-2 flex gap-2 justify-center items-center rounded-sm hover:bg-[#202020] hover:text-white transition-all duration-300 h-10"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>

      {/* Footer pinned to bottom */}
      <div className="flex flex-col items-center gap-2 mb-4 text-[10px] text-gray-600">
        <Link href="/" className="hover:underline">Return home</Link>
        <div className="flex gap-3">
          <Link href="#" className="hover:underline">Terms of Service</Link>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
