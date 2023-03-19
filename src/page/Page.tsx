import { Status } from "../assets/types/status";
import { Theme } from "../assets/types/theme";
import { About } from "./components/About";
import { ContactMe } from "./components/ContactMe";
import { Hero } from "./components/Hero";
import { Loader } from "./components/Loader";
import { MyWorks } from "./components/MyWorks";
import { ToggleTheme } from "./components/ToggleTheme";
import { Welcome } from "./components/Welcome";

type PrivateProps = {
  theme: Theme;
  toggleTheme: (value: any) => void;
  firstMoveRef: React.RefObject<HTMLDivElement>;
  secondMoveRef: React.RefObject<HTMLDivElement>;
  thirdMoveRef: React.RefObject<HTMLDivElement>;
  status: Status;
};

export function Page({
  theme,
  toggleTheme,
  firstMoveRef,
  secondMoveRef,
  thirdMoveRef,
  status,
}: PrivateProps) {
  return (
    <div className={`page ${status}`}>
      <Loader />
      <Welcome status={status} />
      <ToggleTheme theme={theme} toggleTheme={toggleTheme} />
      <Hero status={status} />
      <div ref={firstMoveRef} className="section-margin" />
      <About />
      <div ref={secondMoveRef} className="section-margin" />
      <MyWorks />
      <div ref={thirdMoveRef} className="section-margin" />
      <ContactMe />
    </div>
  );
}
