import { ExpandMore } from "../../assets/svgs/ExpandMore";
import { Status } from "../../assets/types/status";
import { SpansText } from "./SpansText";

type PrivateProps = {
  status: Status;
};

export function Hero({ status }: PrivateProps) {
  const getSpanClass = () => {
    switch (status) {
      case "PENDING":
      case "LOAD_ROOM":
      case "WELCOME_MESSAGE":
      case "START_FIRST":
      case "START_SECOND":
        return "hide";
      case "START_THIRD":
        return "in";
      default:
        return "show";
    }
  };

  const isShowArrow =
    status === "WELCOME_MESSAGE" || status === "END_PRELOADER";
  return (
    <section className="hero">
      <div className="hero-wrapper">
        <div className="hero-main">
          <h1 className="hero-main-title">
            <SpansText spanClass={getSpanClass()} text="Or Damari" />
          </h1>
          <p className="hero-main-description">
            <SpansText spanClass={getSpanClass()} text="FullStack Developer" />
          </p>
        </div>
        <div className="hero-second">
          <p className="hero-second-subheading first-sub">
            <SpansText spanClass={getSpanClass()} text="Or Damari" />
          </p>
          <p className="hero-second-subheading second-sub">
            <SpansText spanClass={getSpanClass()} text="Portfolio" />
          </p>
        </div>
      </div>
      <div className={`arrow-svg-wrapper ${isShowArrow ? "show" : "hide"}`}>
        <ExpandMore />
      </div>
    </section>
  );
}
