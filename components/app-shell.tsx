import Link from "next/link"
import { BookOpen, Heart, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BookOpen className="size-4" />
            </span>
            <span className="truncate text-base font-semibold">Recipe Share</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/saved">
                <Heart className="size-4" />
                <span className="hidden sm:inline">Saved</span>
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/recipes/new">
                <Plus className="size-4" />
                <span>New recipe</span>
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  )
}
