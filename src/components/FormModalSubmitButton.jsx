import { memo } from "react";

const FormModalSubmitButton = memo(({ handleSubmit, value }) => {
  return (
    <button
      onClick={handleSubmit}
      className="bg-primary py-4 w-32 rounded-full text-white"
      disabled={!value}
      data-cy="modal-add-save-button"
    >
      Simpan
    </button>
  )
})

export default FormModalSubmitButton