import { User } from '../../../../entities/User'
import { InMemoryUsersRepository } from '../../../../repositories/inMemory/inMemoryUsersRepository'
import { GetUserByEmailUseCase } from './getUserByEmailUseCase'

describe('Get user by email tests', () => {
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
    const getUserByEmailUseCase = new GetUserByEmailUseCase(usersRepository)

    expect(getUserByEmailUseCase).toBeInstanceOf(GetUserByEmailUseCase)
    expect(getUserByEmailUseCase).toHaveProperty('execute')
  })

  it('should returns an user with the email given when exists', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUserByEmailUseCase = new GetUserByEmailUseCase(usersRepository)

    await Promise.all(
      newUsers.map(async user => {
        await usersRepository.createUser(user)
      })
    )

    const user = await getUserByEmailUseCase.execute('duck.donald@duckmail.com')

    expect(user!.name).toEqual('Donald the Duck')
    expect(user!.accessLevel).toEqual('user')
  })

  it('should returns null if no user with the email given', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUserByEmailUseCase = new GetUserByEmailUseCase(usersRepository)

    await expect(
      getUserByEmailUseCase.execute('megaman@mega.com')
    ).resolves.toBeNull()
  })
})
