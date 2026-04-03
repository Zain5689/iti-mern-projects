import Link from "next/link";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const sidebarLinks = [
    { name: "Info", href: "/profile/info" },
    { name: "Orders", href: "/profile/orders" },
    { name: "Points", href: "/profile/points" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row gap-10">
        <aside className="w-full md:w-64 space-y-6">
          <div className="px-4">
            <h2 className="text-xl font-black uppercase tracking-tighter text-black">
              Account Settings
            </h2>
          </div>
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-6 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest text-gray-500 hover:bg-black hover:text-white transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
