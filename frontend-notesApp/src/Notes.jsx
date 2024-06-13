import { useEffect, useState } from 'react';
import noteService from './services/notes';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
  const [notesArr, setNotesArr] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // console.log("effect");
    noteService.getAll().then((initialNotes) => {
      // console.log("promise fulfilled", initialNotes);
      setNotesArr(initialNotes);
    });
  }, []);

  console.log('render', notesArr.length, 'notes');

  const notesToShow = showAll
    ? notesArr
    : notesArr.filter((note) => note.important);

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

  function handleTyping(event) {
    // console.log(event.target.value);
    setNewNote(event.target.value);
  }

  function handleShowAll(event) {
    // console.log(showAll);
    if (showAll) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
    // console.log(showAll);
  }

  function toggleImportanceOf(id) {
    console.log(`importance of ${id} needs to be toggled`);
    //const url = `http://localhost:3001/notes/${id}`;
    const note = notesArr.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

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
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => {
              toggleImportanceOf(note.id);
            }}
          />
        ))}
      </ul>
      {/* <p>
        The current input value: <b>{newNote}</b>
      </p> */}

      <form onSubmit={addNote}>
        <label>Write the note you want to save down here:</label>
        <br />
        <input
          onChange={handleTyping}
          type="text"
          placeholder="Fill me..."
          value={newNote}
        ></input>
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
