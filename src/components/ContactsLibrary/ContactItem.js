import { useDeleteContactMutation } from '../../redux/contacts/phonebookApi';

import { Avatar,  IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, CircularProgress } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';


const ContactItem = ({contactsInList, index}) => {
  const [deleteContact, {isLoading}] = useDeleteContactMutation();

  return (
        <ListItem button key={contactsInList[index].id} >
          <ListItemAvatar>
            <Avatar>
              <AccountCircle color='primary' />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={contactsInList[index].name}
            secondary={contactsInList[index].number}
            primaryTypographyProps={{
              variant: 'body1',
              color: 'primary'
            }}
            secondaryTypographyProps={{
              variant: 'body2',
              color: 'primary'
            }}
          />
          <ListItemSecondaryAction>
            <IconButton color='secondary' onClick={() => deleteContact(contactsInList[index].id)}>
              {isLoading ? <CircularProgress /> : <DeleteIcon />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
  );
}

export default ContactItem;
