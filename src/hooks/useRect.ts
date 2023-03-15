import { useEffect, useRef, useState } from "react";

export function useRect(element: HTMLElement | null = null) {
  const [rect, setRect] = useState<DOMRect | null>(
    element?.getBoundingClientRect() ?? null
  );
  const resizeObserver = useRef<ResizeObserver>();

  useEffect(() => {
    if (element === null) return;
    const currRect = element.getBoundingClientRect();
    setRect(currRect);

    resizeObserver.current = new ResizeObserver(() => {
      if (!element) return;
      const currRect = element.getBoundingClientRect();
      setRect(currRect);
    });
    resizeObserver.current.observe(element);
    return () => {
      if (resizeObserver.current) resizeObserver.current.disconnect();
    };
  }, [element]);

  return rect;
}
