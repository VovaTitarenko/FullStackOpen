const NationDetails = ({ nation }) => {
  console.log(nation);
  let languageKeyArr = Object.keys(nation.languages);
  console.log(languageKeyArr);
  return (
    <>
      <hr />
      <h1>{nation.name.common}</h1>
      <p>capital {nation.capital[0]}</p>
      <p>area {nation.area}</p>
      <h3>Languages:</h3>
      <ul>
        {languageKeyArr.map((l) => {
          console.log(nation.languages[l]);
          return <li key={l}>{nation.languages[l]}</li>;
        })}
      </ul>
      <img src={nation.flags.png} />
      <hr />
    </>
  );
};

export default NationDetails;
