import { Request, Response } from 'express'
import { DeleteUserUseCase } from './deleteUserUseCase'

export class DeleteUserController {
   constructor (private deleteUserUseCase: DeleteUserUseCase) {}

   async handle (req: Request, res: Response) {
      const { id } = req.body

      try {
         await this.deleteUserUseCase.execute(id)

         res.status(200).json({ message: 'User deleted successful' })
      } catch (err) {
         res.status(500).json({ error: err.message })
      }
   }
}