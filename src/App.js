import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState({ contacts })
    })
  }

  removeContact = (contactToDelete) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== contactToDelete.id)
    }))

    ContactsAPI.remove(contactToDelete);
  }
  render() {
    return (
      <div>
        <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts} />
      </div>
    )
  }
}

export default App;
