import { Request, Response } from 'express'
import { GetRecipeByIdUseCase } from './getRecipeByIdUseCase'

export class GetRecipeByIdController {
  constructor(private getRecipeByIdUseCase: GetRecipeByIdUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const recipe = await this.getRecipeByIdUseCase.execute(id)

      return res.status(200).json({
        recipe: {
          title: recipe.title,
          ingredients: recipe.ingredients,
          howToPrepare: recipe.howToPrepare
        }
      })
    } catch (err) {
      return res.status(400).json({
        error: err.message
      })
    }
  }
}
