import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import authSelectors from '../../redux/auth/authSelectors'

const PublicRouter = ({
  restricted = false,
  redirectTo = '/',
  children,
  ...routeProps
}) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggegIn)
  const shouldRedirect = isLoggedIn && restricted
  return (
    <Route {...routeProps}>
      {shouldRedirect ? <Redirect to={redirectTo} /> : children}
    </Route>
  )
}

export default PublicRouter
