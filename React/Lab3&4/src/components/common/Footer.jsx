const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-3">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-amber-500 font-bold">Z-Store</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
