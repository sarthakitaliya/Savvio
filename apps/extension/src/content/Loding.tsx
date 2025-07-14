import { LoaderCircle } from "lucide-react";


export function Loading() {
  return (
    <>
    <style>{`
      .spin {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
      <LoaderCircle className="spin" />
    </>
  );
}