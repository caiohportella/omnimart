import { Skeleton } from "./ui/skeleton";

export function SidebarFiltersSkeleton() {
  return (
    <div className="hidden md:block w-64 p-4 space-y-6 border-r bg-white dark:bg-background">
      <Skeleton className="h-6 w-24" /> {/* Filtros título */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-28" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Select */}
        </div>
      ))}
      <div className="pt-4 border-t">
        <Skeleton className="h-10 w-full" /> {/* Botão Limpar */}
      </div>
    </div>
  );
}
