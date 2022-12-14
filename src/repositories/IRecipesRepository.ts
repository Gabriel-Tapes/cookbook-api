import { Recipe } from '../entities/Recipe'

export interface IRecipesRepository {
  createRecipe(recipe: Recipe): Promise<void>
  getRecipeById(id: string): Promise<Recipe | null>
  getRecipesByTitle(title: string): Promise<Recipe[]>
  editRecipe(
    id: string,
    { title, ingredients, howToPrepare }: Omit<Recipe, 'id'>
  ): Promise<Recipe | null>
}
