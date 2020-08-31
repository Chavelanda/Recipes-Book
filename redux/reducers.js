import {combineReducers} from 'redux'

import {ADD_NEW_RECIPE, DELETE_RECIPE, CHANGE_THEME_COLOR, ADD_INTOLERANCE, REMOVE_INTOLERANCE, ADD_INGREDIENT, REMOVE_INGREDIENT} from './actions'

const isRecipePresent = (recipe) => {}

const savedRecipeReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_NEW_RECIPE:
      const removeIfExisting = [...state].filter((recipe) => ((recipe.id !== action.payload.id) || (recipe.created !== action.payload.created)))
      return [...removeIfExisting, action.payload]
    case DELETE_RECIPE:
      return [...state].filter((recipe) => ((recipe.id !== action.payload.id) || (recipe.created !== action.payload.created)))
    default:
      return state
  }
}

const recipeIdReducer = (state = 0, action) => {
  if (action.type === ADD_NEW_RECIPE){
    return state + 1
  }
  return state
}

const colorsReducer = (state = ['crimson', 'coral', 'teal'], action) => {
  if (action.type === CHANGE_THEME_COLOR){
    let newState = [...state]
    newState[action.payload.index] = action.payload.color
    return newState
  }
  return state
}

const intolerancesReducer = (state = [], action) => {
  if (action.type === ADD_INTOLERANCE) {
    return [...state, action.payload]
  } else if (action.type === REMOVE_INTOLERANCE) {
    const newState = [...state].filter((intolerance) => intolerance !== action.payload)
    return newState
  }
  return state
}

const ingredientsReducer = (state = [], action) => {
  if (action.type === ADD_INGREDIENT) {
    return [...state, action.payload]
  } else if (action.type === REMOVE_INGREDIENT) {
    const newState = [...state].filter((ingredient) => ingredient !== action.payload)
    return newState
  }
  return state
}

const reducer = combineReducers({
  savedRecipes: savedRecipeReducer,
  idRecipe: recipeIdReducer,
  themeColors: colorsReducer,
  intolerances: intolerancesReducer,
  excludedIngredients: ingredientsReducer,
})

export default reducer
