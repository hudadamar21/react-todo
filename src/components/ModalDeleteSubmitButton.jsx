import { memo } from "react"

const ModalDeleteSubmitButton = memo(({ handleDelete }) => {
  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 px-6 py-3 rounded-full text-white" 
      data-cy="modal-delete-confirm-button"
    >
      Hapus
    </button>
  )
})

export default ModalDeleteSubmitButton