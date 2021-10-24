import { useEffect, useState, lazy, Suspense } from "react"
import { useParams } from "react-router-dom";
import axios from "axios"

import sorting from "../utils/sorting";
import todoEmptyState from "../assets/images/TodoEmptyState.svg"
import MainLayout from '../layouts/MainLayout'

const TodoSorter = lazy(() => import("../components/TodoSorter"))
const PageTitle = lazy(() => import('../components/PageTitle'))
const AddButton = lazy(() => import('../components/AddButton'))
const FormModal = lazy(() => import('../components/FormModal'))
const BackButton = lazy(() => import('../components/BackButton'))
const TodoItem = lazy(() => import('../components/TodoItem'))
const ModalDelete = lazy(() => import('../components/ModalDelete'))
const Alert = lazy(() => import('../components/Alert'))

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
    const { data } = await axios.get(
      `https://todo.api.devcode.gethired.id/activity-groups/${params.id}`
    )
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
    console.log(name, priority);
   if(!name) {
     alert('title belum diisi')
   } else {
    if(params.id) {
      const res = await axios.post("https://todo.api.devcode.gethired.id/todo-items", {
        activity_group_id: params.id, 
        title: name, 
        priority,
      })
      setTodos(todo => [res.data, ...todo])
      setOpenFormModal(false)
    }
   }
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
    try {
      await axios.delete(
        `https://todo.api.devcode.gethired.id/todo-items/${deleteTodoData.id}`
      )
      const newAc = todos.filter(ac => ac.id !== deleteTodoData.id)
      setTodos(newAc)
      setDeleteTodoData(null)
      setAlertMessage('Todo berhasil dihapus')
    } catch (error) {
      console.log(error)
    }
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
          <Suspense fallback={<div className="bg-white h-10 w-10"></div>}>
            <BackButton/>
          </Suspense>
          {!editActivityTitle 
            ? <Suspense fallback={<div className="bg-white h-3 w-64"></div>}> 
                <PageTitle onClick={() => setEditActivityTitle(true)} dataCy="todo-title">
                  {activityTitle}
                </PageTitle>
              </Suspense>
            : <input 
                onBlur={updateTitleActivity} 
                onInput={(e) => setActivityTitle(e.target.value)} 
                type="text"
                autoFocus
                className="text-3xl font-bold bg-transparent focus:outline-none focus:border-b-2 border-black"
                value={activityTitle} 
              />
          }
          <button onClick={editActivityTitle ? updateTitleActivity : () => setEditActivityTitle(true)} data-cy="todo-title-edit-button">
            <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 19.9998H8L18.5 9.49981C19.0304 8.96938 19.3284 8.24996 19.3284 7.49981C19.3284 6.74967 19.0304 6.03025 18.5 5.49981C17.9696 4.96938 17.2501 4.67139 16.5 4.67139C15.7499 4.67139 15.0304 4.96938 14.5 5.49981L4 15.9998V19.9998Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.5 6.49982L17.5 10.4998" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-5">
          <Suspense fallback={<div className="bg-white rounded-full h-10 w-10"></div>}>
            <TodoSorter selected={sortType} getValue={changeSortBy}/> 
          </Suspense>
          <Suspense fallback={<div className="bg-white rounded-md h-10 w-20"></div>}>
            <AddButton onClick={() => setOpenFormModal(true)} dataCy="todo-add-button" />
          </Suspense>
        </div>
      </div>
      {
        todos.length
        ? <div className="grid grid-cols-1 gap-3 pb-10">
            {todos.map(todo => (
              <Suspense key={todo.id} fallback={<div className="bg-white rounded-md h-12 w-full"></div>}>
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
        :  <div data-cy="todo-empty-state" className="text-center">
            <img src={todoEmptyState} width="500" height="500" alt="todo empty state" />
          </div>  
      }  

      <Suspense fallback={<div className="w-10 h-10 bg-white"></div>}>
        <FormModal
          isOpen={openFormModal}
          onClose={() => setOpenFormModal(false)}
          onSubmitTodo={createTodo}
        />
      </Suspense>

    {
      !!deleteTodoData &&
      <Suspense fallback={<div className="w-10 h-10 bg-white"></div>}>
        <ModalDelete
          data={deleteTodoData}
          onClose={() => setDeleteTodoData(null)}
          handleDelete={handleDeleteTodo}
        />
      </Suspense>
    }

    <Suspense fallback={<div className="w-10 h-10 bg-white"></div>}>
      <Alert 
        message={alertMessage}
        onClose={() => setAlertMessage('')}
      />
    </Suspense>
    </MainLayout>
  )
}

export default DetailItem
