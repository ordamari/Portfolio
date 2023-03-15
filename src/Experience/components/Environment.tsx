import { motion } from "framer-motion-3d";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
extend(THREE);

const themes = {
  light: {
    color: "#ffffff",
    intensity: 1,
  },
  dark: {
    color: "#193296",
    intensity: 0.76,
  },
};

export function Environment({}) {
  // const theme = useSelector((state: State) => state.app.theme);
  const theme = "dark";
  return (
    <motion.group animate={theme}>
      <motion.ambientLight args={["#ffffff"]} variants={themes} intensity={1} />
      <motion.directionalLight
        args={["#ffffff", 1]}
        variants={themes}
        position={[0.6, 3.4, 1]}
        castShadow={true}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-near={0.1}
        shadow-normalBias={0.05}
      />
    </motion.group>
  );
}
