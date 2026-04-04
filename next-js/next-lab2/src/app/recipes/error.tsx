"use client";
export default function RecipeError({
  message,
  retry,
}: {
  message: string;
  retry: () => void;
}) {
  return (
    <div className="py-32 text-center">
      <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter">
        Opps! {message}
      </h2>
      <button
        onClick={retry}
        className="bg-black text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
