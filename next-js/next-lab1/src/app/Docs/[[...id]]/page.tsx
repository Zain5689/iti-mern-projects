type IProps = {
  params: Promise<{ slug?: string[] }>;
};

const DocsPage = async ({ params }: IProps) => {
  const { slug } = await params;

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <header className="mb-12 border-b border-gray-100 pb-8">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-2 block">
          Documentation Portal
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-none">
          Docs Explorer.
        </h1>
      </header>

      <div className="bg-gray-50 rounded-3xl p-10 border-2 border-dashed border-gray-200">
        {!slug ? (
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-black">Docs Home</h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Welcome to the main documentation hub. Select a topic to begin
              exploring nested segments.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
                Current Path
              </h2>
              <div className="flex flex-wrap gap-2">
                {slug.map((segment, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-black/5">
                      {segment}
                    </span>
                    {index < slug.length - 1 && (
                      <span className="text-gray-300 font-bold">/</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-xl text-gray-600 font-medium italic">
                Viewing content for:{" "}
                <span className="text-black font-black not-italic">
                  "{slug.join(" / ")}"
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocsPage;
