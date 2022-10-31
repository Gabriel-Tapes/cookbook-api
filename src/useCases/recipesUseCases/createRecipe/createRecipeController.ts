import { Request, Response } from 'express'
import { CreateRecipeUseCase } from './createRecipeUseCase'

export class CreateRecipeController {
  constructor(private createRecipeUseCase: CreateRecipeUseCase) {}

  async handle(req: Request, res: Response) {
    const { title, ingredients, howToPrepare } = req.body

    try {
      await this.createRecipeUseCase.execute({
        title,
        ingredients,
        howToPrepare
      })
    } catch (err) {
      console.error(err)
      return res.status(400).json({
        error: err.message
      })
    }

    return res.status(201).json({
      message: 'Recipe create successful'
    })
  }
}
