import { useState, lazy, Suspense } from "react";
import { memo } from 'react'
import { Dialog } from "@headlessui/react";
import priorityList from "../data/priority";

const FormModalInputLabel = lazy(() => import("./FormModalInputLabel"))
const FormModalInput = lazy(() => import("./FormModalInput"))
const FormModalSubmitButton = lazy(() => import("./FormModalSubmitButton"))

const ListOption = lazy(() => import('./ListOption'))
const FormModalTitle = lazy(() => import("./FormModalTitle"))
const FormModalCloseButton = lazy(() => import("./FormModalCloseButton"))

const FormModal = memo(({ isOpen, onClose, onSubmitTodo }) => {
  const [ name, setName ] = useState('')
  const [ priority, setPriority ] = useState('very-high')

  const handleSubmit = () => {
    onSubmitTodo(name, priority)
    setName('')
    setPriority('very-high')
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 grid place-items-center" >
      <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50 grid place-items-center"/>
      <div data-cy="modal-add" className="relative z-20 rounded-2xl w-full lg:w-[850px] bg-white">
        <header className="flex items-center justify-between px-8 py-6 w-full border-b">
          <Suspense fallback={<div className="bg-gray-200 h-8 w-full"></div>}>
            <FormModalTitle title=" Tambah List Item" />
          </Suspense>
          <Suspense fallback={<div className="bg-gray-200 h-5 w-5"></div>}>
            <FormModalCloseButton onClose={onClose} />
          </Suspense>
        </header>
        <form className="p-8 grid gap-5">
          <div>
            <Suspense fallback={<div className="bg-gray-200 h-5 w-full"></div>}>
              <FormModalInputLabel title="Nama List Item" dataCy="modal-add-name-title" />
            </Suspense>
            <Suspense fallback={<div className="bg-gray-200 h-10 w-full"></div>}>
              <FormModalInput value={name} onInput={(e) => setName(e.target.value)} />
            </Suspense>
          </div>
          <div>
            <Suspense fallback={<div className="bg-gray-200 h-5 w-full"></div>}>
              <FormModalInputLabel title="Priority" dataCy="modal-add-priority-title" />
            </Suspense>
            <div className="w-1/3">
              <Suspense fallback={<div className="bg-gray-200 h-10 w-full"></div>}>
                <ListOption
                  lists={priorityList}
                  data={priority}
                  onChange={setPriority}
                />
              </Suspense>
            </div>
          </div>
        </form>
        <footer className="px-8 py-6 border-t flex justify-end">
          <Suspense fallback={<div className="bg-gray-200 h-16 w-36"></div>}>
            <FormModalSubmitButton handleSubmit={handleSubmit} value={name} />
          </Suspense>
        </footer>
      </div>
    </Dialog>
    
  )
})

export default FormModal