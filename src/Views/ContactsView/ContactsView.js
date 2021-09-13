import authSelectors from '../../redux/auth/authSelectors';
import { useSelector } from 'react-redux';
import { useGetCurrentUserQuery } from '../../redux/auth/authApi';

import { Box, CircularProgress, Container, makeStyles, Typography } from '@material-ui/core';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactsLibrary from '../../components/ContactsLibrary/ContactsLibrary';

const useStyles = makeStyles({
  title: {
    marginTop: '25vh'
  },
  contsctsViewBox: {
    marginLeft: 'auto'
  },
  btn: {
    margin: '10px auto'
  },
  infoViewBox: {
    margin: '0 auto',
    height: '93.4vh'
  }
})

const ContactsView = () => {
  const classes = useStyles();
  const userName = useSelector(authSelectors.getUserName);
  const { isFetching } = useGetCurrentUserQuery();

  return (
    !isFetching
    ?
      <Container maxWidth='xl'>
        <Box display='flex'>
          <Box className={classes.infoViewBox}>
            <Typography
              className={classes.title}
              display='block'
              color='primary'
              variant='h3'
            >
              Phonebook
            </Typography>
            <Typography
              color='primary'
              variant='h5'
            >
              Hello, {userName}
            </Typography>
            <Typography
              color='primary'
              variant='body1'
            >
              now you can have access to your phone book wherever you are
            </Typography>
            <Box className={classes.btn}>
              <ContactForm />
            </Box>
          </Box>
          <Box className={classes.contsctsViewBox}>
            <ContactsLibrary />
          </Box>
        </Box>
      </Container>
    : <CircularProgress />
  );
}
 
export default ContactsView;