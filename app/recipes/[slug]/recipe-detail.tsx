"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Edit, Heart, Star, Timer, Users } from "lucide-react"

import { EmptyState } from "@/components/empty-state"
import { RecipeBadge } from "@/components/recipe-badge"
import { Button } from "@/components/ui/button"
import { useRecipeStore } from "@/hooks/use-recipe-store"
import { totalTime } from "@/lib/recipes"
import { cn } from "@/lib/utils"

export function RecipeDetail({ slug }: { slug: string }) {
  const router = useRouter()
  const store = useRecipeStore()
  const recipe = store.getRecipe(slug)

  if (!recipe) {
    return store.isReady ? (
      <EmptyState
        title="Recipe not found"
        description="This recipe is not available in the seeded list or your local recipes."
        actionHref="/"
        actionLabel="Browse recipes"
      />
    ) : (
      <div className="h-96 animate-pulse rounded-md border bg-muted" />
    )
  }

  return (
    <article className="grid gap-8">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <RecipeBadge>{recipe.category}</RecipeBadge>
            <RecipeBadge>{recipe.difficulty}</RecipeBadge>
            {recipe.isLocal ? <RecipeBadge>Your recipe</RecipeBadge> : null}
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal sm:text-5xl">
            {recipe.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            {recipe.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <RecipeBadge key={tag}>#{tag}</RecipeBadge>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={() => store.toggleSaved(recipe.id)}
              variant={store.isSaved(recipe.id) ? "default" : "outline"}
            >
              <Heart
                className={cn(
                  "size-4",
                  store.isSaved(recipe.id) && "fill-current"
                )}
              />
              {store.isSaved(recipe.id) ? "Saved" : "Save recipe"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => store.toggleLiked(recipe.id)}
            >
              <Heart
                className={cn(
                  "size-4",
                  store.isLiked(recipe.id) && "fill-destructive text-destructive"
                )}
              />
              {recipe.likes + (store.isLiked(recipe.id) ? 1 : 0)} likes
            </Button>
            {recipe.isLocal ? (
              <Button asChild variant="outline">
                <Link href={`/recipes/${recipe.slug}/edit`}>
                  <Edit className="size-4" />
                  Edit
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
        <aside className="rounded-md border bg-card p-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              sizes="(min-width: 1024px) 22rem, 100vw"
              className="object-cover"
            />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md border bg-background p-3">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <Timer className="size-4" />
                Total
              </dt>
              <dd className="mt-1 font-semibold">{totalTime(recipe)} min</dd>
            </div>
            <div className="rounded-md border bg-background p-3">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <Users className="size-4" />
                Servings
              </dt>
              <dd className="mt-1 font-semibold">{recipe.servings}</dd>
            </div>
            <div className="rounded-md border bg-background p-3">
              <dt className="text-muted-foreground">Prep</dt>
              <dd className="mt-1 font-semibold">{recipe.prepTime} min</dd>
            </div>
            <div className="rounded-md border bg-background p-3">
              <dt className="text-muted-foreground">Cook</dt>
              <dd className="mt-1 font-semibold">{recipe.cookTime} min</dd>
            </div>
          </dl>
          <div className="mt-4 flex items-center justify-between rounded-md border bg-background p-3 text-sm">
            <span>By {recipe.author}</span>
            <span className="inline-flex items-center gap-1 font-medium">
              <Star className="size-4 fill-primary text-primary" />
              {recipe.rating ? recipe.rating.toFixed(1) : "New"}
            </span>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <div className="rounded-md border bg-card p-5">
          <h2 className="text-xl font-semibold">Ingredients</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-md border bg-card p-5">
          <h2 className="text-xl font-semibold">Instructions</h2>
          <ol className="mt-4 grid gap-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={instruction} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                <span className="flex size-8 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-6">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    </article>
  )
}
