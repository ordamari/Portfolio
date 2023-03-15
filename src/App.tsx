import { ThreeElements } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { MotionCanvas } from "framer-motion-3d";
import { Experience } from "./Experience/Experience";
import "./assets/styles/global.scss";

const frustum = 3;
function App() {
  const roomRef = useRef<ThreeElements["primitive"]>(null);
  const roomChildrenRefs = useRef<{ [key: string]: any }>({});
  return (
    <div className="App">
      <div className="experience">
        <Suspense>
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
            <Experience roomRef={roomRef} roomChildrenRefs={roomChildrenRefs} />
          </MotionCanvas>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
