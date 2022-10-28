import { IUserRepository } from '../../../../repositories/IUsersRepository'

export class GetAllUsersUseCase {
   constructor (private usersRepository: IUserRepository) {}

   async execute() {
      const allUsers = await this.usersRepository.getAllUsers()

      return allUsers
   }
}