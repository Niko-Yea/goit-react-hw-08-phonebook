import React from 'react'
import { useState } from 'react'
import { useCreateNewUserMutation } from '../../redux/auth/authApi'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/auth/authSlice'

import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  input: {
    '& .MuiFormLabel-root': {
      color: '#8eacbb',
    },
    '& .MuiInputBase-root': {
      color: '#607d8b',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid #8eacbb',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid #34515e',
    },
  },
  linl: {
    textDecoration: 'none',
    color: theme.palette.primary.dark,
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignUp() {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const [createNewUser] = useCreateNewUserMutation()

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const registrationResponse = await createNewUser({
        name,
        email,
        password,
      })
      if (registrationResponse.data) {
        dispatch(register(registrationResponse.data))
      }
    } catch (error) {}
  }

  const handleInputChange = e => {
    const { name, value } = e.target

    switch (name) {
      case 'name':
        setName(value)
        break

      case 'email':
        setEmail(value)
        break

      case 'password':
        setPassword(value)
        break

      default:
        return
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="primary">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                color="secondary"
                autoComplete="fname"
                name="name"
                variant="standard"
                required
                fullWidth
                id="name"
                label="Name"
                onChange={handleInputChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                color="secondary"
                variant="standard"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                color="secondary"
                variant="standard"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="login" className={classes.linl}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
