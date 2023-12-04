const endpointLists = {
  // AUTHENTICATION
  register: () => 'auth/register/',
  login: () => 'auth/register/',
  // USERS
  getAllUsers: () => 'users/list/',
  userById: (userID: string) => `users/${userID}/`,
}

export default endpointLists
