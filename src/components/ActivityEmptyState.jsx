import { memo } from "react";
import acEmptyState from "../assets/images/ActivityEmptyState.svg"

const ActivityEmptyState = memo(() => {
  return (
    <div className="text-center" data-cy="activity-empty-state">
      <img src={acEmptyState} width="500" height="500" alt="activity empty state"/>
    </div> 
  )
})

export default ActivityEmptyState