import { Request, Response } from 'express'
import { GetUserByIdUseCase } from './getUserByIdUseCase'

export class GetUserByIdController {
  constructor(private getUserByIdUseCase: GetUserByIdUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const user = await this.getUserByIdUseCase.execute(id)
      return res.status(200).json({
        name: user.name,
        email: user.email,
        accessLevel: user.accessLevel
      })
    } catch (err) {
      return res.status(404).json({
        error: err.message
      })
    }
  }
}
