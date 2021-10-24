import { memo } from "react";

const FormModalInputLabel = memo(({title, dataCy}) => {
  return (
    <label className="block font-medium mb-3" data-cy={dataCy}>
      {title}
    </label>
  )
})

export default FormModalInputLabel