// action types
export const ADD_NEW_RECIPE = 'ADD_NEW_RECIPE'

export const DELETE_RECIPE = 'DELETE_RECIPE'

export const CHANGE_THEME_COLOR = 'CHANGE_THEME_COLOR'

//action creators
export const addNewRecipe = (newRecipe) => ({
  type: ADD_NEW_RECIPE,
  payload: newRecipe,
})

export const deleteRecipe = (recipe) => ({
  type: DELETE_RECIPE,
  payload: recipe,
})

export const changeThemeColor = (tabIndexAndColor) => ({
  type: CHANGE_THEME_COLOR,
  payload: tabIndexAndColor,
})
