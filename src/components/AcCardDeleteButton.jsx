import { memo } from "react";

const AcCardDeleteButton = memo(({ onDelete }) => {
  const deleteIcon = <svg className="w-6 h-6" viewBox="0 0 24 24" ><path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8z" fill="#666"></path></svg>

  return (
    <button onClick={onDelete} data-cy="activity-item-delete-button">
      {deleteIcon}
    </button>
  )
})

export default AcCardDeleteButton