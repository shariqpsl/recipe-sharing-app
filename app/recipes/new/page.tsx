"use client"

import { useRouter } from "next/navigation"

import { RecipeForm } from "@/components/recipe-form"
import { useRecipeStore } from "@/hooks/use-recipe-store"
import { RecipeDraft } from "@/lib/recipes"

export default function NewRecipePage() {
  const router = useRouter()
  const store = useRecipeStore()

  function createRecipe(draft: RecipeDraft) {
    const recipe = store.createRecipe(draft)
    router.push(`/recipes/${recipe.slug}`)
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <div>
        <h1 className="text-3xl font-semibold">Create a recipe</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          New recipes are stored in this browser and can be edited later.
        </p>
      </div>
      <RecipeForm submitLabel="Publish recipe" onSubmit={createRecipe} />
    </div>
  )
}
