import { memo } from "react";
import alertIcon from "../assets/icons/alert.svg"

const AlertIcon = memo(() => {
  return <img src={alertIcon} width="25" height="25" data-cy="modal-information-icon" alt="alert" />
})

export default AlertIcon