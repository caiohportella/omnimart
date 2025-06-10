import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TagType =
  | "category"
  | "department"
  | "material"
  | "adjective"
  | "source"
  | "discount";

interface ProductTagProps {
  tagType: TagType;
  label: string;
  className?: string;
}

export function ProductTag({ tagType, label, className }: ProductTagProps) {
  const tagStyles: Record<TagType, string> = {
    category:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 border-blue-200 dark:border-blue-800/60",
    department:
      "bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-200 border-green-200 dark:border-green-800/60",
    material:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800/60",
    adjective:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800/60",
    source:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200 border-purple-200 dark:border-purple-800/60",
    discount:
      "bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-200 border-red-200 dark:border-red-800/60",
  };

  const labelPrefix = tagType === "source" ? "Origem: " : "";

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", tagStyles[tagType], className)}
    >
      {labelPrefix}
      {label}
    </Badge>
  );
}
