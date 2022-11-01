import { InMemoryRecipesRepository } from '../../../repositories/inMemory/inMemoryRecipesRepository'
import { EditRecipeUseCase } from './editRecipeUseCase'
import { Recipe } from '../../../entities/Recipe'

describe('Edit Recipe tests', () => {
  const recipe = new Recipe({
    title: 'pasta',
    ingredients: ['pasta', 'water', 'salt'],
    howToPrepare: 'lorem ipsum'
  })

  test('create an instance', () => {
    const recipesRepository = new InMemoryRecipesRepository()
    const editRecipeUseCase = new EditRecipeUseCase(recipesRepository)

    expect(editRecipeUseCase).toBeInstanceOf(EditRecipeUseCase)
    expect(editRecipeUseCase).toHaveProperty('execute')
  })

  test('if no params is given to edit recipe, then the recipe will still exact the same', async () => {
    const recipesRepository = new InMemoryRecipesRepository()
    const editRecipeUseCase = new EditRecipeUseCase(recipesRepository)

    await recipesRepository.createRecipe(recipe)

    await editRecipeUseCase.execute(recipe.id, {})

    const gettedRecipe = await recipesRepository.getRecipeById(recipe.id)

    expect(gettedRecipe!.title).toEqual(recipe.title)
    expect(gettedRecipe!.ingredients).toEqual(recipe.ingredients)
    expect(gettedRecipe!.howToPrepare).toEqual(recipe.howToPrepare)
  })

  test('if params is given to edit recipe, then the recipe will be edited with the new props', async () => {
    const recipesRepository = new InMemoryRecipesRepository()
    const editRecipeUseCase = new EditRecipeUseCase(recipesRepository)

    await recipesRepository.createRecipe(recipe)

    await editRecipeUseCase.execute(recipe.id, {
      title: 'pizza',
      ingredients: ['pizza dough', 'tomato sauce', 'cheese'],
      howToPrepare:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    })

    const editedRecipe = await recipesRepository.getRecipeById(recipe.id)
    expect([
      editedRecipe!.title,
      editedRecipe!.ingredients,
      editedRecipe!.howToPrepare
    ]).toEqual([
      'pizza',
      ['pizza dough', 'tomato sauce', 'cheese'],
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    ])
  })

  it('should be able to edit an recipe without some params', async () => {
    const recipesRepository = new InMemoryRecipesRepository()
    const editRecipeUseCase = new EditRecipeUseCase(recipesRepository)

    await recipesRepository.createRecipe(recipe)

    await expect(
      editRecipeUseCase.execute(recipe.id, {
        title: 'pizza'
      })
    ).resolves.not.toThrow()

    await expect(
      editRecipeUseCase.execute(recipe.id, {
        howToPrepare:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      })
    ).resolves.not.toThrow()

    await expect(
      editRecipeUseCase.execute(recipe.id, {
        ingredients: ['pizza dough', 'tomato sauce', 'cheese']
      })
    ).resolves.not.toThrow()
  })

  it('should not be able to edit an recipe with id not found in database', async () => {
    const recipesRepository = new InMemoryRecipesRepository()
    const editRecipeUseCase = new EditRecipeUseCase(recipesRepository)

    await expect(
      editRecipeUseCase.execute('an_invalid_id', {})
    ).rejects.toThrow()
  })
})
