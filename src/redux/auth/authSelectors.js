const getIsLoggegIn = state => state.authSlice.isLoggedIn
const getToken = state => state.authSlice.token;
const getUserName = state => state.authSlice.user.name;

const authSelectors = {
  getIsLoggegIn,
  getToken,
  getUserName
}
export default authSelectors