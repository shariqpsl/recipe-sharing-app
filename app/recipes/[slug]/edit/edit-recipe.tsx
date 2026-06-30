"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { EmptyState } from "@/components/empty-state"
import { RecipeForm } from "@/components/recipe-form"
import { Button } from "@/components/ui/button"
import { useRecipeStore } from "@/hooks/use-recipe-store"
import { RecipeDraft } from "@/lib/recipes"

export function EditRecipe({ slug }: { slug: string }) {
  const router = useRouter()
  const store = useRecipeStore()
  const recipe = store.getRecipe(slug)

  if (!recipe) {
    if (!store.isReady) {
      return <div className="h-96 animate-pulse rounded-md border bg-muted" />
    }

    return (
      <EmptyState
        title="Recipe not found"
        description="This recipe is not available in the seeded list or your local recipes."
        actionHref="/"
        actionLabel="Browse recipes"
      />
    )
  }

  if (!recipe.isLocal) {
    return (
      <div className="mx-auto max-w-2xl rounded-md border bg-card p-6">
        <h1 className="text-2xl font-semibold">Seeded recipes cannot be edited</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Only recipes created in this browser can be changed or deleted.
        </p>
        <Button asChild className="mt-5" variant="outline">
          <Link href={`/recipes/${recipe.slug}`}>Back to recipe</Link>
        </Button>
      </div>
    )
  }

  const localRecipe = recipe

  function updateRecipe(draft: RecipeDraft) {
    const updatedRecipe = store.updateRecipe(localRecipe.id, draft)
    router.push(`/recipes/${updatedRecipe?.slug ?? localRecipe.slug}`)
  }

  function deleteRecipe() {
    store.deleteRecipe(localRecipe.id)
    router.push("/")
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <div>
        <h1 className="text-3xl font-semibold">Edit recipe</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Changes are saved locally in this browser.
        </p>
      </div>
      <RecipeForm
        recipe={localRecipe}
        submitLabel="Save changes"
        onSubmit={updateRecipe}
        onDelete={deleteRecipe}
      />
    </div>
  )
}
