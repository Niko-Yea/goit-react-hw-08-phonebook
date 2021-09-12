import { Suspense, useEffect } from 'react';
import { Switch } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { refresh } from './redux/auth/authSlice';
import { useGetCurrentUserQuery } from './redux/auth/authApi';
import authSelectors from './redux/auth/authSelectors';

import Layout from './components/Layout/Layout';
import HomePageView from './components/HomePage/HomePageView';
import NavTabs from './components/NavTabs/NavTabs';
import PrivateRouter from './components/Routers/PrivateRouter';
import PubliRouter from './components/Routers/PublicRouter';
import SigninView from './components/SigninView/SigninView';
import SignupView from './components/SignupView/SignupView'
import ContactsView from './components/ContactsView/ContactsView';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import { createTheme, ThemeProvider } from '@material-ui/core'

const theme = createTheme({
  palette: {
    primary: {
      main: '#757575',
    },
    secondary: {
      main: '#607d8b'
    }
  },

  
})

function Phonebook() {
  const token = useSelector(authSelectors.getToken);
  const dispatch = useDispatch();
  const {data, isFetching } = useGetCurrentUserQuery(token ?? skipToken);


  useEffect(() => {
    if (token === null) {
      return;
    }
    dispatch(refresh(data))
  },[token, dispatch, data])

  return (
    !isFetching &&
    <ThemeProvider theme={theme}>
      <Layout>
        <NavTabs />

        <Switch>
        <Suspense fallback={<p>LOADING...</p>}>
          
          <PubliRouter exact path='/'>
            <HomePageView />
          </PubliRouter>

          <PubliRouter exact path='/login'restricted>
            <SigninView />
          </PubliRouter>

          <PubliRouter exact path='/registration'restricted>
            <SignupView />
          </PubliRouter>

          <PrivateRouter exact path='/contacts'>
            <ContactsView />
          </PrivateRouter>

        </Suspense>
        </Switch>

      </Layout>
    </ThemeProvider>
  );
}

export default Phonebook