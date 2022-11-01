import { IRecipesRepository } from '../../../../repositories/IRecipesRepository'

export class GetRecipesByTitleUseCase {
  constructor(private recipesRepository: IRecipesRepository) {}

  async execute(title: string) {
    return await this.recipesRepository.getRecipesByTitle(title)
  }
}
