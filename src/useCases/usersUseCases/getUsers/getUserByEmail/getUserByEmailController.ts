import { Request, Response } from 'express'
import { GetUserByEmailUseCase } from './getUserByEmailUseCase'

export class GetUserByEmailController {
  constructor(private getUserByEmailUseCase: GetUserByEmailUseCase) {}

  async handle(req: Request, res: Response) {
    const email = req.query.email.toString()

    try {
      const user = await this.getUserByEmailUseCase.execute(email)
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
