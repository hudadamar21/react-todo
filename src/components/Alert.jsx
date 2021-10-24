import { lazy, memo, Suspense } from 'react'
import { Dialog } from '@headlessui/react'

const AlertIcon = lazy(() => import('./AlertIcon'))

const Alert = memo(({ message , onClose}) => {
  return message &&
  <Dialog open={!!message} onClose={onClose} className="fixed inset-0 z-30 grid place-items-center">
    <Dialog.Overlay className="fixed z-10 inset-0 grid place-items-center bg-black/50"/>
    <div data-cy="modal-information" className="relative z-20 flex items-center gap-5 w-[500px] py-4 px-6 rounded-xl shadow-lg bg-white">
      <Suspense fallback={<div className="w-6 h-6 bg-gray-50"></div>}>
        <AlertIcon/>
      </Suspense>
      <Dialog.Title data-cy="modal-information-title">{message}</Dialog.Title>
    </div>
  </Dialog>
})

export default Alert