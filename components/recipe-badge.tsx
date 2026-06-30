import { cn } from "@/lib/utils"

export function RecipeBadge({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-md border bg-background px-2 text-xs font-medium text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  )
}
