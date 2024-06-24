export default function NoteForm({ onSubmit, onChange, value }) {
  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <label>Write the note you want to save down here:</label>
      <br />
      <input
        onChange={(event) => onChange(event)}
        type="text"
        placeholder="Fill me..."
        value={value}
      ></input>
      <button type="submit">Save</button>
    </form>
  );
}
