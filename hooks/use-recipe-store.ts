"use client"

import * as React from "react"

import {
  Recipe,
  RecipeDraft,
  seedRecipes,
  uniqueSlug,
} from "@/lib/recipes"

const LOCAL_RECIPES_KEY = "recipe-share:recipes"
const SAVED_RECIPES_KEY = "recipe-share:saved"
const LIKED_RECIPES_KEY = "recipe-share:liked"

type RecipeStore = {
  recipes: Recipe[]
  savedIds: string[]
  likedIds: string[]
  isReady: boolean
  getRecipe: (slug: string) => Recipe | undefined
  createRecipe: (draft: RecipeDraft) => Recipe
  updateRecipe: (id: string, draft: RecipeDraft) => Recipe | undefined
  deleteRecipe: (id: string) => void
  toggleSaved: (id: string) => void
  toggleLiked: (id: string) => void
  isSaved: (id: string) => boolean
  isLiked: (id: string) => boolean
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback
  }

  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage can fail in private browsing or constrained environments.
  }
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }

  return `local-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function withLocalRecipe(draft: RecipeDraft, recipes: Recipe[]): Recipe {
  return {
    ...draft,
    id: createId(),
    slug: uniqueSlug(draft.title, recipes),
    rating: 0,
    likes: 0,
    createdAt: new Date().toISOString(),
    isLocal: true,
  }
}

export function useRecipeStore(): RecipeStore {
  const [localRecipes, setLocalRecipes] = React.useState<Recipe[]>([])
  const [savedIds, setSavedIds] = React.useState<string[]>([])
  const [likedIds, setLikedIds] = React.useState<string[]>([])
  const [isReady, setIsReady] = React.useState(false)

  

  React.useEffect(() => {
    setLocalRecipes(readJson<Recipe[]>(LOCAL_RECIPES_KEY, []))
    setSavedIds(readJson<string[]>(SAVED_RECIPES_KEY, []))
    setLikedIds(readJson<string[]>(LIKED_RECIPES_KEY, []))
    setIsReady(true)
  }, [])
  

  React.useEffect(() => {
    if (isReady) {
      writeJson(LOCAL_RECIPES_KEY, localRecipes)
    }
  }, [isReady, localRecipes])

  React.useEffect(() => {
    if (isReady) {
      writeJson(SAVED_RECIPES_KEY, savedIds)
    }
  }, [isReady, savedIds])

  React.useEffect(() => {
    if (isReady) {
      writeJson(LIKED_RECIPES_KEY, likedIds)
    }
  }, [isReady, likedIds])

  const recipes = React.useMemo(
    () =>
      [...localRecipes, ...seedRecipes].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [localRecipes]
  )

  const getRecipe = React.useCallback(
    (slug: string) => recipes.find((recipe) => recipe.slug === slug),
    [recipes]
  )

  const createRecipe = React.useCallback(
    (draft: RecipeDraft) => {
      const recipe = withLocalRecipe(draft, recipes)
      setLocalRecipes((current) => [recipe, ...current])
      return recipe
    },
    [recipes]
  )

  const updateRecipe = React.useCallback(
    (id: string, draft: RecipeDraft) => {
      let updatedRecipe: Recipe | undefined

      setLocalRecipes((current) => {
        const mergedRecipes = [...current, ...seedRecipes]

        return current.map((recipe) => {
          if (recipe.id !== id || !recipe.isLocal) {
            return recipe
          }

          updatedRecipe = {
            ...recipe,
            ...draft,
            slug: uniqueSlug(draft.title, mergedRecipes, id),
          }

          return updatedRecipe
        })
      })

      return updatedRecipe
    },
    []
  )

  const deleteRecipe = React.useCallback((id: string) => {
    setLocalRecipes((current) => current.filter((recipe) => recipe.id !== id))
    setSavedIds((current) => current.filter((savedId) => savedId !== id))
    setLikedIds((current) => current.filter((likedId) => likedId !== id))
  }, [])

  const toggleSaved = React.useCallback((id: string) => {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    )
  }, [])

  const toggleLiked = React.useCallback((id: string) => {
    setLikedIds((current) =>
      current.includes(id)
        ? current.filter((likedId) => likedId !== id)
        : [...current, id]
    )
  }, [])

  const isSaved = React.useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  )

  const isLiked = React.useCallback(
    (id: string) => likedIds.includes(id),
    [likedIds]
  )

  return {
    recipes,
    savedIds,
    likedIds,
    isReady,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    toggleSaved,
    toggleLiked,
    isSaved,
    isLiked,
  }
}
