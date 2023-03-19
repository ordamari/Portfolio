import { MotionValue, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

export function useMotionsValues(
  motionsValues: MotionValue<number>[],
  initialValue: number = 0
) {
  const firstFlagRef = useRef(false);
  const motionValue = useMotionValue(initialValue);
  useEffect(() => {
    function updateMotionValue(x: any) {
      if (!firstFlagRef.current) {
        firstFlagRef.current = true;
        return 0;
      }
      console.log(x);

      motionValue.set(x);
    }
    const unsubscribes = motionsValues.map((motionValueItem) => {
      return motionValueItem.on("change", updateMotionValue);
    });

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return motionValue;
}
