import { IRecipesRepository } from '../../../repositories/IRecipesRepository'
import { IEditRecipeDTO } from './IEditRecipeDTO'

export class EditRecipeUseCase {
  constructor(private recipesRepository: IRecipesRepository) {}

  async execute(
    id: string,
    { title, ingredients, howToPrepare }: IEditRecipeDTO
  ) {
    const recipeExists = await this.recipesRepository.getRecipeById(id)

    if (!recipeExists) throw new Error('Recipe not found')

    return await this.recipesRepository.editRecipe(id, {
      title,
      ingredients,
      howToPrepare
    })
  }
}
