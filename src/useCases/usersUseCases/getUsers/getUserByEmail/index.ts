import { PostgresUsersRepository } from '../../../../repositories/implementations/PostgresUsersRepository'
import { FindUserByEmailController } from './getUserByEmailController'
import { FindUserByEmailUseCase } from './getUserByEmailUseCase'

const usersRepository = new PostgresUsersRepository()

const findUserByEmailUseCase = new FindUserByEmailUseCase(usersRepository)
const findUserByEmailController = new FindUserByEmailController(findUserByEmailUseCase)

export { findUserByEmailController }