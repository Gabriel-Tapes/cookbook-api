import { Request, Response } from 'express'
import { GetUsersByNameUseCase } from './getUsersByNameUseCase'

export class GetUsersByNameController {
  constructor(private getUsersByNameUseCase: GetUsersByNameUseCase) {}

  async handle(req: Request, res: Response) {
    const name = req.query.name.toString()

    try {
      const users = await this.getUsersByNameUseCase.execute(name)
      return res.status(200).json({
        users
      })
    } catch (err) {
      return res.status(400).json({
        error: err.message
      })
    }
  }
}
