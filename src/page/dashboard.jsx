import { useEffect, useState, lazy } from "react"

import acEmptyState from "../assets/images/ActivityEmptyState.svg"
const AcCard = lazy(() => import("../components/AcCard"))
const ModalDelete = lazy(() => import("../components/ModalDelete"))
const Alert = lazy(() => import("../components/Alert"))

export default function Home() {
  const [activity, setActivity ] = useState([])
  const [ deleteActivityData, setDeleteActivityData] = useState(null)
  const [ alertMessage, setAlertMessage] = useState(null)

  useEffect( async () => {
    try {
      const res = await fetch(
        "https://todo.api.devcode.gethired.id/activity-groups?email=hudadamar21%40gmail.com"
      )
      const data = await res.json()
      setActivity(data.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const getActivity = async () => {
    const res = await fetch(
      "https://todo.api.devcode.gethired.id/activity-groups?email=hudadamar21%40gmail.com"
    )
    const data = await res.json()
    setActivity(data.data)
  }

  const createActivity = async () => {
    try {
      const res = await fetch("https://todo.api.devcode.gethired.id/activity-groups", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: 'New Activity', 
          email: 'hudadamar21@gmail.com' 
        })
      })
      const data = await res.json()
      setActivity(val => [data, ...val])
    } catch (error) {
      console.log(error);
    }
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
          <button onClick={createActivity} className="flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-bold text-xl" data-cy="activity-add-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="white" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Tambah
          </button>
        </div>
        {
          activity.length
          ? <div className="grid gap-3 pb-10 grid-cols-4">
              {activity.map((ac, index) => (
                <AcCard 
                  key={ac.id} 
                  index={index} 
                  onDelete={(e) => openDeleteModal(e, ac)}
                  {...ac} 
                />
              ))}
            </div>
          : <div className="text-center" data-cy="activity-empty-state">
              <img src={acEmptyState} width="500" height="500" alt="activity empty state"/>
            </div> 
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
