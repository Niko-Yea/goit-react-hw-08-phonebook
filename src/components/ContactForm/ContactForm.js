import { useState } from "react";
import { useCreateContactMutation, useFetchContactsQuery } from "../../redux/contacts/phonebookApi";
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Dialog, Typography } from "@material-ui/core";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [createContact] = useCreateContactMutation();
  const { data: contacts } = useFetchContactsQuery();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value)
        break;

      case 'number':
        setNumber(value)
        break;

      default:
        return;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isContactOnLibrary = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
    
    if (isContactOnLibrary) {
      alert('is already in contacts')
      return;
    }

    resetState();
    await createContact({ name, number });
    setOpen(false)
  }

  const resetState = () => {
    setName('');
    setNumber('');
  }


  const hanleOpenModal = () => {
    setOpen(true)
  }
  const hanleCloseModal = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        type='button'
        onClick={hanleOpenModal}
        color='secondary'
        variant='contained'
      >
        Add new contact
      </Button>
      <Dialog
        open={open}
        onClose={hanleCloseModal}
        PaperProps={{
          style: {
            backgroundColor: '#494949'
          }
        }}
      >
        <DialogTitle>
          <Typography
            color='secondary'
            variant='body1'
          >
            Add new contact
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            helperText="Incorrect entry."
            color='secondary'
            className={classes.input}
            variant='standard'
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
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
            name="number"
            label="Number"
            type='tel'
            id="number"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hanleCloseModal} color='primary' variant='contained'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary' variant='contained'>
            Add contact
          </Button>
        </DialogActions>

      </Dialog>
    </>
  );
};

export default ContactForm;