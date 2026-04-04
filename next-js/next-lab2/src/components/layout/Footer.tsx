const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6  pb-2">
          <div>
            <h3 className="text-lg font-black tracking-tighter text-black uppercase">
              Next.js Lab2
            </h3>
          </div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest italic">
            Assignment: App Router & API Proxying
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
