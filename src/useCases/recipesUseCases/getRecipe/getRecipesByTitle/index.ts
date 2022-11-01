import { PostgresRecipesRepository } from '../../../../repositories/implementations/PostgresRecipesRepository'
import { GetRecipesByTitleUseCase } from './getRecipesByTitleUseCase'
import { GetRecipesByTitleController } from './getRecipesByTitleController'

const recipesRepository = new PostgresRecipesRepository()
const getRecipesByTitleUseCase = new GetRecipesByTitleUseCase(recipesRepository)
const getRecipesByTitleController = new GetRecipesByTitleController(
  getRecipesByTitleUseCase
)

export { getRecipesByTitleController }
