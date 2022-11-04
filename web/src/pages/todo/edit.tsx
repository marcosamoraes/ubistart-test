import { useParams } from "react-router-dom";


export function TodoEdit() {
  const { id, description, deadline } = useParams();

  return (
    <h1>TODO Edit {id}{description}{deadline}</h1>
  );
}
