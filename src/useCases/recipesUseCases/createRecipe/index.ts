import { PostgresRecipesRepository } from '../../../repositories/implementations/PostgresRecipesRepository'
import { CreateRecipeUseCase } from './createRecipeUseCase'
import { CreateRecipeController } from './createRecipeController'

const recipesRepository = new PostgresRecipesRepository()
const createRecipeUseCase = new CreateRecipeUseCase(recipesRepository)
const createRecipeController = new CreateRecipeController(createRecipeUseCase)

export { createRecipeController }
