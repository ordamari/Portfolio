import { MotionValue, useSpring, useTransform } from "framer-motion";
const springOptions = { stiffness: 600, damping: 30 };
export function useSmoothTransform(
  value: MotionValue<number>,
  transformer: (number: number) => number
) {
  return useSpring(
    useTransform(value, transformer),
    springOptions
  ) as MotionValue<number>;
}
