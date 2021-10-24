import { memo } from "react"

const ModalDeleteCancelButton = memo(({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="bg-gray-50 px-6 py-3 rounded-full" 
      data-cy="modal-delete-cancel-button"
    >
      Batal
    </button>
  )
})

export default ModalDeleteCancelButton