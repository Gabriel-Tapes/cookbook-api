import { Request, Response } from 'express'
import { FindUsersByNameUseCase } from './getUsersByNameUseCase'

export class FindUsersByNameController {
    
   constructor (private findUsersByNameUseCase: FindUsersByNameUseCase) {}

   async handle(req: Request, res: Response) {
      const name = req.query.name.toString()

      try {
         const users = await this.findUsersByNameUseCase.execute(name)
         return res.status(200).json({
            users: users
         })
      } catch (err) {
         return res.status(400).json({
            error: err.message
         })
      }
   }
}