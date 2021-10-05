import React from 'react'
import { useSelector } from 'react-redux'
import authSelectors from '../../redux/auth/authSelectors'
import { useDispatch } from 'react-redux'
import { useLogOutUserMutation } from '../../redux/auth/authApi'
import { logout } from '../../redux/auth/authSlice'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import { NavLink } from 'react-router-dom'
import { Box, Button, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  usersLink: {
    marginLeft: 'auto',
  },
  btn: {
    '&:not(last-child)': {
      marginRight: '20px',
    },
  },
  appBar: {
    backgroundColor: 'rgb(64, 64, 64)',
  },
  userBox: {
    marginLeft: 'auto',
    alignItems: 'center',
  },
}))

export default function SimpleTabs() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [logOutUser] = useLogOutUserMutation()
  const isLoggedIn = useSelector(authSelectors.getIsLoggegIn)
  const userName = useSelector(authSelectors.getUserName)

  const handleLogOutClick = async () => {
    try {
      const logOutResponse = await logOutUser()
      if (logOutResponse.data) {
        dispatch(logout())
      }
    } catch (error) {}
  }

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <Button
          color="primary"
          variant="contained"
          component={NavLink}
          to="/"
          className={classes.btn}
        >
          home
        </Button>

        {isLoggedIn && (
          <>
            <Button
              color="primary"
              variant="contained"
              component={NavLink}
              to="/contacts"
              className={classes.btn}
            >
              contacts
            </Button>
            <Box display="flex" className={classes.userBox}>
              <Typography
                align="center"
                variant="h5"
                color="secondary"
                className={classes.btn}
              >
                {userName}
              </Typography>
              <Button
                color="primary"
                variant="contained"
                className={classes.btn}
                onClick={handleLogOutClick}
              >
                logout
              </Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
