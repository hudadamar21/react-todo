import { memo } from "react"

const ModalDeleteCancelButton = memo(({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="bg-gray-100 px-6 py-3 rounded-full text-white flex justify-center items-center gap-2 font-medium text-lg transition w-full focus:ring-4 ring-gray-200 text-black/80 " 
      data-cy="modal-delete-cancel-button"
    >
      Batal
    </button>
  )
})

export default ModalDeleteCancelButton