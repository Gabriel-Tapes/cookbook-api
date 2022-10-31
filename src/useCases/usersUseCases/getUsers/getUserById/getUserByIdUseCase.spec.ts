import { User } from '../../../../entities/User'
import { InMemoryUsersRepository } from '../../../../repositories/inMemory/inMemoryUsersRepository'
import { GetUserByIdUseCase } from './getUserByIdUseCase'

describe('Get user by id tests', () => {
  const newUsers = [
    new User({
      name: 'Joe Doe',
      email: 'joe.doe@email.com',
      password: 'pass',
      accessLevel: 'user'
    }),
    new User({
      name: 'Mark Zuckenberg',
      email: 'mark@meta.com',
      password: 'aliens1234',
      accessLevel: 'admin'
    }),
    new User({
      name: 'Donald the Duck',
      email: 'duck.donald@duckmail.com',
      password: 'qwaak',
      accessLevel: 'user'
    })
  ]

  test('Create an instance', () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(usersRepository)

    expect(getUserByIdUseCase).toBeInstanceOf(GetUserByIdUseCase)
    expect(getUserByIdUseCase).toHaveProperty('execute')
  })

  it('should returns an user with the id given when exists', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(usersRepository)

    await Promise.all(
      newUsers.map(async user => {
        await usersRepository.createUser(user)
      })
    )

    const firstUser = newUsers[0]

    const user = await getUserByIdUseCase.execute(firstUser.id)

    expect(user!.name).toEqual(firstUser.name)
    expect(user!.email).toEqual(firstUser.email)
    expect(user!.accessLevel).toEqual(firstUser.accessLevel)
  })

  it('should returns null if no user with the id given', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(usersRepository)

    await expect(getUserByIdUseCase.execute('AnInvalidId')).resolves.toBeNull()
  })
})
