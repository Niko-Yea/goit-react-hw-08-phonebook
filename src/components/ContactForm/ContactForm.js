import { useState, useEffect, useRef } from "react";
import shortid from "shortid";
import styles from './styles.module.scss';
import { useCreateContactMutation, useFetchContactsQuery } from "../../redux/contacts/phonebookApi";

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [createContact] = useCreateContactMutation();
  const { data: contacts } = useFetchContactsQuery();

  const mainInput = useRef(null);

  useEffect(() => {
    mainInput.current.focus()
  }, [])

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
    mainInput.current.focus()
    await createContact({ name, number });
  }

  const resetState = () => {
    setName('');
    setNumber('');
  }

  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor={nameInputId}>
        Name
        <input
          ref={mainInput}
          onChange={handleInputChange}
          value={name}
          id={nameInputId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <label className={styles.label} htmlFor={numberInputId}>
        Number
        <input
          onChange={handleInputChange}
          value={number}
          id={numberInputId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>
      <button className={styles.button} type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;