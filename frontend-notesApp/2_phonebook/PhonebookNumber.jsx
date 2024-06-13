function Number({ person, onClick }) {
  return (
    <div>
      <span>
        {person.name} {person.number}
      </span>
      <button onClick={onClick}>delete</button>
    </div>
  );
}

export default Number;
