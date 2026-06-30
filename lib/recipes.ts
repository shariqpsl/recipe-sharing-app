export type Difficulty = "Easy" | "Medium" | "Hard"

export type Recipe = {
  id: string
  slug: string
  title: string
  description: string
  image: string
  category: string
  tags: string[]
  ingredients: string[]
  instructions: string[]
  prepTime: number
  cookTime: number
  servings: number
  difficulty: Difficulty
  author: string
  rating: number
  likes: number
  createdAt: string
  isLocal?: boolean
}

export type RecipeDraft = {
  title: string
  description: string
  image: string
  category: string
  tags: string[]
  ingredients: string[]
  instructions: string[]
  prepTime: number
  cookTime: number
  servings: number
  difficulty: Difficulty
  author: string
}

export const categories = [
  "Breakfast",
  "Dinner",
  "Vegetarian",
  "Dessert",
  "Quick",
  "Comfort",
] as const

export const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"]

export const seedRecipes: Recipe[] = [
  {
    id: "seed-1",
    slug: "lemon-herb-chicken-bowls",
    title: "Lemon Herb Chicken Bowls",
    description:
      "Bright grilled chicken, crisp vegetables, and herby yogurt sauce over warm rice.",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    category: "Dinner",
    tags: ["chicken", "rice", "meal prep", "fresh"],
    ingredients: [
      "2 chicken breasts",
      "1 lemon, juiced",
      "2 cups cooked rice",
      "1 cucumber, diced",
      "1 cup cherry tomatoes",
      "1/2 cup Greek yogurt",
      "2 tbsp chopped dill",
      "1 tbsp olive oil",
    ],
    instructions: [
      "Marinate chicken with lemon juice, olive oil, salt, pepper, and chopped herbs for 20 minutes.",
      "Grill or sear chicken until cooked through, then rest for 5 minutes.",
      "Stir yogurt with dill, lemon zest, salt, and a splash of water.",
      "Assemble rice, vegetables, sliced chicken, and yogurt sauce in bowls.",
    ],
    prepTime: 20,
    cookTime: 18,
    servings: 4,
    difficulty: "Easy",
    author: "Maya Chen",
    rating: 4.8,
    likes: 128,
    createdAt: "2026-05-01T10:00:00.000Z",
  },
  {
    id: "seed-2",
    slug: "spiced-lentil-soup",
    title: "Spiced Lentil Soup",
    description:
      "A cozy one-pot soup with red lentils, tomatoes, cumin, and a lemon finish.",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80",
    category: "Vegetarian",
    tags: ["lentils", "soup", "one pot", "vegan"],
    ingredients: [
      "1 cup red lentils",
      "1 onion, diced",
      "2 carrots, diced",
      "3 garlic cloves",
      "1 can crushed tomatoes",
      "4 cups vegetable stock",
      "1 tsp cumin",
      "1 lemon",
    ],
    instructions: [
      "Saute onion and carrots until softened.",
      "Add garlic, cumin, lentils, tomatoes, and stock.",
      "Simmer for 25 minutes until lentils are tender.",
      "Blend partially, then finish with lemon juice and herbs.",
    ],
    prepTime: 12,
    cookTime: 30,
    servings: 6,
    difficulty: "Easy",
    author: "Noah Patel",
    rating: 4.7,
    likes: 96,
    createdAt: "2026-04-21T12:30:00.000Z",
  },
  {
    id: "seed-3",
    slug: "berry-overnight-oats",
    title: "Berry Overnight Oats",
    description:
      "Creamy oats layered with berries, chia, and toasted almonds for busy mornings.",
    image:
      "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=1200&q=80",
    category: "Breakfast",
    tags: ["oats", "berries", "make ahead", "quick"],
    ingredients: [
      "1 cup rolled oats",
      "1 cup milk",
      "1/2 cup Greek yogurt",
      "1 tbsp chia seeds",
      "1 tbsp maple syrup",
      "1 cup mixed berries",
      "2 tbsp toasted almonds",
    ],
    instructions: [
      "Mix oats, milk, yogurt, chia, and maple syrup in a jar.",
      "Refrigerate for at least 6 hours or overnight.",
      "Top with berries and almonds before serving.",
    ],
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    author: "Avery Stone",
    rating: 4.6,
    likes: 74,
    createdAt: "2026-05-12T08:00:00.000Z",
  },
  {
    id: "seed-4",
    slug: "miso-mushroom-pasta",
    title: "Miso Mushroom Pasta",
    description:
      "Savory mushrooms and white miso folded into a glossy weeknight pasta sauce.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80",
    category: "Comfort",
    tags: ["pasta", "mushrooms", "umami", "weeknight"],
    ingredients: [
      "12 oz pasta",
      "12 oz mushrooms, sliced",
      "2 tbsp white miso",
      "2 garlic cloves",
      "1/2 cup pasta water",
      "2 tbsp butter",
      "1/4 cup parmesan",
      "Parsley",
    ],
    instructions: [
      "Cook pasta until al dente, reserving pasta water.",
      "Brown mushrooms in butter until deeply golden.",
      "Add garlic, miso, and pasta water to make a sauce.",
      "Toss with pasta, parmesan, and parsley.",
    ],
    prepTime: 10,
    cookTime: 22,
    servings: 4,
    difficulty: "Medium",
    author: "Sam Rivera",
    rating: 4.9,
    likes: 143,
    createdAt: "2026-03-30T18:15:00.000Z",
  },
  {
    id: "seed-5",
    slug: "cardamom-apple-crisp",
    title: "Cardamom Apple Crisp",
    description:
      "Tender apples baked under a brown sugar oat topping with warm cardamom.",
    image:
      "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=1200&q=80",
    category: "Dessert",
    tags: ["apple", "baking", "oats", "cozy"],
    ingredients: [
      "5 apples, sliced",
      "1/2 cup brown sugar",
      "1 cup rolled oats",
      "1/2 cup flour",
      "1 tsp cardamom",
      "1 tsp cinnamon",
      "6 tbsp cold butter",
      "1 tbsp lemon juice",
    ],
    instructions: [
      "Toss apples with lemon juice, cinnamon, and a spoonful of sugar.",
      "Mix oats, flour, cardamom, brown sugar, and butter into crumbs.",
      "Spread topping over apples in a baking dish.",
      "Bake at 375 F for 35 minutes until bubbling and golden.",
    ],
    prepTime: 18,
    cookTime: 35,
    servings: 8,
    difficulty: "Medium",
    author: "Priya Kapoor",
    rating: 4.8,
    likes: 112,
    createdAt: "2026-02-18T16:45:00.000Z",
  },
  {
    id: "seed-6",
    slug: "shrimp-taco-skillet",
    title: "Shrimp Taco Skillet",
    description:
      "A fast skillet dinner with spiced shrimp, charred corn, lime, and avocado.",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80",
    category: "Quick",
    tags: ["shrimp", "tacos", "skillet", "20 minute"],
    ingredients: [
      "1 lb shrimp",
      "1 cup corn",
      "1 bell pepper",
      "1 tsp chili powder",
      "1/2 tsp cumin",
      "1 avocado",
      "1 lime",
      "Corn tortillas",
    ],
    instructions: [
      "Season shrimp with chili powder, cumin, salt, and pepper.",
      "Char corn and bell pepper in a hot skillet.",
      "Add shrimp and cook until pink and just firm.",
      "Serve with tortillas, avocado, and lime wedges.",
    ],
    prepTime: 8,
    cookTime: 12,
    servings: 4,
    difficulty: "Easy",
    author: "Elena Brooks",
    rating: 4.7,
    likes: 88,
    createdAt: "2026-05-20T19:00:00.000Z",
  },
]

export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return slug || "recipe"
}

export function totalTime(recipe: Pick<Recipe, "prepTime" | "cookTime">) {
  return recipe.prepTime + recipe.cookTime
}

export function uniqueSlug(title: string, recipes: Recipe[], id?: string) {
  const base = slugify(title)
  let candidate = base
  let count = 2

  while (recipes.some((recipe) => recipe.slug === candidate && recipe.id !== id)) {
    candidate = `${base}-${count}`
    count += 1
  }

  return candidate
}
