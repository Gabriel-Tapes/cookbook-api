import { v4 as uuidv4 } from 'uuid'

export interface RecipeProps {
    readonly id: string
    name: string
    ingredients: string[]
    howToPrepare: string
}

export class Recipe {
   private props: RecipeProps

   get id () {
      return this.props.id
   }

   set name (name: string) {
      if(!name)
         throw new Error('Recipe name error, cannot set a empty value for name')

      this.props.name = name
   }

   get name () {
      return this.props.name
   }

   set ingredients (ingredients: string[]) {
      if(!ingredients.length)
         throw new Error('Recipe ingredients error, cannot set a empty list for ingredients')

      ingredients.map(ingredient => {
         if(!ingredient)
            throw new Error('Recipe ingredients ingredient error, cannot set a empty value for an ingredient')
      })

      this.props.ingredients = ingredients
   }

   get ingredients () {
      return this.props.ingredients
   }

   set howToPrepare (howToPrepare: string) {
      if(!howToPrepare)
         throw new Error('Recipe hoToPrepare error, cannot set a empty value for howToPrepare')

      this.howToPrepare = howToPrepare
   }

   get howToPrepare () {
      return this.props.howToPrepare
   }

   constructor ({
      name,
      ingredients,
      howToPrepare
   }: Omit<RecipeProps, 'id'>, id?: string) {
      if (!(name && ingredients.length && howToPrepare))
         throw new Error('Recipe props error, cannot create a recipe with empty values to name, ingredients or howToPrepare')

      ingredients.map(ingredient => {
         if (!ingredient) 
            throw new Error('Recipe ingredient error, cannot set empty ingredients values to create a new recipe')
      })

      this.props = {
         id: id || uuidv4(),
         name,
         ingredients,
         howToPrepare
      }
   }
}