import { Request, Response } from 'express'
import { GetRecipesByTitleUseCase } from './getRecipesByTitleUseCase'

export class GetRecipesByTitleController {
  constructor(private getRecipesByTitleUseCase: GetRecipesByTitleUseCase) {}

  async handle(req: Request, res: Response) {
    const title = req.query.title.toString()

    try {
      const recipes = await this.getRecipesByTitleUseCase.execute(title)

      return res.status(200).json({
        recipes
      })
    } catch (err) {
      return res.status(400).json({
        error: err.message
      })
    }
  }
}
