import { Status } from "../../assets/types/status";
import { Theme } from "../../assets/types/theme";
import { AppActions, AppActionTypes } from "../store-types/appActions";

export type appState = {
  theme: Theme;
  status: Status;
  aboutSectionScrollProgress: number;
  workSectionScrollProgress: number;
  contactSectionScrollProgress: number;
};

const initialState: appState = {
  theme: "light",
  status: "pending",
  aboutSectionScrollProgress: 0,
  workSectionScrollProgress: 0,
  contactSectionScrollProgress: 0,
};

export const appReducer = (
  state: appState = initialState,
  action: AppActions
) => {
  switch (action.type) {
    case AppActionTypes.setStatus:
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
};
