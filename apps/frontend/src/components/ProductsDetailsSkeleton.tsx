export function ProductDetailsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 items-start animate-pulse">
      <div className="lg:col-span-2">
        <div className="aspect-square bg-muted rounded-lg" />
      </div>

      <div className="flex flex-col gap-6 lg:col-span-3">
        <div className="space-y-2">
          <div className="h-6 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="h-8 w-32 bg-muted rounded" />
          <div className="h-6 w-16 bg-muted rounded" />
        </div>

        <div className="h-10 w-full bg-muted rounded" />

        <div className="flex flex-col gap-3 pt-6 border-t">
          <div className="h-5 bg-muted rounded w-1/4" />
          <div className="flex flex-row flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-16 bg-muted rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
