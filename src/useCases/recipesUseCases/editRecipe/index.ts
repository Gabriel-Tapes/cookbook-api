import { PostgresRecipesRepository } from '../../../repositories/implementations/PostgresRecipesRepository'
import { EditRecipeUseCase } from './editRecipeUseCase'
import { EditRecipeController } from './editRecipeController'

const recipesRepository = new PostgresRecipesRepository()
const editRecipeUseCase = new EditRecipeUseCase(recipesRepository)
const editRecipeController = new EditRecipeController(editRecipeUseCase)

export { editRecipeController }
