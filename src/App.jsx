import React, { Component } from 'react';
import './App.css';
// import Contact from './Components/Contact';

import contacts from './contacts.json';

const fiveContacts = contacts.slice(0, 5);

class App extends Component {
  displayContacts = () => {};

  render() {
    return (
      <div className="App">
        <h1>IronContacts</h1>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {fiveContacts.map((contact) => {
              return (
                <tr>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
