import { Recipe } from '../../../../entities/Recipe'
import { InMemoryRecipesRepository } from '../../../../repositories/inMemory/inMemoryRecipesRepository'
import { GetRecipeByIdUseCase } from './getRecipeByIdUseCase'

describe('Get Recipe by id tests', () => {
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
    })
  ]

  test('Create an instance', () => {
    const RecipesRepository = new InMemoryRecipesRepository()
    const getRecipeByIdUseCase = new GetRecipeByIdUseCase(RecipesRepository)

    expect(getRecipeByIdUseCase).toBeInstanceOf(GetRecipeByIdUseCase)
    expect(getRecipeByIdUseCase).toHaveProperty('execute')
  })

  it('should returns an Recipe with the id given when exists', async () => {
    const RecipesRepository = new InMemoryRecipesRepository()
    const getRecipeByIdUseCase = new GetRecipeByIdUseCase(RecipesRepository)

    await Promise.all(
      newRecipes.map(async Recipe => {
        await RecipesRepository.createRecipe(Recipe)
      })
    )

    const firstRecipe = newRecipes[0]

    const Recipe = await getRecipeByIdUseCase.execute(firstRecipe.id)

    expect(Recipe!.title).toEqual(firstRecipe.title)
    expect(Recipe!.ingredients).toEqual(firstRecipe.ingredients)
    expect(Recipe!.howToPrepare).toEqual(firstRecipe.howToPrepare)
  })

  it('should returns null if no Recipe with the id given', async () => {
    const RecipesRepository = new InMemoryRecipesRepository()
    const getRecipeByIdUseCase = new GetRecipeByIdUseCase(RecipesRepository)

    await expect(
      getRecipeByIdUseCase.execute('AnInvalidId')
    ).resolves.toBeNull()
  })
})
