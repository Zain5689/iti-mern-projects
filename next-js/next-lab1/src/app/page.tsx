const Home = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-125 h-125 bg-amber-100/50 rounded-full blur-[120px] -z-10"></div>

      <div className="p-8 max-w-4xl mx-auto text-center">
        <header className="space-y-8">
          <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black uppercase tracking-[0.3em] bg-black text-white rounded-full">
            Version 1.0 — Lab Series
          </span>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-none">
            Welcome to <span className="text-amber-500">next-lab1</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
            nobis nemo magnam blanditiis consectetur nam aliquam itaque
            adipisci, nesciunt esse, in, cum sequi explicabo quas perferendis
            ipsa odio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button className="px-8 py-4 bg-black text-white font-bold rounded-2xl hover:bg-amber-600 transition-all shadow-xl shadow-black/10 active:scale-95">
              Get Started
            </button>
            <button className="px-8 py-4 bg-white text-black font-bold rounded-2xl border-2 border-gray-100 hover:border-black transition-all active:scale-95">
              Learn More
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Home;
