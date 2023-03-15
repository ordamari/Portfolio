import { Status } from "../../assets/types/status";

export enum AppActionTypes {
  example = "example",
  setStatus = "setStatus",
}

export type SetStatus = {
  type: AppActionTypes.setStatus;
  payload: {
    status: Status;
  };
};

export type AppActions = SetStatus;
