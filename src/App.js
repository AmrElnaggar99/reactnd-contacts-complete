import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';


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

  createContact = (contact) => {
    ContactsAPI.create(contact).then((contact) => {
      this.setState(prevState => ({
        contacts: prevState.contacts.concat([contact])
      }))
    })
  }
  render() {
    return (
      <div>
        <Route path='/' exact render={() => (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )} />
        <Route path='/create' render={({ history }) => (
          <CreateContact onCreateContact={(contact) => {
            this.createContact(contact)
            history.push('/')
          }} />
        )} />
      </div>
    )
  }
}

export default App;
