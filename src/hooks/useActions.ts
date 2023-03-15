import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { AppActions } from "../store/actions";

export function useActions() {
  const dispatch = useDispatch();
  const AC = bindActionCreators(
    {
      ...AppActions,
    },
    dispatch
  );
  return AC;
}
