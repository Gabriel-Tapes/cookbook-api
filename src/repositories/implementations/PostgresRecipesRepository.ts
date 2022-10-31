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

  async createRecipe(recipe: Recipe): Promise<void> {
    await this.client.query(
      'INSERT INTO RECIPES (ID, TITLE, INGREDIENTS, HOWTOPREPARE) VALUES ($1, $2, $3, $4)',
      [recipe.id, recipe.title, recipe.ingredients, recipe.howToPrepare]
    )
  }
}
