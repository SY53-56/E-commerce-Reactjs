import { Link } from "react-router-dom";

export default function Button({ classname, to, name }) {
  return (
    <Link
      to={to}
      className={`${classname} cursor-pointer duration-100 rounded py-1 inline-block`}
    >
      {name}
    </Link>
  );
}
