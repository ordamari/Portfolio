import { Moon } from "../../assets/svgs/Moon";
import { Sun } from "../../assets/svgs/Sun";
import { Theme } from "../../assets/types/theme";

type PrivateProps = {
  theme: Theme;
  toggleTheme: (value: any) => void;
};

export function ToggleTheme({ theme, toggleTheme }: PrivateProps) {
  return (
    <div className="toggle-bar">
      <div className="sun-wrapper">
        <Sun />
      </div>
      <button onClick={toggleTheme} className="toggle-button">
        <div className={`toggle-circle ${theme}`}></div>
      </button>
      <div className="moon-wrapper">
        <Moon />
      </div>
    </div>
  );
}
