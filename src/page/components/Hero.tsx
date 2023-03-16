import { ExpandMore } from "../../assets/svgs/ExpandMore";
import { SpansText } from "./SpansText";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-wrapper">
        <div className="hero-main">
          <h1 className="hero-main-title">
            <SpansText text="Or Damari" />
          </h1>
          <p className="hero-main-description">
            <SpansText text="FullStack Developer" />
          </p>
        </div>
        <div className="hero-second">
          <p className="hero-second-subheading first-sub">
            <SpansText text="Or Damari" />
          </p>
          <p className="hero-second-subheading second-sub">
            <SpansText text="Portfolio" />
          </p>
        </div>
      </div>
      <div className="arrow-svg-wrapper">
        <ExpandMore />
      </div>
    </section>
  );
}
