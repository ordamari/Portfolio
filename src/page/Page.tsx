import { Theme } from "../assets/types/theme";
import { About } from "./components/About";
import { ContactMe } from "./components/ContactMe";
import { Hero } from "./components/Hero";
import { MyWorks } from "./components/MyWorks";
import { ToggleTheme } from "./components/ToggleTheme";

type PrivateProps = {
  theme: Theme;
  toggleTheme: (value: any) => void;
  firstMoveRef: React.RefObject<HTMLDivElement>;
  secondMoveRef: React.RefObject<HTMLDivElement>;
  thirdMoveRef: React.RefObject<HTMLDivElement>;
};

export function Page({
  theme,
  toggleTheme,
  firstMoveRef,
  secondMoveRef,
  thirdMoveRef,
}: PrivateProps) {
  return (
    <div className="page">
      <ToggleTheme theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <div ref={firstMoveRef} className="section-margin" />
      <About />
      <div ref={secondMoveRef} className="section-margin" />
      <MyWorks />
      <div ref={thirdMoveRef} className="section-margin" />
      <ContactMe />
    </div>
  );
}
