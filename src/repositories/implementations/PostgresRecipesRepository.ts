import { Pool } from 'pg'
import { createDatabaseConnection } from '../../database/connectDatabase'
import { Recipe } from '../../entities/Recipe'
import { IRecipesRepository } from '../IRecipesRepository'

export class PostgresRecipesRepository implements IRecipesRepository {
  private client: Pool

  constructor() {
    createDatabaseConnection()
      .then(connection => (this.client = connection))
      .catch(err => console.error(err))
  }

  async getRecipeById(id: string): Promise<Recipe> {
    const { rows } = await this.client.query(
      'SELECT * FROM RECIPES WHERE ID = $1',
      [id]
    )

    if (!rows.length) return null

    const { title, ingredients, howtoprepare } = rows[0]

    return new Recipe({ title, ingredients, howToPrepare: howtoprepare }, id)
  }

  async getRecipesByTitle(title: string): Promise<Recipe[]> {
    const { rows } = await this.client.query(
      'SELECT * FROM RECIPES WHERE TITLE LIKE $1',
      [`%${title}%`]
    )

    if (!rows.length) return []

    const recipes = rows.map(recipe => {
      return new Recipe(
        {
          title: recipe.title,
          ingredients: recipe.ingredients,
          howToPrepare: recipe.howtoprepare
        },
        recipe.id
      )
    })

    return recipes
  }

  async createRecipe(recipe: Recipe): Promise<void> {
    await this.client.query(
      'INSERT INTO RECIPES (ID, TITLE, INGREDIENTS, HOWTOPREPARE) VALUES ($1, $2, $3, $4)',
      [recipe.id, recipe.title, recipe.ingredients, recipe.howToPrepare]
    )
  }
}
