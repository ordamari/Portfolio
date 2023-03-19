import { useSelector } from "react-redux";
import { State } from "../../store/reducers";
export function Loader() {
  return (
    <div className={`loader`}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
