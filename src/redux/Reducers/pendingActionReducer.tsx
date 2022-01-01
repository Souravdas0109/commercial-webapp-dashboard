import {
  SET_PENDING_ACTION,
  RESET_PENDING_ACTION,
} from "../Actions/PendingAction/Type";
const initpendingactionState = {
  pendingActionDetails: undefined,
  // firstName: "",
  // middleName:""
};
const pendingActionReducer = (state = initpendingactionState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PENDING_ACTION:
      return {
        pendingActionDetails: payload,
      };
    case RESET_PENDING_ACTION:
      return state;
    default:
      return state;
  }
};

export default pendingActionReducer;
