"use client"

import { EmptyState } from "@/components/empty-state"
import { RecipeCard } from "@/components/recipe-card"
import { useRecipeStore } from "@/hooks/use-recipe-store"

export default function SavedRecipesPage() {
  const store = useRecipeStore()
  const savedRecipes = store.recipes.filter((recipe) =>
    store.savedIds.includes(recipe.id)
  )

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold">Saved recipes</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Recipes you save are kept in this browser.
        </p>
      </div>

      {savedRecipes.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {savedRecipes.map((recipe) => (
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
          title="No saved recipes yet"
          description="Save recipes from the feed or detail pages and they will appear here."
          actionHref="/"
          actionLabel="Browse recipes"
        />
      )}
    </div>
  )
}
