import { memo } from "react";

const TodoEmptyState = memo(() => {
  return (
    <div data-cy="todo-empty-state" className="flex justify-center">
      <img src="https://cdn.statically.io/img/todo-app-b80c4.web.app/w=500,h=500/assets/todo-empty-state.20bd1778.webp" alt="todo empty" width="500" height="500" />
    </div> 
    
  )
})

export default TodoEmptyState