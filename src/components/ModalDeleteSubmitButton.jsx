import { memo } from "react"

const ModalDeleteSubmitButton = memo(({ handleDelete }) => {
  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 px-6 py-3 rounded-full text-white flex justify-center items-center gap-2 font-medium text-lg transition w-full bg-primary-red focus:ring-4 ring-red-500/30" 
      data-cy="modal-delete-confirm-button"
    >
      Hapus
    </button>
  )
})

export default ModalDeleteSubmitButton