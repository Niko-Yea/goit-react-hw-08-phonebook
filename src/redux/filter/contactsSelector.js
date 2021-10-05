const getFilterState = state => state.filterReducer

const filterContacts = (contacts, filter) => {
  const lowerCaseString = filter.toLowerCase()

  return contacts
    ?.filter(contact => contact.name.toLowerCase().includes(lowerCaseString))
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1
      } else if (a.name > b.name) {
        return 1
      }
      return 0
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getFilterState,
  filterContacts,
}
