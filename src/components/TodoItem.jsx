import { memo } from "react"

import PriorityIndicator from './PriorityIndicator'

const TodoItem = memo(({ todo, onChangeIsActive, onDelete, onEdit }) => {

  const editIcon = <svg className="w-6 h-6" viewBox="0 0 24 24"><path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z" fill="#666"></path></svg>

  const deleteIcon = <svg className="w-6 h-6" viewBox="0 0 24 24" ><path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8z" fill="#666"></path></svg>

  return (
    <div data-cy="todo-item" className="relative flex items-center gap-5 bg-white px-6 py-4 border rounded-lg mb-3" >
      <input className="h-5 w-5 cursor-pointer" onChange={onChangeIsActive} type="checkbox" data-cy="todo-item-checkbox" data-checked={!todo.is_active} checked={!todo.is_active} />
      <PriorityIndicator 
        data-cy="todo-item-priority-indicator" 
        priority={todo.priority} 
      />
      <p data-cy="todo-item-title" className={`text-xl font-bold ${!todo.is_active && 'line-through opacity-50'}`}>
        {todo.title}
      </p>
      <button onClick={() => onEdit(todo)} data-cy="todo-item-edit-button">
        {editIcon}
      </button>
      <button data-cy="todo-item-delete-button" onClick={() => onDelete(todo)} className="absolute top-1/2 -translate-y-1/2 right-5 h-full w-14 grid place-items-center">
        {deleteIcon}
      </button>
    </div>
  )
})

export default TodoItem