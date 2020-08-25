import {combineReducers} from 'redux'

import {ADD_NEW_RECIPE, DELETE_RECIPE, CHANGE_THEME_COLOR} from './actions'

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

const reducer = combineReducers({
  savedRecipes: savedRecipeReducer,
  idRecipe: recipeIdReducer,
  themeColors: colorsReducer,
})

export default reducer
