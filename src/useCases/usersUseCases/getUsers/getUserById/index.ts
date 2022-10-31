import { PostgresUsersRepository } from '../../../../repositories/implementations/PostgresUsersRepository'
import { GetUserByIdController } from './getUserByIdController'
import { GetUserByIdUseCase } from './getUserByIdUseCase'

const usersRepository = new PostgresUsersRepository()

const getUserByIdUseCase = new GetUserByIdUseCase(usersRepository)
const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

export { getUserByIdController }
