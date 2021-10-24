import { lazy, memo, Suspense } from "react";
import { Link } from "react-router-dom";

const AcCardTitle = lazy(() => import('./AcCardTitle'))
const AcCardDate = lazy(() => import('./AcCardDate'))
const AcCardDeleteButton = lazy(() => import('./AcCardDeleteButton'))

const AcCard = memo(({ index, id, title, created_at, onDelete }) => {
  return (
    <Link to={`/detail/${id}`}>
      <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 h-56 flex flex-col mb-2 cursor-pointer" data-cy="activity-item" id={`itemTodo${index}`}>
        <div className="flex-grow">
          <Suspense fallback={<div className="w-full h-5 bg-gray-50"></div>}>
            <AcCardTitle title={title} />
          </Suspense>
        </div>
        <div className="flex items-center justify-between">
        <Suspense fallback={<div className="w-10 h-5 bg-gray-50"></div>}>
          <AcCardDate date={created_at} />
        </Suspense>
        <Suspense fallback={<div className="w-10 h-5 bg-gray-50"></div>}>
          <AcCardDeleteButton onDelete={onDelete} />
        </Suspense>
        </div>
      </div>
    </Link>
  )
})

export default AcCard