function Note({ note, toggleImportance }) {
  const label = note.important ? 'make not important' : 'make important';
  return (
    <>
      {note.important ? (
        <li>
          <b style={{ backgroundColor: 'yellow' }}>{note.content}</b>
          <button onClick={toggleImportance}>{label}</button>
        </li>
      ) : (
        <li>
          {note.content}
          <button onClick={toggleImportance}>{label}</button>
        </li>
      )}
    </>
  );
}

export default Note;
