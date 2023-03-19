import { Status } from "../../assets/types/status";
import { SpansText } from "./SpansText";

type privateProps = {
  status: Status;
};

export function Welcome({ status }: privateProps) {
  const getSpanClass = () => {
    switch (status) {
      case "PENDING":
        return "hide";
      case "LOAD_ROOM":
        return "in";
      case "WELCOME_MESSAGE":
        return "show";
      case "START_FIRST":
        return "out";
      default:
        return "hide";
    }
  };

  return (
    <div className="welcome">
      <SpansText spanClass={getSpanClass()} text="Welcome to my portfolio!" />
    </div>
  );
}
