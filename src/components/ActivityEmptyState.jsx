import { memo } from "react";

const ActivityEmptyState = memo(() => {
  return (
    <div className="flex justify-center" data-cy="activity-empty-state">
      <img src="https://cdn.statically.io/img/todo-app-b80c4.web.app/w=600,h=600/assets/activity-empty-state.ae3dae85.webp" alt="activity empty" width="600" height="600" />
    </div> 
  )
})

export default ActivityEmptyState