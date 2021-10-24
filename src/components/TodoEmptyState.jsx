import { memo } from "react";
import todoEmptyState from "../assets/images/TodoEmptyState.svg"

const TodoEmptyState = memo(() => {
  return (
    <div data-cy="todo-empty-state" className="text-center">
      <img src={todoEmptyState} width="500" height="500" alt="todo empty state" />
    </div> 
  )
})

export default TodoEmptyState