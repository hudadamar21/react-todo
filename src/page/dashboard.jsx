// import axios from "axios"
import { useEffect, useState, lazy, Suspense } from "react"

import ModalDelete from "../components/ModalDelete"
import Alert from "../components/Alert"
import AddButton from "../components/AddButton"

const ActivityEmptyState = lazy(() => import("../components/ActivityEmptyState"))
const AcCard = lazy(() => import("../components/AcCard"))

function Home() {
  const [activity, setActivity ] = useState([])
  const [ deleteActivityData, setDeleteActivityData] = useState(null)
  const [ alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    getActivity()
    return () => setActivity([])
  }, [])

  const getActivity = async () => {
    const res = await fetch(
      "https://todo.api.devcode.gethired.id/activity-groups?email=hudadamar21%40gmail.com"
    )
    const data = await res.json()
    setActivity(data.data)
  }

  const createActivity = async () => {
    await fetch("https://todo.api.devcode.gethired.id/activity-groups", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: 'New Activity', 
        email: 'hudadamar21@gmail.com' 
      })
    })
    getActivity()
  }
  
  const openDeleteModal = (e, ac) => {
    e.preventDefault()
    e.stopPropagation()
    setDeleteActivityData(ac)
  }

  const handleDeleteActivity = async () => {
    await fetch(`https://todo.api.devcode.gethired.id/activity-groups/${deleteActivityData.id}`, {
      method: 'DELETE'
    })
    getActivity()
    setDeleteActivityData(null)
    setAlertMessage('Activity berhasil dihapus')
  }

  return (
    <section id="dashboard">
      <header className="bg-primary w-full">
        <div className="container py-8" data-cy="header-background">
          <h1 className="text-3xl font-bold text-white" data-cy="header-title">
            TO DO LIST APP
          </h1>
        </div>
      </header>
      <main className="container">
        <div className="flex items-center justify-between py-10">
          <h1 className="text-4xl font-bold" data-cy="activity-title">
            Activity
          </h1>
          <AddButton onClick={createActivity} dataCy="activity-add-button" />
        </div>
        {
          activity.length
          ? <div className="grid gap-3 pb-10 grid-cols-4">
              {activity.map((ac, index) => (
                <Suspense key={ac.id} fallback={<div className="bg-white rounded-xl w-full h-32"></div>}>
                  <AcCard 
                    key={ac.id} 
                    index={index} 
                    onDelete={(e) => openDeleteModal(e, ac)}
                    {...ac} 
                  />
                </Suspense>
              ))}
            </div>
          : <Suspense fallback={<div className="bg-gray-50 h-64 w-1/2"></div>}>
              <ActivityEmptyState/>
            </Suspense> 
        }

      {
        deleteActivityData &&
        <ModalDelete
          data={deleteActivityData}
          onClose={() => setDeleteActivityData(null)}
          handleDelete={handleDeleteActivity}
        />
      }

        <Alert 
          message={alertMessage}
          onClose={() => setAlertMessage('')}
        />
      </main>
    </section>
  )
}

export default Home