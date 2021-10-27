import { Suspense, useEffect, useState, lazy } from "react"
import { useParams } from "react-router-dom";
import sorting from "../utils/sorting";
import ModalDelete from '../components/ModalDelete'
import FormModal from '../components/FormModal'
import Alert from '../components/Alert'

import useTodos from "../services/useTodos"
import useActivity from "../services/useActivity"
import BackButton from '../components/BackButton'
import PageTitle from '../components/PageTitle'
import TodoItem from '../components/TodoItem'
import TodoSorter from "../components/TodoSorter"
import AddButton from '../components/AddButton'

const TodoEmptyState = lazy(() => import("../components/TodoEmptyState"))

function DetailItem() {
  const [ todos, setTodos ] = useState([])
  const [ activityTitle, setActivityTitle ] = useState('')
  const [ editActivityTitle, setEditActivityTitle ] = useState(false)
  const [ editedTodo, setEditedTodo ] = useState(null)

  const [ sortType, setSortType ] = useState('Terbaru')
  const [ deleteTodoData, setDeleteTodoData ] = useState(null)
  const [ openFormModal, setOpenFormModal ] = useState(false)
  const [ alertMessage, setAlertMessage] = useState(null)

  const Todo = useTodos()
  const Activity = useActivity()
  let params = useParams();

  useEffect( async () => {
    const data = await Todo.get(params.id)
    setActivityTitle(data.title)
    setTodos(data.todo_items)

    return () => {
      setActivityTitle('')
      setTodos([])
    }
  }, [])

  const changeSortBy = (value) => {
    setSortType(value)
    setTodos(sorting(todos, value))
  }

  const submitTodo = async (name, priority) => {
    const todoData = {
      activity_group_id: params.id, 
      title: name, 
      priority
    }
    if(!!editedTodo) {
      const resdata = await Todo.update(editedTodo.id, todoData)
      const updatedTodo = todos.map(todo => todo.id === editedTodo.id ? resdata : todo)
      setTodos(updatedTodo)
    } else {
      const data = await Todo.create({activity_group_id: params.id, title: name, priority})
      setTodos(todo => [data, ...todo])
    }
    setOpenFormModal(false)
  }

  const openDeleteModal = (todo) => {
    setDeleteTodoData(todo)
  }

  const handleDeleteTodo = async () => {
    await Todo.remove(deleteTodoData.id)
    const newAc = todos.filter(todo => todo.id !== deleteTodoData.id)
    setTodos(newAc)
    setDeleteTodoData(null)
    setAlertMessage('Todo berhasil dihapus')
  }

  const handleChangeIsActive = async (id, data) => {
    const resData = await Todo.update(id, data)
    setTodos(todos => todos.map(todo => 
      todo.id === id ? { ...todo, is_active: resData.is_active } : todo
    ))
  }

  const handleEditTodo = (todo) => {
    setEditedTodo(todo)
    setOpenFormModal(true)
  }

  const updateTitleActivity = async () => {
    const data = await Activity.update(params.id, { title: activityTitle })
    setActivityTitle(data.title)
    setEditActivityTitle(false)
  }

  return <>
    <div className="flex items-center justify-between py-10">
      <div className="flex items-center gap-3">
        <BackButton/>
        {!editActivityTitle 
          ? <PageTitle onClick={() => setEditActivityTitle(true)} dataCy="todo-title">
              {activityTitle}
            </PageTitle>
          : <input 
              onBlur={updateTitleActivity} 
              onInput={(e) => setActivityTitle(e.target.value)} 
              type="text"
              autoFocus
              className="text-4xl font-bold bg-transparent focus:outline-none focus:border-b-2 border-black"
              value={activityTitle} 
            />
        }
        <button onClick={editActivityTitle ? updateTitleActivity : () => setEditActivityTitle(true)} data-cy="todo-title-edit-button">
          <svg className="w-7 h-7" viewBox="0 0 24 24"><path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z" fill="#666"></path></svg>
        </button>
      </div>
      <div className="flex items-center gap-5">
        <Suspense fallback={<div></div>}>
          <TodoSorter selected={sortType} getValue={changeSortBy}/> 
          <AddButton onClick={() => setOpenFormModal(true)} dataCy="todo-add-button" />
        </Suspense>
      </div>
    </div>
    {
      todos.length
      ? <div>
          {todos.map(todo => (
            <TodoItem 
              key={todo.id}
              todo={todo}
              onEdit={handleEditTodo}
              onDelete={openDeleteModal}
              onChangeIsActive={() => 
                handleChangeIsActive(todo.id, { is_active: !todo.is_active})
              }
            />
          ))}  
        </div>
      : <Suspense fallback={<div></div>}><TodoEmptyState/></Suspense>
    } 

    <FormModal
      isOpen={openFormModal}
      editedTodo={editedTodo}
      onClose={() => setOpenFormModal(false)}
      onSubmitTodo={submitTodo}
    />  

    {
      !!deleteTodoData &&
      <ModalDelete
        data={deleteTodoData}
        onClose={() => setDeleteTodoData(null)}
        handleDelete={handleDeleteTodo}
      />
    }

    <Alert 
      message={alertMessage}
      onClose={() => setAlertMessage('')}
    />  
  </>
}

export default DetailItem