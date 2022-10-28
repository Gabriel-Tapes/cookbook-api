import { IUserRepository } from '../../../repositories/IUsersRepository'
import { IEditUserDTO } from './editUserDTO'

export class EditUserUseCase {
   constructor (private usersRepository: IUserRepository) {}

   async execute (id: string, {
      name,
      password,
      accessLevel
   }: IEditUserDTO) {
      const userExists = await this.usersRepository.getUserById(id)

      if (!userExists)
         throw new Error('User not Exists')

      await this.usersRepository.editUser(id, {
         name,
         password,
         accessLevel
      })
   }
}