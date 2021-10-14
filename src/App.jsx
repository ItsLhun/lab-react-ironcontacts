import React, { Component } from 'react';
import './App.css';
// import Contact from './Components/Contact';

import contacts from './contacts.json';

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
              className="btn-delete"
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
    if (this.state.remainingContacts.length === 0) {
      return;
    }
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

  sortByName = (index) => {
    const newContacts = [...this.state.currentContacts];
    newContacts.sort((first, second) => {
      let namesFirst = first.name.split(' ');
      let namesSecond = second.name.split(' ');
      if (namesFirst.length > 2 && index === 1) {
        return namesFirst[index + 1].localeCompare(namesSecond[index]);
      }
      if (namesSecond.length > 2 && index === 1) {
        return namesFirst[index].localeCompare(namesSecond[index + 1]);
      }
      return namesFirst[index].localeCompare(namesSecond[index]);
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
        <button onClick={this.addRandomContact}>Add Random Contact</button>

        <div className="buttons-wrapper">
          <button
            onClick={() => {
              this.sortByName(0);
            }}
          >
            Sort by first name
          </button>
          <button
            onClick={() => {
              this.sortByName(1);
            }}
          >
            Sort by last name
          </button>
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
