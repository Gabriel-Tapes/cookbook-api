import { Request, Response } from 'express'
import { CreateUserUseCase } from './createUserUseCase'

export class CreateUserController {
   constructor (private createUserUseCase: CreateUserUseCase){}

   async handle (req: Request, res: Response) {
      const { name, email, password, accessLevel } = req.body

      try {
         await this.createUserUseCase.execute({name, email, password, accessLevel})
      } catch (err) {
         console.error(err)
         return res.status(400).json({
            error: err.message
         })
      }

      return res.status(201).json({
         message: 'User create successful'
      })
   }
}