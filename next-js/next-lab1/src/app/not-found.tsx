import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8">
        <h1 className="text-[12rem] font-black tracking-tighter text-gray-100 leading-none select-none">
          404
        </h1>
      </div>

      <div className="space-y-6 max-w-md">
        <h2 className="text-3xl font-black tracking-tight text-black">
          Oops! Page not found.
        </h2>
        <p className="text-gray-500 font-medium leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-block px-10 py-4 bg-black text-white font-bold rounded-2xl hover:bg-amber-500 transition-all shadow-xl shadow-black/5 active:scale-95"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
