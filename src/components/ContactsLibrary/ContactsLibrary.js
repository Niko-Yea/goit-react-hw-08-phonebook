import { useMemo, } from "react";import { useSelector } from "react-redux";
import { useFetchContactsQuery } from "../../redux/contacts/phonebookApi";
import ContactItem from "./ContactItem";
import contactsSelector from "../../redux/filter/contactsSelector";
import { List } from "@material-ui/core";
import { FixedSizeList } from 'react-window';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  scrollBar: {
    '&::-webkit-scrollbar': {
      width: '14px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#494949',
      borderRadius: '7px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#607d8b',
      borderRadius: '7px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#34515e',
    },
  },
  box: {
    width: '600px'
  }
})

function ContactsLibrary() {
  const { data: contacts } = useFetchContactsQuery();
  const filter = useSelector(state => contactsSelector.getFilterState(state));
  const filteredContacts = useMemo(() => contactsSelector.filterContacts(contacts, filter), [contacts, filter]);
  const classes = useStyles();

  const getNodeHeight = () => {
    const height = document.getElementById('layout')
    if (height) {
      return height.clientHeight
    }
  }

  const renderRow = ({ index, style, data: contactsInList }) => {
    const customListStyle = {
      ...style,
    }
    return (
      contacts && 
      <div style={customListStyle} >
        <ContactItem contactsInList={contactsInList} index={ index }/>
      </div>
    )
  }
  

  return (
    contacts
    ?
      <FixedSizeList
        className={classes.scrollBar}
        innerElementType={List}
        height={getNodeHeight()}
        width={600}
        itemSize={72}
        itemCount={filteredContacts.length}
        itemData={filteredContacts}
      >
        {filteredContacts.length > 0 ? renderRow : 'qwe'}
      </FixedSizeList>
    : <div className={classes.box}></div>
  );
}

export default ContactsLibrary;