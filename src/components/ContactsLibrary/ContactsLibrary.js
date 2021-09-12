import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useFetchContactsQuery } from "../../redux/contacts/phonebookApi";
import ContactList from "./ContactsList";
import ContactItem from "./ContactItem";
import Filter from './Filter';
import contactsSelector from "../../redux/filter/contactsSelector";
import Loader from "react-loader-spinner";
import styles from './styles..module.scss';

function ContactsLibrary() {
  const { data: contacts, isFetching } = useFetchContactsQuery();
  const filter = useSelector(state => contactsSelector.getFilterState(state));
  const filteredContacts = useMemo(() => contactsSelector.filterContacts(contacts, filter), [contacts, filter])

  return (
    <div className={styles.contacts}>
      <div className={styles.head}>
        <h2>Contacts</h2>
        {isFetching && <Loader
          className={styles.headLoader}
          type='Oval'
          color='#707070'
          height='25'
          width='25'
        />}
      </div>

      <Filter />
      
      <ContactList>
        {contacts && filteredContacts.map(contact => (
          <ContactItem contact={contact} key={contact.id}/>
        ))}
      </ContactList>
    </div>
  );
}

export default ContactsLibrary;