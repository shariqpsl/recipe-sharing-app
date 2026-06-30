"use client"

import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { categories, difficulties, Difficulty } from "@/lib/recipes"

export type RecipeFiltersState = {
  query: string
  category: string
  difficulty: "" | Difficulty
  maxTime: string
}

export const defaultRecipeFilters: RecipeFiltersState = {
  query: "",
  category: "",
  difficulty: "",
  maxTime: "",
}

export function RecipeFilters({
  filters,
  onChange,
}: {
  filters: RecipeFiltersState
  onChange: (filters: RecipeFiltersState) => void
}) {
  const hasFilters =
    filters.query || filters.category || filters.difficulty || filters.maxTime

  return (
    <section className="rounded-md border bg-card p-4">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_11rem_10rem_10rem_auto]">
        <label className="relative block">
          <span className="sr-only">Search recipes</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={filters.query}
            onChange={(event) =>
              onChange({ ...filters, query: event.target.value })
            }
            placeholder="Search recipes, ingredients, tags"
            className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
          />
        </label>
        <label>
          <span className="sr-only">Category</span>
          <select
            value={filters.category}
            onChange={(event) =>
              onChange({ ...filters, category: event.target.value })
            }
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Difficulty</span>
          <select
            value={filters.difficulty}
            onChange={(event) =>
              onChange({
                ...filters,
                difficulty: event.target.value as "" | Difficulty,
              })
            }
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
          >
            <option value="">Any level</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Maximum time</span>
          <select
            value={filters.maxTime}
            onChange={(event) =>
              onChange({ ...filters, maxTime: event.target.value })
            }
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
          >
            <option value="">Any time</option>
            <option value="20">20 min</option>
            <option value="30">30 min</option>
            <option value="45">45 min</option>
            <option value="60">60 min</option>
          </select>
        </label>
        <Button
          type="button"
          variant="outline"
          disabled={!hasFilters}
          onClick={() => onChange(defaultRecipeFilters)}
        >
          <X className="size-4" />
          Reset
        </Button>
      </div>
    </section>
  )
}
