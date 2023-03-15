import { Dispatch } from "react";
import { Status } from "../../assets/types/status";
import { AppActionTypes, SetStatus } from "../store-types/appActions";

export function setStatus(status: Status) {
  return async (dispatch: Dispatch<SetStatus>) => {
    try {
      dispatch({
        type: AppActionTypes.setStatus,
        payload: {
          status,
        },
      });
    } catch (err) {
      console.log(`AppActions: err in update status ${status}`, err);
    }
  };
}
