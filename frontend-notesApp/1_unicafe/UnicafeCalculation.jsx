function Calculation({ name, inputFun, params }) {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{inputFun(params)}</td>
      </tr>
    </>
  );
}

export default Calculation;
