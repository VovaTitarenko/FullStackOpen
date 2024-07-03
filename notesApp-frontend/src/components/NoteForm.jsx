import { useState } from 'react';

export default function NoteForm({ createNote }) {
  const [newNote, setNewNote] = useState('');

  const addNote = async (event) => {
    event.preventDefault();
    // console.log("button clicked", event.target);
    const noteObject = {
      content: newNote,
      important: true,
    };
    await createNote(noteObject);
    setNewNote('');
  };

  return (
    <form onSubmit={(event) => addNote(event)}>
      <label>Write the note you want to save down here:</label>
      <br />
      <input
        onChange={({ target }) => setNewNote(target.value)}
        type="text"
        placeholder="Fill me..."
        value={newNote}
      />
      <button type="submit">Save</button>
    </form>
  );
}

// import { useState } from 'react';

// const NoteForm = ({ createNote }) => {
//   const [newNote, setNewNote] = useState('');

//   const handleChange = (event) => {
//     setNewNote(event.target.value);
//   };

//   const addNote = (event) => {
//     event.preventDefault();
//     createNote({
//       content: newNote,
//       important: true,
//     });

//     setNewNote('');
//   };

//   return (
//     <div className="formDiv">
//       <h2>Create a new note</h2>

//       <form onSubmit={addNote}>
//         <input value={newNote} onChange={handleChange} />
//         <button type="submit">save</button>
//       </form>
//     </div>
//   );
// };

// export default NoteForm;
