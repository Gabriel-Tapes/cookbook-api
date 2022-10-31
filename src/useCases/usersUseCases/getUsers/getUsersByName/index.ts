import { PostgresUsersRepository } from '../../../../repositories/implementations/PostgresUsersRepository'
import { GetUsersByNameUseCase } from './getUsersByNameUseCase'
import { GetUsersByNameController } from './getUsersByNameController'

const usersRepository = new PostgresUsersRepository()
const getUsersByNameUseCase = new GetUsersByNameUseCase(usersRepository)
const getUsersByNameController = new GetUsersByNameController(
  getUsersByNameUseCase
)

export { getUsersByNameController }
