type SectionPrivateProps = {
  children: React.ReactNode;
  sectionClass?: string;
  side: "left" | "right";
};

type IntroPrivateProps = {
  children: React.ReactNode;
  number: number;
};

type DetailPrivateProps = {
  children: React.ReactNode;
};

export function Section({
  children,
  sectionClass = "section",
  side,
}: SectionPrivateProps) {
  return (
    <section className={`${sectionClass} ${side} section`}>
      <div className={`progress-wrapper progress-bar-wrapper-${side}`}>
        <div className="progress-bar"></div>
      </div>
      {children}
    </section>
  );
}

Section.Intro = function SectionIntro({ children, number }: IntroPrivateProps) {
  return (
    <div className="section-intro-wrapper">
      <h1 className="section-title">
        <span className="section-title-text">{children}</span>
        <div className="section-title-decoration style-one" />
        <div className="section-title-decoration style-two" />
        <div className="section-title-decoration style-three" />
      </h1>
      <span className="section-number">0{number}</span>
    </div>
  );
};

Section.Detail = function SectionDetail({ children }: DetailPrivateProps) {
  return <div className="section-detail-wrapper">{children}</div>;
};
