import { v4 as uuidv4 } from 'uuid'

export interface RecipeProps {
  readonly id: string
  title: string
  ingredients: string[]
  howToPrepare: string
}

export class Recipe {
  private props: RecipeProps

  get id() {
    return this.props.id
  }

  set title(title: string) {
    if (!title)
      throw new Error('Recipe title error, cannot set a empty value for title')

    this.props.title = title
  }

  get title() {
    return this.props.title
  }

  set ingredients(ingredients: string[]) {
    if (!ingredients.length)
      throw new Error(
        'Recipe ingredients error, cannot set a empty list for ingredients'
      )

    ingredients.map(ingredient => {
      if (!ingredient)
        throw new Error(
          'Recipe ingredients ingredient error, cannot set a empty value for an ingredient'
        )
    })

    this.props.ingredients = ingredients
  }

  get ingredients() {
    return this.props.ingredients
  }

  set howToPrepare(howToPrepare: string) {
    if (!howToPrepare)
      throw new Error(
        'Recipe hoToPrepare error, cannot set a empty value for howToPrepare'
      )

    this.howToPrepare = howToPrepare
  }

  get howToPrepare() {
    return this.props.howToPrepare
  }

  constructor(
    { title, ingredients, howToPrepare }: Omit<RecipeProps, 'id'>,
    id?: string
  ) {
    if (!(title && ingredients.length && howToPrepare))
      throw new Error(
        'Recipe props error, cannot create a recipe with empty values to title, ingredients or howToPrepare'
      )

    ingredients.map(ingredient => {
      if (!ingredient)
        throw new Error(
          'Recipe ingredient error, cannot set empty ingredients values to create a new recipe'
        )
    })

    this.props = {
      id: id || uuidv4(),
      title,
      ingredients,
      howToPrepare
    }
  }
}
