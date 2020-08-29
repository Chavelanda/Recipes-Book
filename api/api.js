const apiKey = '3f192b0d09a442ae83d449f52676a042'
const resultsReturned = 2

export const fetchRecipesByName = async (name) => {
  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${name}&instructionRequired=true&addRecipeInformation=true&fillIngredients=true&number=${resultsReturned}`)
  const {results} = await response.json()
  const recipes = results.map(mapResultToRecipe)
  return recipes
}

export const fetchRecipesByIngredients = async (ingredients, ranking) => {
  const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&ranking=${ranking}&number=${resultsReturned}`)
  const results = await response.json()
  const recipes = await Promise.all(results.map(mapIdToRecipe))
  return recipes
}


const mapResultToRecipe = (result) => {
  return {
    id: result.id,
    created: false,
    title: result.title,
    servings: result.servings.toString(),
    image: {uri: result.image},
    time: result.readyInMinutes.toString(),
    ingredients: result.extendedIngredients.map(mapIngredients),
    steps: result.analyzedInstructions.length > 0 ? result.analyzedInstructions[0].steps.map(mapInstructionToSteps) : [{id: 0, description: 'Unfortunately there are no instructions for this recipe'}]
   }
}

const mapIngredients = (ingredient) => {
  return {
    amount: ingredient.amount.toString(),
    id: ingredient.id,
    ingredient: ingredient.originalName,
    unit: ingredient.unit,
  }
}

const mapInstructionToSteps = (instruction) => {
  return {
    id: instruction.number - 1,
    description: instruction.step
  }
}

const mapIdToRecipe = async (recipe) => {
  const response = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`)
  const recipeInfo = await response.json()
  return mapResultToRecipe(recipeInfo)
}
