import { combineReducers } from "redux";
import { appReducer, appState } from "./app.reducer";

export interface State {
  app: appState;
}

const rootReducer = combineReducers<State>({
  app: appReducer,
});

export default rootReducer;
