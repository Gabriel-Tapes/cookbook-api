import { IUserRepository } from '../../../repositories/IUsersRepository'

export class DeleteUserUseCase {
   constructor (private usersRepository: IUserRepository) {}

   async execute (id: string) {
      const userExists = await this.usersRepository.getUserById(id)

      if (!userExists)
         throw new Error('User not exists')

      await this.usersRepository.deleteUser(id)
   }
}