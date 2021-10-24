import { memo } from "react";

const FormModalInput = memo(({ onInput, value }) => {
  return (
    <input 
      className="px-5 py-4 w-full rounded-lg border" 
      type="text"
      value={value}
      onInput={onInput}
      placeholder="Tambahkan Nama Activity" 
      data-cy="modal-add-name-input"
    />
  )
})

export default FormModalInput