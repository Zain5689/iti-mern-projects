const Loading = () => {
  return (
    <div className="max-w-7xl mx-auto py-20 px-6 flex flex-col items-center justify-center min-h-100">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
        Fetching Products (ISR)...
      </p>
    </div>
  );
};

export default Loading;
