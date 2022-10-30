import { Request, Response } from 'express'
import { GetAllUsersUseCase } from './getAllUsersUseCase'

export class GetAllUsersController {
  constructor(private getAllUsersUseCase: GetAllUsersUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const allUsers = await this.getAllUsersUseCase.execute()

      res.status(200).json({
        users: allUsers
      })
    } catch (err) {
      res.status(500).json({
        error: err
      })
    }
  }
}
