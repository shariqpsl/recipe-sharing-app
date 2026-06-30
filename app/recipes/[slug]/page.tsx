import { RecipeDetail } from "./recipe-detail"

export default async function RecipeDetailPage({
  params,
}: PageProps<"/recipes/[slug]">) {
  const { slug } = await params

  return <RecipeDetail slug={slug} />
}
