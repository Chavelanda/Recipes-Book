// action types
export const ADD_NEW_RECIPE = 'ADD_NEW_RECIPE'

export const DELETE_RECIPE = 'DELETE_RECIPE'

export const CHANGE_THEME_COLOR = 'CHANGE_THEME_COLOR'

export const ADD_INTOLERANCE = 'ADD_INTOLERANCE'

export const REMOVE_INTOLERANCE = 'REMOVE_INTOLERANCE'

export const ADD_INGREDIENT = 'ADD_INGREDIENT'

export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'

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

export const addIntolerance = (intolerance) => ({
  type: ADD_INTOLERANCE,
  payload: intolerance,
})

export const removeIntolerance = (intolerance) => ({
  type: REMOVE_INTOLERANCE,
  payload: intolerance,
})

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,
  payload: ingredient,
})

export const removeIngredient = (ingredient) => ({
  type: REMOVE_INGREDIENT,
  payload: ingredient,
})
