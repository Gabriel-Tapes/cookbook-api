import { Recipe } from '../../../entities/Recipe'
import { IRecipesRepository } from '../../../repositories/IRecipesRepository'
import { ICreateRecipeDTO } from './ICreateRecipeDTO'

export class CreateRecipeUseCase {
  constructor(private recipesRepository: IRecipesRepository) {}

  async execute(recipe: ICreateRecipeDTO) {
    await this.recipesRepository.createRecipe(new Recipe(recipe))
  }
}
