import { useEffect, useState } from 'react';
import Blank from './PhonebookBlank';
import Number from './PhonebookNumber';
import Filter from './PhonebookFilter';
import personService from './services/persons';
import Notification from '../src/components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialNumbers) => {
      console.log('promise successful', initialNumbers);
      setPersons(initialNumbers);
    });
  }, []);

  function addPerson(event) {
    event.preventDefault();
    if (persons.filter((person) => person.name === newName).length) {
      const personToUpdate = persons.find((person) => person.name === newName);
      if (
        confirm(
          `${newName} is already added to the phonebook. Do you want to replace the existing number with a new one?`,
        )
      ) {
        const updatedPerson = { ...personToUpdate, number: newNumber };
        personService
          .update(personToUpdate.id, updatedPerson)
          .then((response) => {
            console.log('update successful', response);
            setNewName('');
            setNewNumber('');
            setPersons(
              persons.map((p) => (p.id !== personToUpdate.id ? p : response)),
            );
          })
          .catch((error) => {
            setErrorMessage(
              `${updatedPerson.name} is no longer in the database and cannot be updated. Click the "add" button again to save the name-number pair.`,
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== personToUpdate.id));
          });
      }
    } else if (persons.filter((person) => person.number === newNumber).length) {
      alert(
        `${newNumber} is already added to the phonebook under name ${
          persons.filter((person) => person.number === newNumber)[0].name
        }!`,
      );
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(newPerson)
        .then((response) => {
          console.log(response);
          setPersons(persons.concat(response));
          setSuccessMessage(
            `${response.name} has been successfully added to the phonebook.`,
          );
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `Following validation error occured: ${error.message}`,
          );
        });
      setNewName('');
      setNewNumber('');
    }
  }

  function handleNewName(event) {
    console.log(event.target.value);
    setNewName(event.target.value);
    console.log(persons.filter((person) => person.name === event.target.value));
  }

  function handleNewNumber(event) {
    console.log(event.target.value);
    setNewNumber(event.target.value);
    console.log(
      persons.filter((person) => person.number === event.target.value),
    );
  }

  function handleFilter(event) {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  }

  function deleteNumberOf(id) {
    if (
      window.confirm(
        `Do you really want to delete ${
          persons.find((person) => person.id === id).name
        }?`,
      )
    ) {
      personService.deleteId(id).then((response) => {
        console.log('deleted successully');
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  }

  const filterPattern = new RegExp(`.*${newFilter}`, 'i');

  const personsFiltered = persons.filter((person) =>
    filterPattern.test(person.name),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <form onSubmit={addPerson}>
        <div>
          <Blank name="name" value={newName} onChange={handleNewName} />
          <Blank name="number" value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <div>
        filter by: <input value={newFilter} onChange={handleFilter} />
      </div>
      {/* <Filter value={newFilter} onChange={handleFilter} /> */}
      {personsFiltered.map((person) => (
        <Number
          key={person.id}
          person={person}
          onClick={() => {
            deleteNumberOf(person.id);
          }}
        />
      ))}
    </div>
  );
};

export default App;

// 2.6 done
// 2.7 done
// 2.8 done
// 2.9 done
// 2.10 done
// 2.11 done
// 2.12 done
// 2.13 done
// 2.14 done
// 2.15 done
