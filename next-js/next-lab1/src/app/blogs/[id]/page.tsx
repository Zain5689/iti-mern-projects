type IProps = {
  params: Promise<{ id: string }>;
};

const BlogDetails = async ({ params }: IProps) => {
  const { id } = await params;

  console.log("Blog ID:", id);

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <header className="border-b border-gray-100 pb-8 mb-8">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 mb-2 block">
          Article Reference
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black">
          Blog Details — ID: {id}
        </h1>
      </header>

      <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed italic border-l-4 border-black pl-6">
        This is the detailed view for blog with ID:{" "}
        <span className="text-black font-bold underline decoration-amber-500">
          {id}
        </span>
        . Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
        officia.
      </p>
    </div>
  );
};

export default BlogDetails;
