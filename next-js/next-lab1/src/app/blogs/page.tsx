import Link from "next/link";

const BlogsPage = () => {
  const blogs = [
    { id: "1", title: "Introduction to Next.js" },
    { id: "2", title: "Mastering Tailwind CSS" },
    { id: "3", title: "Dynamic Routing Explained" },
  ];

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <header className="mb-16">
        <h1 className="text-5xl font-black tracking-tighter text-black">
          Blogs
        </h1>
        <p className="text-gray-500 mt-4 font-medium italic">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
          officia.
        </p>
      </header>
      <div className="grid gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.id}`}
            className="group p-8 border-2 border-gray-50 rounded-3xl hover:border-black hover:bg-black transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight text-black group-hover:text-white">
                {blog.title}
              </h2>
              <span className="text-gray-300 group-hover:text-amber-500 text-2xl font-black transition-colors">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
