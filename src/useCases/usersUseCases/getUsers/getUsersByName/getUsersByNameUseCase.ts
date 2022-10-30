import { IUserRepository } from '../../../../repositories/IUsersRepository'

export class FindUsersByNameUseCase {
   constructor (private usersRepository: IUserRepository) {}

   async execute (name: string) {
      return await this.usersRepository.getUsersByName(name)
   }
}