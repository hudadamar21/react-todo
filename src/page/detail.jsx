import { useEffect, useState, lazy, Suspense } from "react"
import { useParams } from "react-router-dom";
import axios from "axios"

import sorting from "../utils/sorting";
import MainLayout from '../layouts/MainLayout'
import ModalDelete from '../components/ModalDelete'
import FormModal from '../components/FormModal'
import Alert from '../components/Alert'
import PageTitle from '../components/PageTitle'
import TodoSorter from "../components/TodoSorter"
import AddButton from '../components/AddButton'
import BackButton from '../components/BackButton'

const TodoEmptyState = lazy(() => import("../components/TodoEmptyState"))
const TodoItem = lazy(() => import('../components/TodoItem'))

function DetailItem() {
  const [ todos, setTodos ] = useState([])
  const [ activityTitle, setActivityTitle ] = useState('')
  const [ editActivityTitle, setEditActivityTitle ] = useState(false)

  const [ sortType, setSortType ] = useState('Terbaru')
  const [ deleteTodoData, setDeleteTodoData ] = useState(null)
  const [ openFormModal, setOpenFormModal ] = useState(false)
  const [ alertMessage, setAlertMessage] = useState(null)

  let params = useParams();

  useEffect( async () => {
    const res = await fetch(
      `https://todo.api.devcode.gethired.id/activity-groups/${params.id}`
    )
    const data = await res.json()
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

  const createTodo = async (name, priority) => {
    const res = await axios.post("https://todo.api.devcode.gethired.id/todo-items", {
      activity_group_id: params.id, 
      title: name, 
      priority,
    })
    setTodos(todo => [res.data, ...todo])
    setOpenFormModal(false)
  }

  const openDeleteModal = (todo) => {
    setDeleteTodoData(todo)
  }

  const handleChangeIsActive = async (id, data) => {
    const res = await updateTodo(id, data)
    setTodos(todos => todos.map(todo => {
      return todo.id === id ? { ...todo, is_active: res.data.is_active } : todo
    }))
  }

  const handleDeleteTodo = async () => {
    await axios.delete(
      `https://todo.api.devcode.gethired.id/todo-items/${deleteTodoData.id}`
    )
    const newAc = todos.filter(ac => ac.id !== deleteTodoData.id)
    setTodos(newAc)
    setDeleteTodoData(null)
    setAlertMessage('Todo berhasil dihapus')
  }

  const updateTodo = async (id, data) => {
    return await axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${id}`, data)
  }

  const updateTitleActivity = async () => {
    const { data } = await axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${params.id}`, { title: activityTitle })
    console.log(data);
    setActivityTitle(data.title)
    setEditActivityTitle(false)
  }

  return (
    <MainLayout>
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
          <TodoSorter selected={sortType} getValue={changeSortBy}/> 
          <AddButton onClick={() => setOpenFormModal(true)} dataCy="todo-add-button" />
        </div>
      </div>
      {
        todos.length
        ? <div>
            {todos.map(todo => (
              <Suspense key={todo.id} fallback={<div className="bg-gray-50 rounded-md h-12 w-full"></div>}>
                <TodoItem 
                  key={todo.id}
                  todo={todo}
                  onDelete={openDeleteModal}
                  onChangeIsActive={() => 
                    handleChangeIsActive(todo.id, { is_active: !todo.is_active})
                  }
                />
              </Suspense>
            ))}  
          </div>
        : <Suspense fallback={<div className="bg-gray-50 h-64 w-1/2"></div>}>
            <TodoEmptyState/>
          </Suspense> 
      } 

      <FormModal
        isOpen={openFormModal}
        onClose={() => setOpenFormModal(false)}
        onSubmitTodo={createTodo}
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
    </MainLayout>
  )
}

export default DetailItem