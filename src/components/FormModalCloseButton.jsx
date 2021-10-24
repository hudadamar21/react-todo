import { memo } from "react";

const FormModalCloseButton = memo(({ onClose }) => {
  return (
    <button onClick={onClose} className="text-gray-400 hover:text-gray-500" data-cy="modal-add-close-button">
      X
    </button>
  )
})

export default FormModalCloseButton