import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository'
import { CreateUserController } from './createUserController'
import { CreateUserUseCase } from './createUserUseCase'

const usersRepository = new PostgresUsersRepository()

const createUserUseCase = new CreateUserUseCase(usersRepository)
const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }
