export default function RecipeLoading() {
  return (
    <div className="max-w-7xl mx-auto py-32 flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-amber-600 rounded-full animate-spin mb-4"></div>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        Loading Proxy Data...
      </p>
    </div>
  );
}
