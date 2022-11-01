import { IRecipesRepository } from '../../../../repositories/IRecipesRepository'

export class GetRecipeByIdUseCase {
  constructor(private recipesRepository: IRecipesRepository) {}

  async execute(id: string) {
    return await this.recipesRepository.getRecipeById(id)
  }
}
