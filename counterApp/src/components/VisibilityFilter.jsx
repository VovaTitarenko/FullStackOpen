// import { useRef } from "react";
import { filterChange } from "../reducers/filterReducer";
import { useDispatch, useSelector } from "react-redux";

const VisibilityFilter = (props) => {
  //   const visibility = useRef([true, false, false]);

  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  //   switch (filter) {
  //     case "ALL":
  //       visibility.current = [true, false, false];
  //     case "IMPORTANT":
  //       visibility.current = [false, true, false];
  //     case "NOTIMPORTANT":
  //       visibility.current = [false, false, true];
  //   }

  return (
    <div>
      <input
        type="radio"
        name="filter"
        // checked={visibility[0]}
        onChange={() => dispatch(filterChange("ALL"))}
      />
      all
      <input
        type="radio"
        name="filter"
        // checked={visibility[1]}
        onChange={() => dispatch(filterChange("IMPORTANT"))}
      />
      important
      <input
        type="radio"
        name="filter"
        // checked={visibility[2]}
        onChange={() => dispatch(filterChange("NONIMPORTANT"))}
      />
      nonimportant
    </div>
  );
};

export default VisibilityFilter;
