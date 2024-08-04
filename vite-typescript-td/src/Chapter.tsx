import { assertNever, CoursePart } from "./types";

export default function Chapter(props: CoursePart) {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
          <p>Exercises: {props.exerciseCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{props.name}</h3> <p>{props.description}</p>
          <p>Exercises: {props.exerciseCount}</p>
          <p>
            <i>Additional material: {props.backgroundMaterial}</i>
          </p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{props.name}</h3>
          <p>Exercises: {props.exerciseCount}</p>
          <p>Group projects: {props.groupProjectCount}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
          <p>Exercises: {props.exerciseCount}</p>
          <p>
            Requirements:{" "}
            {props.requirements.map((r) => (
              <span>{r}-</span>
            ))}
          </p>
        </div>
      );
    default:
      return assertNever(props);
  }
}
