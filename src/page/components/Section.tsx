import { useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { useRef } from "react";
import { assets } from "../../assets/assets";

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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scrollTopBorderRadius } = useScroll({
    target: ref,
    offset: assets.sectionTopScrollOffset,
  });
  const { scrollYProgress: scrollBottomBorderRadius } = useScroll({
    target: ref,
    offset: assets.sectionBottomScrollOffset,
  });
  const { scrollYProgress: scrollProgressBar } = useScroll({
    target: ref,
    offset: assets.scrollOffset,
  });

  const progressBarScaleY = useTransform(scrollProgressBar, (v) => {
    return 1 - v;
  });

  const borderRadiusTop = useTransform(scrollTopBorderRadius, (v) => {
    return 700 - v * 690;
  });

  const borderRadiusBottom = useTransform(scrollBottomBorderRadius, (v) => {
    return 10 + v * 690;
  });

  const progressBarTop = useTransform(scrollProgressBar, (v) => {
    return (1 - v) * 100;
  });

  const progressBarTransform = useMotionTemplate`scaleY(${progressBarScaleY}) translateY(-100%)`;
  const progressBarTopPercent = useMotionTemplate`${progressBarTop}%`;

  return (
    <motion.section
      style={
        side === "right"
          ? {
              borderTopLeftRadius: borderRadiusTop,
              borderBottomLeftRadius: borderRadiusBottom,
            }
          : {
              borderTopRightRadius: borderRadiusTop,
              borderBottomRightRadius: borderRadiusBottom,
            }
      }
      ref={ref}
      className={`${sectionClass} ${side} section`}
    >
      <motion.div
        style={{
          top: progressBarTopPercent,
        }}
        className={`progress-wrapper progress-bar-wrapper-${side}`}
      >
        <motion.div
          style={{
            transform: progressBarTransform,
          }}
          className="progress-bar"
        ></motion.div>
      </motion.div>
      {children}
    </motion.section>
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
