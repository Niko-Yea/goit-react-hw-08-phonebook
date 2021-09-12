import { useDeleteContactMutation } from '../../redux/contacts/phonebookApi';
import styles from './styles..module.scss';
import Loader from "react-loader-spinner";

const ContactItem = ({ contact }) => {
  const [deleteContact, {isLoading}] = useDeleteContactMutation();

  return (
    <li className={styles.item}>{contact?.name}: {contact.number}
      <button
        className={styles.button}
        onClick={() => deleteContact(contact.id)}
        type='button'
        disabled={isLoading}
      >
        {isLoading ? <Loader type='Oval' height='10' width='10' /> : 'Delete'}
      </button>
    </li>
  );
}

export default ContactItem;
