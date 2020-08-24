// action types
export const ADD_NEW_RECIPE = 'ADD_NEW_RECIPE'

//action creators
export const addNewRecipe = (newRecipe) => ({
  type: ADD_NEW_RECIPE,
  payload: newRecipe,
})
