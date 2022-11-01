import { PostgresRecipesRepository } from '../../../../repositories/implementations/PostgresRecipesRepository'
import { GetRecipeByIdUseCase } from './getRecipeByIdUseCase'
import { GetRecipeByIdController } from './getRecipeByIdController'

const recipesRepository = new PostgresRecipesRepository()
const getRecipeByIdUseCase = new GetRecipeByIdUseCase(recipesRepository)
const getRecipeByIdController = new GetRecipeByIdController(
  getRecipeByIdUseCase
)

export { getRecipeByIdController }
