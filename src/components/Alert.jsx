import { memo } from 'react'
import { Dialog } from '@headlessui/react'

import AlertIcon from './AlertIcon'

const Alert = memo(({ message , onClose}) => {
  return message &&
  <Dialog open={!!message} onClose={onClose} className="fixed inset-0 z-30 grid place-items-center">
    <Dialog.Overlay className="fixed z-10 inset-0 bg-black/50"/>
    <div data-cy="modal-information" className="relative z-20 flex items-center gap-5 w-[500px] py-4 px-6 rounded-xl shadow-lg bg-white">
      <AlertIcon/>
      <Dialog.Title data-cy="modal-information-title">{message}</Dialog.Title>
    </div>
  </Dialog>
})

export default Alert