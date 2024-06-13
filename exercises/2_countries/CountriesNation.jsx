import { useState } from "react";
import NationDetails from "./CountriesNationDetails";

function Nation({ nation }) {
  const [showDetails, setShowDetails] = useState(false);
  function handleShow() {
    console.log(
      `changing show property for ${nation.name.common}`,
      showDetails
    );
    setShowDetails(!showDetails);
  }
  return (
    <div>
      <span>{nation.name.common}</span>
      <button onClick={handleShow}>{showDetails ? "hide" : "show"}</button>
      {showDetails ? <NationDetails nation={nation} /> : null}
    </div>
  );
}

export default Nation;
