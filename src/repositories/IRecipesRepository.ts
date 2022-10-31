import { Recipe } from '../entities/Recipe'

export interface IRecipesRepository {
  createRecipe(recipe: Recipe): Promise<void>
}
