import { Recipe } from '../../../../entities/Recipe'
import { InMemoryRecipesRepository } from '../../../../repositories/inMemory/inMemoryRecipesRepository'
import { GetRecipesByTitleUseCase } from './getRecipesByTitleUseCase'

describe('Get recipes by title tests', () => {
  const newRecipes = [
    new Recipe({
      title: 'pasta',
      ingredients: ['pasta', 'water', 'salt'],
      howToPrepare:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    }),
    new Recipe({
      title: 'pizza',
      ingredients: ['pizza dough', 'tomato sauce', 'cheese'],
      howToPrepare:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    }),
    new Recipe({
      title: 'omelet',
      ingredients: ['eggs', 'salt', 'milk', 'soy oil'],
      howToPrepare:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    }),
    new Recipe({
      title: 'pepperoni pizza',
      ingredients: ['pizza dough', 'tomato sauce', 'cheese', 'pepperoni'],
      howToPrepare:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    })
  ]

  test('Create an instance', () => {
    const recipesRepository = new InMemoryRecipesRepository()
    const getrecipesByTitleUseCase = new GetRecipesByTitleUseCase(
      recipesRepository
    )

    expect(getrecipesByTitleUseCase).toBeInstanceOf(GetRecipesByTitleUseCase)
    expect(getrecipesByTitleUseCase).toHaveProperty('execute')
  })

  it('should be the array returned length equal to total number of recipes with the given Title in database', async () => {
    const recipesRepository = new InMemoryRecipesRepository()
    const getRecipesByTitleUseCase = new GetRecipesByTitleUseCase(
      recipesRepository
    )

    await Promise.all(
      newRecipes.map(async recipe => {
        await recipesRepository.createRecipe(recipe)
      })
    )

    const gettedRecipes = await getRecipesByTitleUseCase.execute('pizza')

    expect(gettedRecipes.length).toEqual(2)
  })

  test('if not recipes with the Title given, then an empty array is returned', async () => {
    const recipesRepository = new InMemoryRecipesRepository()
    const getRecipesByTitleUseCase = new GetRecipesByTitleUseCase(
      recipesRepository
    )

    await expect(getRecipesByTitleUseCase.execute('Title')).resolves.toEqual([])
  })
})
