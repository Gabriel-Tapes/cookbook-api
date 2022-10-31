import { InMemoryUsersRepository } from '../../../repositories/inMemory/inMemoryUsersRepository'
import { CreateUserUseCase } from './createUserUseCase'

describe('Create User Use Case tests', () => {
  test('Create an instance', () => {
    const usersReposiroty = new InMemoryUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersReposiroty)

    expect(createUserUseCase).toBeInstanceOf(CreateUserUseCase)
    expect(createUserUseCase).toHaveProperty('execute')
  })

  test('Create an user', async () => {
    const usersReposiroty = new InMemoryUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersReposiroty)

    await createUserUseCase.execute({
      name: 'Joe Doe',
      email: 'joe.doe@email.com',
      password: 'pass',
      accessLevel: 'user'
    })

    const user = await usersReposiroty.getUserByEmail('joe.doe@email.com')

    expect(user!.name).toEqual('Joe Doe')
    expect(user!.accessLevel).toEqual('user')
  })

  it('Should not be able to create two users with the same email', async () => {
    const usersReposiroty = new InMemoryUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersReposiroty)

    await createUserUseCase.execute({
      name: 'Joe Doe',
      email: 'joe.doe@email.com',
      password: 'pass',
      accessLevel: 'user'
    })

    await expect(async () => {
      await createUserUseCase.execute({
        name: 'Joe',
        email: 'joe.doe@email.com',
        password: 'qwerty123',
        accessLevel: 'admin'
      })
    }).rejects.toThrow()
  })

  it('Should not be able to create an user without all data', async () => {
    const usersReposiroty = new InMemoryUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersReposiroty)

    await expect(async () => {
      await createUserUseCase.execute({
        name: '',
        email: 'joe.doe@gmail.com',
        password: 'pass',
        accessLevel: 'user'
      })
    }).rejects.toThrow()

    await expect(async () => {
      await createUserUseCase.execute({
        name: 'Joe Doe',
        email: '',
        password: 'pass',
        accessLevel: 'user'
      })
    }).rejects.toThrow()

    await expect(async () => {
      await createUserUseCase.execute({
        name: 'Joe Doe',
        email: 'joe.doe@gmail.com',
        password: '',
        accessLevel: 'user'
      })
    }).rejects.toThrow()
  })
})
