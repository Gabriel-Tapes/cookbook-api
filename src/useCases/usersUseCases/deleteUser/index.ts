import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository'
import { DeleteUserUseCase } from './deleteUserUseCase'
import { DeleteUserController } from './deleteUserController'

const postgresUserRepository = new PostgresUsersRepository()
const deleteUserUseCase = new DeleteUserUseCase(postgresUserRepository)
const deleteUserController = new DeleteUserController(deleteUserUseCase)

export { deleteUserController }