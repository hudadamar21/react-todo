import { memo } from "react";

const FormModalSubmitButton = memo(({ handleSubmit, value }) => {
  return (
    <button
      onClick={handleSubmit}
      className="bg-primary py-4 rounded-full text-white text-lg font-semibold w-36 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 ring-primary/30 disabled:bg-opacity-60 transition"
      disabled={!value}
      data-cy="modal-add-save-button"
    >
      Simpan
    </button>
  )
})

export default FormModalSubmitButton