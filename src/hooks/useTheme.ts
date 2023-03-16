import { useCallback, useEffect, useState } from "react";
import { Theme } from "../assets/types/theme";
import themeJson from "../assets/json/theme.json";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = useCallback((value: any) => {
    if (value === "light" || value === "dark") setTheme(value);
    else setTheme((theme) => (theme === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    Object.keys(themeJson[theme]).forEach((key: string) => {
      //@ts-ignore
      root.style.setProperty(key, themeJson[theme][key]);
    });
  }, [theme]);

  return [theme, toggleTheme] as const;
}
