import { IUserRepository } from '../../../../repositories/IUsersRepository'

export class GetUserByIdUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.getUserById(id)
    return user
  }
}
