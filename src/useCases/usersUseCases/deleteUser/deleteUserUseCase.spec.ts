import { User } from '../../../entities/User'
import { InMemoryUsersRepository } from '../../../repositories/inMemory/inMemoryUsersRepository'
import { DeleteUserUseCase } from './deleteUserUseCase'

describe('Delete User tests', () => {
   test('Create an instance', () => {
      const usersRepository = new  InMemoryUsersRepository()
      const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

      expect(deleteUserUseCase).toBeInstanceOf(DeleteUserUseCase)
      expect(deleteUserUseCase).toHaveProperty('execute')
   })

   it('Should not be able to delete an user with id not found in database', async () => {
      const usersRepository = new  InMemoryUsersRepository()
      const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

      await expect(async () => {
         return await deleteUserUseCase.execute('aInvalidId') 
      }).rejects.toThrow()
   })

   it('Should be able to delete an user with id found in database', async () => {
      const usersRepository = new  InMemoryUsersRepository()
      const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

      const user = new User({
         name: 'Joe Doe',
         email: 'joe.doe@email.com',
         password: 'pass',
         accessLevel: 'user'
      })
      await usersRepository.createUser(user)

      await expect(deleteUserUseCase.execute(user.id)).resolves.not.toThrow()

      await expect(usersRepository.getUserById(user.id)).resolves.toBe(null)
   })
})