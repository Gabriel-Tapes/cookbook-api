import { Recipe } from './Recipe'

describe('Recipe tests', () => {
   test('Create a recipe', () => {
      const recipe = new Recipe({
         name: 'pasta',
         ingredients: [
            'pasta',
            'water',
            'salt'
         ],
         howToPrepare: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      })

      expect(recipe).toBeInstanceOf(Recipe)
      expect(recipe.name).toEqual('pasta')
   })

   it('Should not be possible create a recipe with any fields empty', () => {
      expect(() => {
         return new Recipe({
            name: '',
            ingredients: [
               'pasta',
               'water',
               'salt'
            ],
            howToPrepare: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
         })
      }).toThrow()

      expect(() => {
         return new Recipe({
            name: 'pasta',
            ingredients: [],
            howToPrepare: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
         })
      }).toThrow()

      expect(() => {
         return new Recipe({
            name: 'pasta',
            ingredients: [
               'pasta',
               'water',
               'salt'
            ],
            howToPrepare: ''
         })
      }).toThrow()
   })

   it('Shold not be able to create a recipe with an empty ingredient value', () => {
      expect(() => {
         return new Recipe({
            name: 'pasta',
            ingredients: [
               'pasta',
               'water',
               'salt',
               ''
            ],
            howToPrepare: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
         })
      }).toThrow()
   })

   it('Shold not be able to set empty values to name and howToPrepare', () => {
      const recipe = new Recipe({
         name: 'pasta',
         ingredients: [
            'pasta',
            'water',
            'salt'
         ],
         howToPrepare: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      })

      expect(() => {
         recipe.name = ''
      }).toThrow()

      expect(() => {
         recipe.howToPrepare = ''
      }).toThrow()
   })

   it('Should not be able to set a empty list of ingredients', () => {
      const recipe = new Recipe({
         name: 'pasta',
         ingredients: [
            'pasta',
            'water',
            'salt'
         ],
         howToPrepare: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      })

      expect(() => {
         recipe.ingredients = []
      }).toThrow()
   })

   it('Should not be able to set an empty ingredient to recipe ingredients', () => {
      const recipe = new Recipe({
         name: 'pasta',
         ingredients: [
            'pasta',
            'water',
            'salt'
         ],
         howToPrepare: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      })

      expect(() => {
         recipe.ingredients = [
            'pasta',
            'water',
            'salt',
            ''
         ]
      }).toThrow()
   })
})