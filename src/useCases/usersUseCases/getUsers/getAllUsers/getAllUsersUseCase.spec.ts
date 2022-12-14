import { User } from '../../../../entities/User'
import { InMemoryUsersRepository } from '../../../../repositories/inMemory/inMemoryUsersRepository'
import { GetAllUsersUseCase } from './getAllUsersUseCase'

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
    })
  ]

  test('Create an instance', () => {
    const usersRepository = new InMemoryUsersRepository()
    const getAllUsersUseCase = new GetAllUsersUseCase(usersRepository)

    expect(getAllUsersUseCase).toBeInstanceOf(GetAllUsersUseCase)
    expect(getAllUsersUseCase).toHaveProperty('execute')
  })

  it('should be the array returned length equal to total number of users in database', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getAllUsersUseCase = new GetAllUsersUseCase(usersRepository)

    await Promise.all(
      newUsers.map(async user => {
        await usersRepository.createUser(user)
      })
    )

    const gettedUsers = await getAllUsersUseCase.execute()

    expect(gettedUsers.length).toEqual(newUsers.length)
  })

  test('if not users in database, then an empty array is returned', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getAllUsersUseCase = new GetAllUsersUseCase(usersRepository)

    await expect(getAllUsersUseCase.execute()).resolves.toEqual([])
  })
})
