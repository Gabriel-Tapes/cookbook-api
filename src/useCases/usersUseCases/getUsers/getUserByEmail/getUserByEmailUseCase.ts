import { IUserRepository } from '../../../../repositories/IUsersRepository'

export class GetUserByEmailUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(email: string) {
    return await this.usersRepository.getUserByEmail(email)
  }
}
