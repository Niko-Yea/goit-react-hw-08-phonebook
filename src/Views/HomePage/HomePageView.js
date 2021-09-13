import authSelectors from "../../redux/auth/authSelectors"; 
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button, Slide } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";

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
  const [up, setUp] = useState(false)
  const isLoggedIn = useSelector(authSelectors.getIsLoggegIn);
  const classes = useStyles();

  useEffect(() => {
    setUp(true)
    return () => setUp(false)
  } ,[])
  return (
    <Container maxWidth="xl" >
      <Box display='flex' className={classes.box}>
        <Slide direction='left' in={up} mountOnEnter unmountOnExit timeout={1000}>
          <Typography variant="h1" component="h1" color='primary'>
            Your Phonebook
          </Typography>
        </Slide>

        {isLoggedIn
          ?
            <Slide direction='up' in={up} mountOnEnter unmountOnExit timeout={1500}>
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
            </Slide>
          :
            <Slide direction='up' in={up} mountOnEnter unmountOnExit timeout={1500}>
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
            </Slide>
        }
        
      </Box>
      
    </Container>
  );
}

export default HomePageView;