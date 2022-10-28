import { IUserRepository } from '../../../../repositories/IUsersRepository'

export class FindUserByEmailUseCase {
   constructor (private usersRepository: IUserRepository) {}

   async execute (email: string) {
      const user = await this.usersRepository.getUserByEmail(email)
      if (!user)
         throw new Error ('User not found')
      return user
   }
}