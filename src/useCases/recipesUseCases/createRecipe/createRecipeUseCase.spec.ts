import { InMemoryRecipesRepository } from '../../../repositories/inMemory/inMemoryRecipesRepository'
import { CreateRecipeUseCase } from './createRecipeUseCase'

describe('create recipe use case tests', () => {
  test('create an instance', () => {
    const recipesRepository = new InMemoryRecipesRepository()
    const createRecipeUseCase = new CreateRecipeUseCase(recipesRepository)

    expect(createRecipeUseCase).toBeInstanceOf(CreateRecipeUseCase)
    expect(createRecipeUseCase).toHaveProperty('execute')
  })

  it('shoult be able to create an recipe', async () => {
    const recipesRepository = new InMemoryRecipesRepository()
    const createRecipeUseCase = new CreateRecipeUseCase(recipesRepository)

    await expect(
      createRecipeUseCase.execute({
        title: 'pasta',
        ingredients: ['pasta', 'water', 'salt'],
        howToPrepare:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      })
    ).resolves.not.toThrow()
  })

  it('should not be able to create an recipe without any property empty', async () => {
    const recipesRepository = new InMemoryRecipesRepository()
    const createRecipeUseCase = new CreateRecipeUseCase(recipesRepository)

    await expect(
      createRecipeUseCase.execute({
        title: 'pasta',
        ingredients: ['pasta', 'water', 'salt'],
        howToPrepare: ''
      })
    ).rejects.toThrow()

    await expect(
      createRecipeUseCase.execute({
        title: 'pasta',
        ingredients: [],
        howToPrepare:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      })
    ).rejects.toThrow()

    await expect(
      createRecipeUseCase.execute({
        title: '',
        ingredients: ['pasta', 'water', 'salt'],
        howToPrepare:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      })
    ).rejects.toThrow()
  })
})
