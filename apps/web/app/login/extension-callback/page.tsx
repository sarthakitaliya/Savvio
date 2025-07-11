"use client";

import { useEffect } from "react";
import { authClient } from "../../../lib/auth-client";

export default function ExtensionCallbackPage() {
  const fetchToken = async () => {
    try {
      console.log("Fetching token from auth client...");
      
      const sessionctx = await authClient.getSession({
        fetchOptions:{
          onSuccess: (ctx) => {
            const token = ctx.response.headers.get("set-auth-token");
            console.log("Token fetched successfully:", token);
          }
        }
      });
    } catch (error) {
      console.error("Error fetching token:", error);
      
    }
  }
  useEffect(()=> {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
    fetchToken();
      
  })
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">
        🎉 Savvio is Connected!
      </h1>
      <p className="text-gray-700 text-center mb-6">
        Your extension is ready to use.<br />
        Click the Savvio icon in your browser toolbar to save bookmarks instantly!
      </p>
      <button
        onClick={() => window.close()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Close This Tab
      </button>
    </main>
  );
}