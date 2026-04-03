const Footer = () => {
  return (
    <footer className=" border-t border-gray-100 bg-gray-100">
      <div className="container mx-auto px-6 py-4 flex justify-center">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xl font-black tracking-tighter text-black">
            <span className="bg-black text-white px-2 py-0.5 rounded-lg">
              L
            </span>
            <span>Lab1</span>
          </div>

          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.3em]">
            © 2026 Next Lab Series — Zainab Hilal
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
