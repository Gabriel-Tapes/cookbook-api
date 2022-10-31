import { Request, Response } from 'express'
import { EditUserUseCase } from './editUserUseCase'

export class EditUserController {
  constructor(private editUserUseCase: EditUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { id, name, password, accessLevel } = req.body

    try {
      await this.editUserUseCase.execute(id, {
        name,
        password,
        accessLevel
      })
    } catch (err) {
      console.error(err)
      return res.status(400).json({
        error: err.message
      })
    }
    return res.status(200).json({
      message: 'User edited sucessful'
    })
  }
}
