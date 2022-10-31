import { InMemoryUsersRepository } from '../../../repositories/inMemory/inMemoryUsersRepository'
import { EditUserUseCase } from './editUserUseCase'
import { User } from '../../../entities/User'

describe('Edit User tests', () => {
  const user = new User({
    name: 'Joe Doe',
    email: 'joe.doe@email.com',
    password: 'pass',
    accessLevel: 'user'
  })

  test('create an instance', () => {
    const usersRepository = new InMemoryUsersRepository()
    const editUserUseCase = new EditUserUseCase(usersRepository)

    expect(editUserUseCase).toBeInstanceOf(EditUserUseCase)
    expect(editUserUseCase).toHaveProperty('execute')
  })

  test('if no params is given to edit user, then the user will still exact the same', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const editUserUseCase = new EditUserUseCase(usersRepository)

    await usersRepository.createUser(user)

    await editUserUseCase.execute(user.id, {})

    const gettedUser = await usersRepository.getUserById(user.id)

    expect(gettedUser!.name).toEqual(user.name)
    expect(gettedUser!.password).toEqual(user.password)
    expect(gettedUser!.accessLevel).toEqual(user.accessLevel)
  })

  test('if params is given to edit user, then the user will be edited with the new props', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const editUserUseCase = new EditUserUseCase(usersRepository)

    await usersRepository.createUser(user)

    await editUserUseCase.execute(user.id, {
      name: 'Joe',
      password: 'qwerty123',
      accessLevel: 'admin'
    })

    const editedUser = await usersRepository.getUserById(user.id)
    console.log(editedUser!.password)
    expect([
      editedUser!.name,
      editedUser!.password,
      editedUser!.accessLevel
    ]).toEqual(['Joe', 'qwerty123', 'admin'])
  })

  it('should be able to edit an user without some params', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const editUserUseCase = new EditUserUseCase(usersRepository)

    await usersRepository.createUser(user)

    await expect(
      editUserUseCase.execute(user.id, {
        name: 'Joe'
      })
    ).resolves.not.toThrow()

    await expect(
      editUserUseCase.execute(user.id, {
        accessLevel: 'admin'
      })
    ).resolves.not.toThrow()

    await expect(
      editUserUseCase.execute(user.id, {
        password: '123456'
      })
    ).resolves.not.toThrow()
  })

  it('should not be able to edit an user with id not found in database', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const editUserUseCase = new EditUserUseCase(usersRepository)

    await expect(editUserUseCase.execute('an_invalid_id', {})).rejects.toThrow()
  })
})
