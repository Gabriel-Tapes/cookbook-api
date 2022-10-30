import { InMemoryUsersRepository } from '../../../../repositories/inMemory/inMemoryUsersRepository'
import { GetAllUsersUseCase } from './getAllUsersUseCase'

describe('Get all users tests', () => {
  test('Create an instance', () => {
    const usersRepository = new InMemoryUsersRepository()
    const getAllUsersUseCase = new GetAllUsersUseCase(usersRepository)

    expect(getAllUsersUseCase).toBeInstanceOf(GetAllUsersUseCase)
    expect(getAllUsersUseCase).toHaveProperty('execute')
  })
})
