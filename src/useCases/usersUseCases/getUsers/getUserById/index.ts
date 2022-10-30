import { PostgresUsersRepository } from '../../../../repositories/implementations/PostgresUsersRepository'
import { FindUserByIdController } from './getUserByIdController'
import { FindUserByIdUseCase } from './getUserByIdUseCase'

const usersRepository = new PostgresUsersRepository()

const findUserByIdUseCase = new FindUserByIdUseCase(usersRepository)
const findUserByIdController = new FindUserByIdController(findUserByIdUseCase)

export { findUserByIdController }