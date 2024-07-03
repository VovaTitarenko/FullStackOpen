function Note({ note, toggleImportance, deleteNote }) {
  const label = note.important ? 'make not important' : 'make important';
  return (
    <li className="note">
      {note.important ? (
        <>
          <b style={{ backgroundColor: 'yellow' }}>{note.content}</b>
          <button onClick={toggleImportance}>{label}</button>
        </>
      ) : (
        <>
          {note.content}
          <button onClick={toggleImportance}>{label}</button>
        </>
      )}
      <button className="delete" onClick={deleteNote}>
        delete
      </button>
    </li>
  );
}

export default Note;
