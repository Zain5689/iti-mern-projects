const AboutPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-amber-100/50 rounded-3xl blur-2xl group-hover:bg-amber-200/60 transition-all"></div>
            <div className="relative aspect-square bg-black rounded-3xl overflow-hidden flex items-center justify-center text-white font-black text-6xl">
              Next.js
            </div>
          </div>

          <div className="space-y-8">
            <header className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600">
                The Creative Mind
              </span>
              <h1 className="text-5xl font-black tracking-tighter leading-none text-black">
                About the <br /> Project.
              </h1>
            </header>

            <div className="space-y-6 text-gray-500 leading-relaxed font-medium">
              <p>
                Welcome to{" "}
                <span className="text-black font-bold">Next-Lab1</span>, a
                specialized experimental environment built to master modern web
                technologies. This project focuses on clean architecture,
                responsive design, and high-performance UI components.
              </p>
            </div>

            {/* Stats/Skills Micro-Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 border-l-2 border-black bg-gray-50">
                <div className="text-2xl font-black text-black">01.</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                  React & Next.js
                </div>
              </div>
              <div className="p-4 border-l-2 border-amber-500 bg-gray-50">
                <div className="text-2xl font-black text-black">02.</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                  Tailwind CSS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
