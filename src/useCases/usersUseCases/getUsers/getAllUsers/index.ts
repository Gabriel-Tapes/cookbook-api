import { PostgresUsersRepository } from '../../../../repositories/implementations/PostgresUsersRepository'
import { GetAllUsersUseCase } from './getAllUsersUseCase'
import { GetAllUsersController } from './getAllUsersController'

const usersRepository = new PostgresUsersRepository()
const getAllUsersUseCase = new GetAllUsersUseCase(usersRepository)
const getAllUsersController = new GetAllUsersController(getAllUsersUseCase)

export { getAllUsersController }