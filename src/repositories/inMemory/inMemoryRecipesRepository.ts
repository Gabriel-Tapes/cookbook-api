import { Recipe } from '../../entities/Recipe'
import { IRecipesRepository } from '../IRecipesRepository'

export class InMemoryRecipesRepository implements IRecipesRepository {
  private recipes: Recipe[] = []

  async createRecipe(recipe: Recipe): Promise<void> {
    this.recipes.push(recipe)
  }
}
