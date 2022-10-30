import { Request, Response } from 'express'
import { FindUserByIdUseCase } from './getUserByIdUseCase'

export class FindUserByIdController {
    
   constructor (private findUserByIdUseCase: FindUserByIdUseCase) {}

   async handle(req: Request, res: Response) {
      const { id } = req.params

      try {
         const user = await this.findUserByIdUseCase.execute(id)
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