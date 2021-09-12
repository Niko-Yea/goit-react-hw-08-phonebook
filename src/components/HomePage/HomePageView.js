import authSelectors from "../../redux/auth/authSelectors"; 
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  btn: {
    '&:not(:last-child)': {
      marginRight: '10px',
    },
  },
    box: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginRight: '150px',
    }
})


const HomePageView = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggegIn);
  const classes = useStyles();
  console.log(classes)
  return (
    <Container maxWidth="xl" >
      <Box display='flex' className={classes.box}>
        <Typography variant="h1" component="h1" color='primary'>
          Your Phonebook
        </Typography>

        {isLoggedIn
          ?
            <Box>
              <Button
                className={classes.btn}
                component={Link}
                to='/contacts'
                color='primary'
                variant='contained'
              >
                Get started
              </Button>
            </Box>
          :
            <Box>
              <Button
                className={classes.btn}
                component={Link}
                to='/login'
                color='primary'
                variant="contained"
              >
                Signin
              </Button>
              <Button
                className={classes.btn}
                component={Link}
                to='/registration'
                color='primary'
                variant="contained"
              >
                Signup
              </Button>
            </Box>
        }
        
      </Box>
      
    </Container>
  );
}

export default HomePageView;