"use client"

import * as React from "react"
import { Plus, Trash2 } from "lucide-react"

import { RecipeBadge } from "@/components/recipe-badge"
import { Button } from "@/components/ui/button"
import {
  categories,
  difficulties,
  Difficulty,
  Recipe,
  RecipeDraft,
} from "@/lib/recipes"

const defaultImage =
  "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80"

const emptyDraft: RecipeDraft = {
  title: "",
  description: "",
  image: defaultImage,
  category: "Dinner",
  tags: [],
  ingredients: ["", ""],
  instructions: ["", ""],
  prepTime: 10,
  cookTime: 20,
  servings: 4,
  difficulty: "Easy",
  author: "Local cook",
}

type FormErrors = Partial<Record<keyof RecipeDraft, string>>

function draftFromRecipe(recipe?: Recipe): RecipeDraft {
  if (!recipe) {
    return emptyDraft
  }

  return {
    title: recipe.title,
    description: recipe.description,
    image: recipe.image,
    category: recipe.category,
    tags: recipe.tags,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    servings: recipe.servings,
    difficulty: recipe.difficulty,
    author: recipe.author,
  }
}

function splitTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function sanitizeDraft(draft: RecipeDraft): RecipeDraft {
  return {
    ...draft,
    title: draft.title.trim(),
    description: draft.description.trim(),
    image: draft.image.trim() || defaultImage,
    category: draft.category.trim() || "Dinner",
    author: draft.author.trim() || "Local cook",
    tags: draft.tags.map((tag) => tag.trim()).filter(Boolean),
    ingredients: draft.ingredients.map((item) => item.trim()).filter(Boolean),
    instructions: draft.instructions.map((item) => item.trim()).filter(Boolean),
    prepTime: Math.max(0, Number(draft.prepTime) || 0),
    cookTime: Math.max(0, Number(draft.cookTime) || 0),
    servings: Math.max(1, Number(draft.servings) || 1),
  }
}

function validateDraft(draft: RecipeDraft) {
  const errors: FormErrors = {}

  if (!draft.title) errors.title = "Add a title."
  if (!draft.description) errors.description = "Add a short description."
  if (!draft.ingredients.length) errors.ingredients = "Add at least one ingredient."
  if (!draft.instructions.length) errors.instructions = "Add at least one step."
  if (draft.prepTime + draft.cookTime <= 0) {
    errors.cookTime = "Prep or cook time must be above zero."
  }

  return errors
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {error ? <span className="text-xs text-destructive">{error}</span> : null}
    </label>
  )
}

const inputClass =
  "min-h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"

export function RecipeForm({
  recipe,
  submitLabel,
  onSubmit,
  onDelete,
}: {
  recipe?: Recipe
  submitLabel: string
  onSubmit: (draft: RecipeDraft) => void
  onDelete?: () => void
}) {
  const [draft, setDraft] = React.useState<RecipeDraft>(() =>
    draftFromRecipe(recipe)
  )
  const [tagInput, setTagInput] = React.useState(() =>
    draftFromRecipe(recipe).tags.join(", ")
  )
  const [errors, setErrors] = React.useState<FormErrors>({})

  function updateList(
    key: "ingredients" | "instructions",
    index: number,
    value: string
  ) {
    setDraft((current) => ({
      ...current,
      [key]: current[key].map((item, itemIndex) =>
        itemIndex === index ? value : item
      ),
    }))
  }

  function removeListItem(key: "ingredients" | "instructions", index: number) {
    setDraft((current) => ({
      ...current,
      [key]: current[key].filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanDraft = sanitizeDraft({ ...draft, tags: splitTags(tagInput) })
    const nextErrors = validateDraft(cleanDraft)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      onSubmit(cleanDraft)
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-6">
      <section className="grid gap-4 rounded-md border bg-card p-4 sm:p-5">
        <div>
          <h2 className="text-lg font-semibold">Recipe basics</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Keep the title clear and the description useful for browsing.
          </p>
        </div>
        <Field label="Title" error={errors.title}>
          <input
            value={draft.title}
            onChange={(event) =>
              setDraft({ ...draft, title: event.target.value })
            }
            className={inputClass}
            placeholder="Smoky tomato gnocchi"
          />
        </Field>
        <Field label="Description" error={errors.description}>
          <textarea
            value={draft.description}
            onChange={(event) =>
              setDraft({ ...draft, description: event.target.value })
            }
            className={inputClass}
            rows={3}
            placeholder="A quick one-pan dinner with..."
          />
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Category">
            <select
              value={draft.category}
              onChange={(event) =>
                setDraft({ ...draft, category: event.target.value })
              }
              className={inputClass}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Difficulty">
            <select
              value={draft.difficulty}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  difficulty: event.target.value as Difficulty,
                })
              }
              className={inputClass}
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Image URL">
          <input
            value={draft.image}
            onChange={(event) =>
              setDraft({ ...draft, image: event.target.value })
            }
            className={inputClass}
            placeholder="https://..."
          />
        </Field>
        <Field label="Tags">
          <input
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            className={inputClass}
            placeholder="quick, vegetarian, weeknight"
          />
        </Field>
        {splitTags(tagInput).length ? (
          <div className="flex flex-wrap gap-2">
            {splitTags(tagInput).map((tag) => (
              <RecipeBadge key={tag}>#{tag}</RecipeBadge>
            ))}
          </div>
        ) : null}
      </section>

      <section className="grid gap-4 rounded-md border bg-card p-4 sm:p-5">
        <h2 className="text-lg font-semibold">Timing and yield</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Prep minutes">
            <input
              type="number"
              min={0}
              value={draft.prepTime}
              onChange={(event) =>
                setDraft({ ...draft, prepTime: Number(event.target.value) })
              }
              className={inputClass}
            />
          </Field>
          <Field label="Cook minutes" error={errors.cookTime}>
            <input
              type="number"
              min={0}
              value={draft.cookTime}
              onChange={(event) =>
                setDraft({ ...draft, cookTime: Number(event.target.value) })
              }
              className={inputClass}
            />
          </Field>
          <Field label="Servings">
            <input
              type="number"
              min={1}
              value={draft.servings}
              onChange={(event) =>
                setDraft({ ...draft, servings: Number(event.target.value) })
              }
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Author">
          <input
            value={draft.author}
            onChange={(event) =>
              setDraft({ ...draft, author: event.target.value })
            }
            className={inputClass}
          />
        </Field>
      </section>

      <section className="grid gap-4 rounded-md border bg-card p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Ingredients</h2>
            {errors.ingredients ? (
              <p className="mt-1 text-xs text-destructive">
                {errors.ingredients}
              </p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setDraft({
                ...draft,
                ingredients: [...draft.ingredients, ""],
              })
            }
          >
            <Plus className="size-4" />
            Add
          </Button>
        </div>
        <div className="grid gap-2">
          {draft.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={ingredient}
                onChange={(event) =>
                  updateList("ingredients", index, event.target.value)
                }
                className={inputClass}
                placeholder={`Ingredient ${index + 1}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Remove ingredient"
                onClick={() => removeListItem("ingredients", index)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 rounded-md border bg-card p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Instructions</h2>
            {errors.instructions ? (
              <p className="mt-1 text-xs text-destructive">
                {errors.instructions}
              </p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setDraft({
                ...draft,
                instructions: [...draft.instructions, ""],
              })
            }
          >
            <Plus className="size-4" />
            Add
          </Button>
        </div>
        <div className="grid gap-2">
          {draft.instructions.map((instruction, index) => (
            <div key={index} className="flex gap-2">
              <textarea
                value={instruction}
                onChange={(event) =>
                  updateList("instructions", index, event.target.value)
                }
                className={inputClass}
                rows={2}
                placeholder={`Step ${index + 1}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Remove step"
                onClick={() => removeListItem("instructions", index)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-between">
        {onDelete ? (
          <Button type="button" variant="destructive" onClick={onDelete}>
            <Trash2 className="size-4" />
            Delete recipe
          </Button>
        ) : (
          <span />
        )}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}
