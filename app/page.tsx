"use client"

import * as React from "react"
import { ChefHat, Clock, Sparkles } from "lucide-react"

import { EmptyState } from "@/components/empty-state"
import {
  defaultRecipeFilters,
  RecipeFilters,
  RecipeFiltersState,
} from "@/components/recipe-filters"
import { RecipeCard } from "@/components/recipe-card"
import { RecipeBadge } from "@/components/recipe-badge"
import { useRecipeStore } from "@/hooks/use-recipe-store"
import { Recipe, totalTime } from "@/lib/recipes"

function matchesRecipe(recipe: Recipe, filters: RecipeFiltersState) {
  const haystack = [
    recipe.title,
    recipe.description,
    recipe.author,
    recipe.category,
    ...recipe.tags,
    ...recipe.ingredients,
  ]
    .join(" ")
    .toLowerCase()
  const query = filters.query.trim().toLowerCase()

  if (query && !haystack.includes(query)) {
    return false
  }

  if (filters.category && recipe.category !== filters.category) {
    return false
  }

  if (filters.difficulty && recipe.difficulty !== filters.difficulty) {
    return false
  }

  if (filters.maxTime && totalTime(recipe) > Number(filters.maxTime)) {
    return false
  }

  return true
}

export default function Page() {
  const store = useRecipeStore()
  const [filters, setFilters] =
    React.useState<RecipeFiltersState>(defaultRecipeFilters)
  const featured = store.recipes[0]
  const filteredRecipes = store.recipes.filter((recipe) =>
    matchesRecipe(recipe, filters)
  )

  return (
    <div className="grid gap-8">
      <section className="grid gap-6 rounded-md border bg-card p-5 md:grid-cols-[minmax(0,1fr)_19rem] md:p-7">
        <div className="flex min-w-0 flex-col justify-center">
          <RecipeBadge className="w-fit">
            <Sparkles className="mr-1 size-3" />
            Local recipe community
          </RecipeBadge>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-normal sm:text-4xl">
            Discover reliable recipes and save the ones worth cooking again.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Browse tested ideas, filter by time and difficulty, and add your own
            recipes locally while this MVP stays lightweight.
          </p>
          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-md border bg-background p-3">
              <ChefHat className="mb-2 size-4 text-primary" />
              <div className="font-semibold">{store.recipes.length} recipes</div>
              <div className="text-muted-foreground">Seeded and local</div>
            </div>
            <div className="rounded-md border bg-background p-3">
              <Clock className="mb-2 size-4 text-primary" />
              <div className="font-semibold">Fast filters</div>
              <div className="text-muted-foreground">Search by ingredient</div>
            </div>
            <div className="rounded-md border bg-background p-3">
              <Sparkles className="mb-2 size-4 text-primary" />
              <div className="font-semibold">Saved picks</div>
              <div className="text-muted-foreground">Persisted locally</div>
            </div>
          </div>
        </div>
        {featured ? (
          <div className="rounded-md border bg-background p-4">
            <RecipeBadge>Featured</RecipeBadge>
            <h2 className="mt-3 text-xl font-semibold">{featured.title}</h2>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
              {featured.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <RecipeBadge>{featured.difficulty}</RecipeBadge>
              <RecipeBadge>{totalTime(featured)} min</RecipeBadge>
              <RecipeBadge>{featured.servings} servings</RecipeBadge>
            </div>
          </div>
        ) : null}
      </section>

      <RecipeFilters filters={filters} onChange={setFilters} />

      <section className="grid gap-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Recipe feed</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredRecipes.length} result
              {filteredRecipes.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
        {filteredRecipes.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                saved={store.isSaved(recipe.id)}
                liked={store.isLiked(recipe.id)}
                onToggleSaved={store.toggleSaved}
                onToggleLiked={store.toggleLiked}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No recipes match these filters"
            description="Reset the filters or try a broader ingredient, tag, or category search."
          />
        )}
      </section>
    </div>
  )
}
