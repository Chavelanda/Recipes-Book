export const compareRecipeByName = (recipe1, recipe2) => recipe1.title > recipe2.title

export const compareRecipeByTime = (recipe1, recipe2) => +recipe1.time > +recipe2.time
