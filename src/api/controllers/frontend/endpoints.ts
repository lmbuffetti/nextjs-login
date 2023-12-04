const endpointLists = {
  // AUTHENTICATION
  register: () => 'auth/register/',
  login: () => 'auth/register/',
  // USERS
  getAllUsers: () => 'users/list/',
  userById: userID => `users/${userID}/`,

  // RECIPES
  addRecipe: () => 'recipes/addRecipe/',
  getAllRecipes: () => 'recipes/list/',
  recipeById: recipeID => `recipes/${recipeID}/`,
}

export default endpointLists
