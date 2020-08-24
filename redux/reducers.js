import {combineReducers} from 'redux'

import {ADD_NEW_RECIPE} from './actions'

const savedRecipeReducer = (state = [], action) => {
  if (action.type === ADD_NEW_RECIPE){
    return [...state, action.payload]
  }
  return state
}

const reducer = combineReducers({
  savedRecipes: savedRecipeReducer,
})

export default reducer
