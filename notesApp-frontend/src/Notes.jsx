import { useEffect, useState } from 'react';
import noteService from './services/notes';
import loginService from './services/login';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';

const App = () => {
  const [notesArr, setNotesArr] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // console.log("effect");
    noteService.getAll().then((initialNotes) => {
      // console.log("promise fulfilled", initialNotes);
      setNotesArr(initialNotes);
    });
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem('loggedNoteAppUser')) {
      const user = JSON.parse(window.localStorage.getItem('loggedNoteAppUser'));
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  console.log('render', notesArr.length, 'notes');

  const notesToShow = showAll
    ? notesArr
    : notesArr.filter((note) => note.important);

  function handleShowAll(event) {
    if (showAll) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  }

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setSuccessMessage(`Welcome, ${user.username}! You're now logged in!`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  function handleTyping(event) {
    // console.log(event.target.value);
    setNewNote(event.target.value);
  }

  function addNote(event) {
    event.preventDefault();
    // console.log("button clicked", event.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((createdNote) => {
      console.log(createdNote);
      setNotesArr(notesArr.concat(createdNote));
      setNewNote('');
    });
  }

  function deleteNote(id) {
    noteService
      .deleteNote(id)
      .then((response) => {
        setSuccessMessage(`Note with id ${id} successfully deleted!`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
        console.log(response.status);
      })
      .catch((err) => {
        setErrorMessage('Could not delete note.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  }

  function toggleImportanceOf(id) {
    console.log(`importance of ${id} needs to be toggled`);
    //const url = `http://localhost:3001/notes/${id}`;
    const note = notesArr.find((note) => note.id === id);
    const changedNote = {
      ...note,
      important: !note.important,
    };

    noteService
      .update(id, changedNote)
      .then((updatedNote) => {
        console.log(updatedNote);
        setNotesArr(notesArr.map((n) => (n.id !== id ? n : updatedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server.`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotesArr(notesArr.filter((note) => note.id !== id));
      });
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
      {user ? (
        <div>
          <div>
            <span>
              Current user: <b>{user.name}</b>
            </span>
            <button
              onMouseDown={() => {
                window.localStorage.removeItem('loggedNoteAppUser');
                setUser(null);
                setSuccessMessage('Logged out successfully!');
                setTimeout(() => {
                  setSuccessMessage(null);
                }, 5000);
              }}
            >
              Logout
            </button>
          </div>
          <NoteForm
            onSubmit={addNote}
            onChange={handleTyping}
            value={newNote}
          />
        </div>
      ) : (
        <LoginForm
          login={handleLogin}
          onUserChange={handleUsername}
          uValue={username}
          onPassChange={handlePassword}
          pValue={password}
        />
      )}
      <label>
        <input
          type="radio"
          name="showAll"
          checked={showAll ? true : false}
          onChange={handleShowAll}
        ></input>
        Show all
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="showAll"
          checked={showAll ? false : true}
          onChange={handleShowAll}
        ></input>
        Show important only
      </label>
      <ul>
        {notesToShow.toReversed().map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => {
              toggleImportanceOf(note.id);
            }}
            deleteNote={() => {
              deleteNote(note.id);
            }}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
