import { useThree } from "@react-three/fiber";
import { MotionValue, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { assets } from "../assets/assets";
import { Status } from "../assets/types/status";
import { useRect } from "./useRect";
import { useSmoothTransform } from "./useSmoothTransform";
import { useToggle } from "./useToggle";

export function usePreloader(setStatus: (status: Status) => void) {
  const rect = useRect(document.body);
  const width = useMemo(() => {
    if (!rect) return 1;
    return rect.width;
  }, [rect]);
  const initialYRef = useRef(0);
  const [first, toggleFirst] = useToggle(false);
  const [second, toggleSecond] = useToggle(false);
  const [third, toggleThird] = useToggle(false);
  const [fourth, toggleFourth] = useToggle(false);
  const [fifth, toggleFifth] = useToggle(false);
  const [sixth, toggleSixth] = useToggle(false);
  const [seventh, toggleSeventh] = useToggle(false);

  useEffect(() => {
    setTimeout(() => {
      startListenToScroll();
      setStatus("WELCOME_MESSAGE");
    }, 2250);
  }, []);

  const startAnimation = () => {
    removeEventListeners();
    setStatus("START_FIRST");
    setTimeout(() => {
      firstAnimation();
    }, 1000);
  };

  const firstAnimation = () => {
    toggleFirst();
    setStatus("START_SECOND");
    setTimeout(() => {
      secondAnimation();
    }, 1000);
  };

  const secondAnimation = () => {
    setStatus("START_THIRD");
    toggleSecond();
    setTimeout(() => {
      thirdAnimation();
    }, 1000);
  };

  const thirdAnimation = () => {
    toggleThird();
    setStatus("START_FOURTH");
    setTimeout(() => {
      fourthAnimation();
    }, 1000);
  };

  const fourthAnimation = () => {
    toggleFourth();
    setStatus("START_FIFTH");
    setTimeout(() => {
      fifthAnimation();
    }, 1000);
  };

  const fifthAnimation = () => {
    toggleFifth();
    setStatus("START_SIXTH");
    setTimeout(() => {
      sixthAnimation();
    }, 1000);
  };

  const sixthAnimation = () => {
    toggleSixth();
    setStatus("START_SEVENTH");
    setTimeout(() => {
      seventhAnimation();
    }, 1000);
  };
  const seventhAnimation = () => {
    toggleSeventh();
    setStatus("START_EIGHTH");
    setTimeout(() => {
      setStatus("END_PRELOADER");
    }, 1000);
  };

  const removeEventListeners = () => {
    window.removeEventListener("wheel", onScroll);
    window.removeEventListener("touchstart", onTouch);
    window.removeEventListener("touchmove", onTouchMove);
  };

  const startListenToScroll = () => {
    window.addEventListener("wheel", onScroll);
    window.addEventListener("touchstart", onTouch);
    window.addEventListener("touchmove", onTouchMove);
  };

  function onScroll(e: WheelEvent) {
    if (e.deltaY > 0) {
      startAnimation();
    }
  }

  function onTouch(e: TouchEvent) {
    initialYRef.current = e.touches[0].clientY;
  }

  function onTouchMove(e: TouchEvent) {
    let currentY = e.touches[0].clientY;
    let diff = initialYRef.current - currentY;
    if (diff > 0) {
      startAnimation();
    }
  }

  return {
    first,
    second,
    third,
    fourth,
    fifth,
    sixth,
    seventh,
  };
}
