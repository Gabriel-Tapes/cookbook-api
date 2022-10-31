import { User } from '../../../../entities/User'
import { InMemoryUsersRepository } from '../../../../repositories/inMemory/inMemoryUsersRepository'
import { GetUsersByNameUseCase } from './getUsersByNameUseCase'

describe('Get all users tests', () => {
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
    }),
    new User({
      name: 'scrooge mcDuck',
      email: 'scrooge.mc_duck@duckmail.com',
      password: 'qwaak',
      accessLevel: 'admin'
    })
  ]

  test('Create an instance', () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUsersByNameUseCase = new GetUsersByNameUseCase(usersRepository)

    expect(getUsersByNameUseCase).toBeInstanceOf(GetUsersByNameUseCase)
    expect(getUsersByNameUseCase).toHaveProperty('execute')
  })

  it('should be the array returned length equal to total number of users with the given name in database', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUsersByNameUseCase = new GetUsersByNameUseCase(usersRepository)

    await Promise.all(
      newUsers.map(async user => {
        await usersRepository.createUser(user)
      })
    )

    const gettedUsers = await getUsersByNameUseCase.execute('Duck')

    expect(gettedUsers.length).toEqual(2)
  })

  test('if not users with the name given, then an empty array is returned', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUsersByNameUseCase = new GetUsersByNameUseCase(usersRepository)

    await expect(getUsersByNameUseCase.execute('name')).resolves.toEqual([])
  })
})
