import React, { Component } from 'react';
import './App.css';
// import Contact from './Components/Contact';

import contacts from './contacts.json';

const fiveContacts = contacts.slice(0, 5);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentContacts: contacts.slice(0, 5),
      remainingContacts: contacts.slice(5)
    };
  }
  displayContacts = () => {
    const elements = this.state.currentContacts.map((contact) => {
      return (
        <tr key={`${contact.name}`}>
          <td>
            <img
              className="profile-img"
              src={contact.pictureUrl}
              alt="contact"
            />
          </td>
          <td>
            <p>{contact.name}</p>
          </td>
          <td>
            <p>{contact.popularity}</p>
          </td>
          <td>
            <button
              onClick={() => {
                this.handleContactRemoval(contact.name);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return elements;
  };
  handleContactRemoval = (idName) => {
    const newContacts = [...this.state.currentContacts];
    const remainingContacts = [...this.state.remainingContacts];
    const removedContactIndex = newContacts.findIndex((elem) => {
      return elem.name === idName;
    });
    remainingContacts.push(newContacts.splice(removedContactIndex, 1)[0]);

    this.setState((previous) => {
      return {
        currentContacts: newContacts,
        remainingContacts: remainingContacts
      };
    });
  };

  addRandomContact = () => {
    //avoiding direct mutation of the state
    const newContacts = [...this.state.currentContacts];
    const remainingContacts = [...this.state.remainingContacts];

    // get random number from the remaining, not added contacts
    const randomNumber = Math.floor(
      Math.random() * this.state.remainingContacts.length
    );

    newContacts.push(remainingContacts.splice(randomNumber, 1)[0]);

    this.setState((previous) => {
      return {
        currentContacts: newContacts,
        remainingContacts: remainingContacts
      };
    });
  };

  sortByName = () => {
    const newContacts = [...this.state.currentContacts];
    newContacts.sort((first, second) => {
      return first.name.localeCompare(second.name);
    });
    this.setState((previous) => {
      return {
        currentContacts: newContacts
      };
    });
  };
  sortByPopularity = () => {
    const newContacts = [...this.state.currentContacts];
    newContacts.sort((first, second) => {
      return second.popularity - first.popularity;
    });
    this.setState((previous) => {
      return {
        currentContacts: newContacts
      };
    });
  };
  render() {
    return (
      <div className="App">
        <h1>IronContacts</h1>
        <div className="buttons-wrapper">
          <button onClick={this.addRandomContact}>Add Random Contact</button>
          <button onClick={this.sortByName}>Sort by name</button>
          <button onClick={this.sortByPopularity}>Sort by popularity</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.displayContacts()}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
