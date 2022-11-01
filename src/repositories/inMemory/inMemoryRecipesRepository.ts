import { Recipe } from '../../entities/Recipe'
import { IRecipesRepository } from '../IRecipesRepository'

export class InMemoryRecipesRepository implements IRecipesRepository {
  private recipes: Recipe[] = []

  async getRecipeById(id: string): Promise<Recipe | null> {
    const recipe = this.recipes.find(recipe => recipe.id === id)

    return recipe || null
  }

  async getRecipesByTitle(title: string): Promise<Recipe[]> {
    const recipes = this.recipes.filter(
      recipe => recipe.title.indexOf(title) > -1
    )

    return recipes
  }

  async createRecipe(recipe: Recipe): Promise<void> {
    this.recipes.push(recipe)
  }
}
