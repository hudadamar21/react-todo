import { memo } from "react";
import { Link } from "react-router-dom";

const BackButton = memo(() => {
  return (
    <Link to="/">
      <div className="cursor-pointer" data-cy="todo-back-button">
      <svg className="w-7 h-7" viewBox="0 0 24 24"><path d="M11.67 3.87L9.9 2.1L0 12l9.9 9.9l1.77-1.77L3.54 12z" fill="currentColor"></path></svg>
      </div>
    </Link>
  )
})

export default BackButton