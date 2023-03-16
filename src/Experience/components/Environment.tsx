import { motion } from "framer-motion-3d";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { assets } from "../../assets/assets";
import { State } from "../../store/reducers";
import { Theme } from "../../assets/types/theme";
extend(THREE);

type PrivateProps = {
  theme: Theme;
};
export function Environment({ theme }: PrivateProps) {
  return (
    <motion.group animate={theme}>
      <motion.ambientLight
        args={["#ffffff"]}
        variants={assets.lightThemes}
        intensity={1}
      />
      <motion.directionalLight
        args={["#ffffff", 1]}
        variants={assets.lightThemes}
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
