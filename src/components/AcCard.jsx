import { memo } from "react";
import { Link } from "react-router-dom";

import AcCardTitle from './AcCardTitle'
import AcCardDate from './AcCardDate'
import AcCardDeleteButton from './AcCardDeleteButton'

const AcCard = memo(({ index, id, title, created_at, onDelete }) => {
  return (
    <Link to={`/detail/${id}`}>
      <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 h-56 flex flex-col mb-2 cursor-pointer" data-cy="activity-item" id={`itemTodo${index}`}>
        <div className="flex-grow">
          <AcCardTitle title={title} />
        </div>
        <div className="flex items-center justify-between">
          <AcCardDate date={created_at} />
          <AcCardDeleteButton onDelete={onDelete} />
        </div>
      </div>
    </Link>
  )
})

export default AcCard