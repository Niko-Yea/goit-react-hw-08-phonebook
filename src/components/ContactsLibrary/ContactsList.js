import styles from './styles..module.scss'

const ContactsList = ({ children }) => {
  return (
    <ul className={styles.list}>
      {children}
    </ul>
  );
}

export default ContactsList;