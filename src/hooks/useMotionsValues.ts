import { MotionValue, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export function useMotionsValues(
  motionsValues: MotionValue<number>[],
  initialValue: number = 0
) {
  const motionValue = useMotionValue(initialValue);
  useEffect(() => {
    function updateMotionValue(x: any) {
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
