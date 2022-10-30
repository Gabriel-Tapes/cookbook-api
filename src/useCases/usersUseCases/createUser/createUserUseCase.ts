import { IUserRepository } from '../../../repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './ICreateUserRequestDTO'
import { User } from '../../../entities/User'

export class CreateUserUseCase {
   constructor(private usersRepository: IUserRepository) {}

   async execute ({name, email, password, accessLevel}: ICreateUserRequestDTO) {
      const userAlreadyExists = await this.usersRepository.getUserByEmail(email)
      
      if (userAlreadyExists) {
         throw new Error('User already exists.')
      }
      const user = new User({name, email, password, accessLevel})

      await this.usersRepository.createUser(user)
   }
}