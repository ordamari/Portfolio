import { useCallback, useState } from "react";

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback((newValue?: any) => {
    if (typeof newValue === "boolean") setValue(newValue);
    else setValue((value) => !value);
  }, []);
  return [value, toggle] as const;
}
