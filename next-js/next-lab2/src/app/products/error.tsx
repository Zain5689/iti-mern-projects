"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Caught Error:", error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto py-32 px-6 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-black tracking-tighter mb-2 uppercase">
        Opps! Something went wrong
      </h2>

      <p className="text-gray-500 font-medium mb-8 max-w-md">
        {error.message || "An unexpected error occurred while fetching data."}
      </p>

      <button
        onClick={() => reset()}
        className="px-8 py-3 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-amber-600 transition-colors shadow-lg active:scale-95"
      >
        Try Again
      </button>

      {error.digest && (
        <span className="mt-6 text-[9px] text-gray-300 font-mono tracking-widest uppercase">
          Error ID: {error.digest}
        </span>
      )}
    </div>
  );
}
