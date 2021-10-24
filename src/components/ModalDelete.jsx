import { Dialog } from '@headlessui/react'
import { lazy, memo, Suspense } from 'react'

const ModalDeleteIcon = lazy(() => import('./ModalDeleteIcon'))
import ModalDeleteCancelButton from './ModalDeleteCancelButton'
import ModalDeleteSubmitButton from './ModalDeleteSubmitButton'

const ModalDelete = memo(({ data, handleDelete, onClose }) => {
  return (
    <Dialog open={!!data} onClose={onClose} className="fixed inset-0 z-50 grid place-items-center" >
      <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50 grid place-items-center"/>
      <div className="relative grid place-items-center bg-white p-12 pt-16 rounded-2xl z-20" data-cy="modal-delete">
        <Suspense fallback={<div className="bg-gray-50 rounded-full h-32 w-32"></div>}>
          <ModalDeleteIcon/>
        </Suspense>

        <Dialog.Title className="text-xl w-full text-center py-10" data-cy="modal-delete-title">
          Apakah anda yakin menghapus activity
          <span className="font-bold"> “{data.title}”?</span> 
        </Dialog.Title>

        <div className="grid grid-flow-col gap-5 w-full px-10">
          <ModalDeleteCancelButton onClose={onClose} />
          <ModalDeleteSubmitButton handleDelete={handleDelete} />
        </div>
      </div>
    </Dialog>
  )
})

export default ModalDelete