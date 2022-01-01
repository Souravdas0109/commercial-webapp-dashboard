import { RESET_PENDING_ACTION, SET_PENDING_ACTION } from "./Type";
export const set_pendingAction = (data: any) => {
  return {
    type: SET_PENDING_ACTION,
    payload: data,
  };
};
export const reset_pendingAction = () => {
  return {
    type: RESET_PENDING_ACTION,
  };
};
