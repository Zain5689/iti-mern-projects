import { Skeleton } from "@/components/ui/skeleton"

export default function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Skeleton className="h-8 w-48 mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-[2/3] rounded-xl w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}