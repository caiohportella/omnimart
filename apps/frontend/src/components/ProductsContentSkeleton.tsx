export function ProductsContentSkeleton() {
  return (
    <div className="flex flex-1">
      <div className="hidden md:block w-64 p-4 space-y-6 border-r bg-white dark:bg-background">
        {/* Sidebar Skeleton */}
        <div className="h-6 bg-muted rounded" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-muted rounded" />
          ))}
        </div>
      </div>

      <main className="flex-1 p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="border rounded-md p-4 space-y-4 animate-pulse"
            >
              <div className="aspect-square bg-muted rounded-md" />
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="h-5 bg-muted rounded w-1/3" />
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-muted rounded-full" />
                <div className="h-5 w-12 bg-muted rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
