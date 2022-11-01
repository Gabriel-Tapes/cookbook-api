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

  async editRecipe(
    id: string,
    { title, ingredients, howToPrepare }: Omit<Recipe, 'id'>
  ): Promise<Recipe | null> {
    const oldRecipeIndex = this.recipes.findIndex(recipe => recipe.id === id)
    if (!(oldRecipeIndex + 1)) return null

    const oldRecipe = this.recipes[oldRecipeIndex]

    const edditedRecipe = new Recipe(
      {
        title: title || oldRecipe.title,
        ingredients: ingredients || oldRecipe.ingredients,
        howToPrepare: howToPrepare || oldRecipe.howToPrepare
      },
      id
    )

    this.recipes[oldRecipeIndex] = edditedRecipe

    return edditedRecipe
  }
}
