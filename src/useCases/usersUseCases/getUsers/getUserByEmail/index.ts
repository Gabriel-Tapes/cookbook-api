import { PostgresUsersRepository } from '../../../../repositories/implementations/PostgresUsersRepository'
import { GetUserByEmailController } from './getUserByEmailController'
import { GetUserByEmailUseCase } from './getUserByEmailUseCase'

const usersRepository = new PostgresUsersRepository()

const getUserByEmailUseCase = new GetUserByEmailUseCase(usersRepository)
const getUserByEmailController = new GetUserByEmailController(
  getUserByEmailUseCase
)

export { getUserByEmailController }
