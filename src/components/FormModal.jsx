import { useState, memo, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import priorityList from "../data/priority";

import FormModalInputLabel from "./FormModalInputLabel"
import FormModalInput from "./FormModalInput"
import FormModalSubmitButton from "./FormModalSubmitButton"
import ListOption from './ListOption'
import FormModalTitle from "./FormModalTitle"
import FormModalCloseButton from "./FormModalCloseButton"

const FormModal = memo(({ isOpen, onClose, onSubmitTodo, editedTodo }) => {
  const [ name, setName ] = useState('')
  const [ priority, setPriority ] = useState('very-high')

  useEffect(() => {
    if(editedTodo) {
      setName(editedTodo.title)
      setPriority(editedTodo.priority)
    }
  }, [editedTodo])

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
          <FormModalTitle title="Tambah List Item" />
          <FormModalCloseButton onClose={onClose} />
        </header>
        <form className="p-8 grid gap-5">
          <div>
            <FormModalInputLabel title="Nama List Item" dataCy="modal-add-name-title" />
            <FormModalInput value={name} onInput={(e) => setName(e.target.value)} />
          </div>
          <div>
            <FormModalInputLabel title="Priority" dataCy="modal-add-priority-title" />
            <div className="w-1/3">
              <ListOption
                lists={priorityList}
                data={priority}
                onChange={setPriority}
              />
            </div>
          </div>
        </form>
        <footer className="px-8 py-6 border-t flex justify-end">
          <FormModalSubmitButton handleSubmit={handleSubmit} value={name} />
        </footer>
      </div>
    </Dialog>
    
  )
})

export default FormModal