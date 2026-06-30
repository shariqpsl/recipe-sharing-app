import { EditRecipe } from "./edit-recipe"

export default async function EditRecipePage({
  params,
}: PageProps<"/recipes/[slug]/edit">) {
  const { slug } = await params

  return <EditRecipe slug={slug} />
}
