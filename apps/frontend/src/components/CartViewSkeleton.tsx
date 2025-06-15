export function CartViewSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-1/3 bg-muted rounded" />
        <div className="h-8 w-24 bg-muted rounded" />
      </div>

      <div className="grid lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2 space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-20 w-20 bg-muted rounded-md" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
              <div className="h-8 w-8 bg-muted rounded" />
            </div>
          ))}
        </div>

        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <div className="border rounded-md p-4 space-y-4">
            <div className="h-6 bg-muted rounded w-1/2" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-4 bg-muted rounded w-1/4" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-4 bg-muted rounded w-1/4" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-4 bg-muted rounded w-1/4" />
              </div>
            </div>
            <div className="h-10 bg-muted rounded w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
