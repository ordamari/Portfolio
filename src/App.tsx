import { ThreeElements } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { MotionCanvas } from "framer-motion-3d";
import { Experience } from "./Experience/Experience";
import "./assets/styles/global.scss";
import { MotionConfig, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";
import { assets } from "./assets/assets";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useTheme } from "./hooks/useTheme";
import { Page } from "./page/Page";
import { useScroll } from "framer-motion";

const frustum = 3;
function App() {
  const roomRef = useRef<THREE.Group>(null);
  const roomChildrenRefs = useRef<{ [key: string]: any }>({});
  const mouseX = useMotionValue(0);
  const [ref, bounds] = useMeasure({ scroll: false });
  const [theme, toggleTheme] = useTheme();
  const firstMoveRef = useRef<HTMLDivElement>(null);
  const secondMoveRef = useRef<HTMLDivElement>(null);
  const thirdMoveRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: firstMoveProgress } = useScroll({
    target: firstMoveRef,
    offset: assets.scrollOffset,
  });
  const { scrollYProgress: secondMoveProgress } = useScroll({
    target: secondMoveRef,
    offset: assets.scrollOffset,
  });
  const { scrollYProgress: thirdMoveProgress } = useScroll({
    target: thirdMoveRef,
    offset: assets.scrollOffset,
  });

  return (
    <div
      ref={ref}
      className="App"
      onPointerMove={(e: any) => {
        mouseX.set(e.clientX - bounds.x - bounds.width / 2);
      }}
    >
      <div className="experience">
        <MotionConfig transition={assets.transition}>
          <MotionCanvas
            orthographic
            camera={{
              near: -50,
              far: 50,
              position: [0, 5.65, 10],
              top: frustum,
              bottom: -frustum,
              left: -frustum,
              right: frustum,
              zoom: 150,
            }}
            shadows
          >
            <Experience
              mouseX={mouseX}
              roomRef={roomRef}
              roomChildrenRefs={roomChildrenRefs}
              theme={theme}
              firstMoveProgress={firstMoveProgress}
              secondMoveProgress={secondMoveProgress}
              thirdMoveProgress={thirdMoveProgress}
            />
          </MotionCanvas>
        </MotionConfig>
      </div>
      <Page
        firstMoveRef={firstMoveRef}
        secondMoveRef={secondMoveRef}
        thirdMoveRef={thirdMoveRef}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  );
}

export default App;
