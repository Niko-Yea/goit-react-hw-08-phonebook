import React from 'react';
import { useSiginUserMutation } from '../../redux/auth/authApi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/authSlice';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({

  input: {
    '& .MuiFormLabel-root': {
      color: '#8eacbb'
    },
    '& .MuiInputBase-root': {
      color: '#607d8b'
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid #8eacbb'
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
    }
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [signinUser] = useSiginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await signinUser({ email, password })
      if (loginResponse.data) {
        dispatch(login(loginResponse.data))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'email':
        setEmail(value)
        break;
      
      case 'password':
        setPassword(value)
        break;

      default:
        return;
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color='primary'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            color='secondary'
            className={classes.input}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            className={classes.input}
            color='secondary'
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link to="/registration" className={classes.linl}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}