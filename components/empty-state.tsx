import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string
  description: string
  actionHref?: string
  actionLabel?: string
}) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-md border border-dashed px-6 py-12 text-center">
      <div className="mb-4 flex size-10 items-center justify-center rounded-md bg-muted">
        <Search className="size-5 text-muted-foreground" />
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
      {actionHref && actionLabel ? (
        <Button asChild className="mt-5">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  )
}
