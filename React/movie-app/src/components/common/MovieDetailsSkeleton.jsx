export default function MovieDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="col-span-1">
          <div className="skeleton aspect-[2/3] w-full rounded-2xl" />
        </div>

        <div className="col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="skeleton h-12 md:h-16 w-3/4 rounded-lg" />
            <div className="skeleton h-6 w-1/2 rounded-lg" />
          </div>

          <div className="flex gap-4">
            <div className="skeleton h-10 w-24 rounded-lg" />
            <div className="skeleton h-10 w-24 rounded-lg" />
            <div className="skeleton h-10 w-24 rounded-lg" />
          </div>

          <div className="space-y-3">
            <div className="skeleton h-8 w-32 rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-2/3 rounded" />
          </div>

          <div className="space-y-4">
            <div className="skeleton h-8 w-40 rounded" />
            <div className="skeleton aspect-video w-full rounded-2xl" />
          </div>
        </div>
      </div>

      <section className="pt-10 border-t border-white/5">
        <div className="skeleton h-10 w-64 mb-8 rounded-lg" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="skeleton aspect-[2/3] w-full rounded-xl" />
              <div className="skeleton h-4 w-3/4 mx-auto rounded" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
