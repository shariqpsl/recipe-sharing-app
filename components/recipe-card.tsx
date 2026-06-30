"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star, Timer } from "lucide-react"

import { RecipeBadge } from "@/components/recipe-badge"
import { Button } from "@/components/ui/button"
import { Recipe, totalTime } from "@/lib/recipes"
import { cn } from "@/lib/utils"

export function RecipeCard({
  recipe,
  saved,
  liked,
  onToggleSaved,
  onToggleLiked,
}: {
  recipe: Recipe
  saved: boolean
  liked: boolean
  onToggleSaved: (id: string) => void
  onToggleLiked: (id: string) => void
}) {
  return (
    <article className="group overflow-hidden rounded-md border bg-card text-card-foreground shadow-xs transition hover:border-primary/40">
      <Link href={`/recipes/${recipe.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          {recipe.isLocal ? (
            <RecipeBadge className="absolute left-3 top-3 bg-background/90 text-foreground">
              Your recipe
            </RecipeBadge>
          ) : null}
        </div>
      </Link>
      <div className="flex min-h-64 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <RecipeBadge>{recipe.category}</RecipeBadge>
            <Link href={`/recipes/${recipe.slug}`}>
              <h2 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug">
                {recipe.title}
              </h2>
            </Link>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={saved ? "Remove from saved recipes" : "Save recipe"}
            onClick={() => onToggleSaved(recipe.id)}
          >
            <Heart
              className={cn(
                "size-4",
                saved && "fill-destructive text-destructive"
              )}
            />
          </Button>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {recipe.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {recipe.tags.slice(0, 3).map((tag) => (
            <RecipeBadge key={tag}>#{tag}</RecipeBadge>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Timer className="size-4" />
            {totalTime(recipe)} min
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="size-4 fill-primary text-primary" />
            {recipe.rating ? recipe.rating.toFixed(1) : "New"}
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-1 font-medium text-foreground"
            onClick={() => onToggleLiked(recipe.id)}
          >
            <Heart
              className={cn(
                "size-4",
                liked && "fill-destructive text-destructive"
              )}
            />
            {recipe.likes + (liked ? 1 : 0)}
          </button>
        </div>
      </div>
    </article>
  )
}
