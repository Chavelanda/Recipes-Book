export const fetchRecipesByName = async (name) => {
  const apiKey = '3f192b0d09a442ae83d449f52676a042'
  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${name}&instructionRequired=true&addRecipeInformation=true&fillIngredients=true&number=10`)
  const {results} = await response.json()
  const recipes = results.map(mapResultToRecipe)
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
