import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import authSelectors from '../../redux/auth/authSelectors'

const PrivateRouter = ({ children, ...routeProps }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggegIn)
  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Redirect to="/login" />}
    </Route>
  )
}
export default PrivateRouter
