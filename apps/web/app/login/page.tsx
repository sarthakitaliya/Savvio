"use client";

import React from "react";
import { signIn } from "../../lib/auth-client";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/auth/error",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={handleGoogleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
