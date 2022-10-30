import { Request, Response } from 'express'
import { FindUserByEmailUseCase } from './getUserByEmailUseCase'

export class FindUserByEmailController {
    
   constructor (private findUserByEmailUseCase: FindUserByEmailUseCase) {}

   async handle(req: Request, res: Response) {
      const email = req.query.email.toString() 

      try {
         const user = await this.findUserByEmailUseCase.execute(email)
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