"use client";
import Link from "next/link";

export default function ExtensionCallbackPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">
        🎉 Savvio is Connected!
      </h1>
      <p className="text-gray-400 text-center mb-6">
        Your extension is ready to use.
        <br />
        Click the Savvio icon in your browser toolbar to save bookmarks
        instantly!
      </p>
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => window.close()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
          Close This Tab
        </button>
        <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Return to Dashboard</Link>
      </div>
    </main>
  );
}
