import { IUserRepository } from '../../../../repositories/IUsersRepository'

export class FindUserByIdUseCase {
   constructor (private usersRepository: IUserRepository) {}

   async execute (id: string) {
      const user = await this.usersRepository.getUserById(id)
      if (!user)
         throw new Error ('User not found')
      return user
   }
}