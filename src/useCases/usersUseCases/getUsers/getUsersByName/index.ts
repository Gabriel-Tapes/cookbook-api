import { PostgresUsersRepository } from '../../../../repositories/implementations/PostgresUsersRepository'
import { FindUsersByNameUseCase } from './getUsersByNameUseCase'
import { FindUsersByNameController } from './getUsersByNameController'


const usersRepository = new PostgresUsersRepository()
const findUsersByNameUseCase = new FindUsersByNameUseCase(usersRepository)
const findUsersByNameController = new FindUsersByNameController(findUsersByNameUseCase)

export { findUsersByNameController } 