import { Request, Response } from 'express'
import { EditRecipeUseCase } from './editRecipeUseCase'

export class EditRecipeController {
  constructor(private editRecipeUseCase: EditRecipeUseCase) {}

  async handle(req: Request, res: Response) {
    const { id, title, ingredients, howToPrepare } = req.body

    try {
      const newRecipe = await this.editRecipeUseCase.execute(id, {
        title,
        ingredients,
        howToPrepare
      })

      return res.status(200).json({
        message: 'Recipe edited successful',
        newRecipe
      })
    } catch (err) {
      return res.status(400).json({
        error: err.message
      })
    }
  }
}
