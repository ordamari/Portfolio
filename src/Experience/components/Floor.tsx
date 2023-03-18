import { extend } from "@react-three/fiber";
import { MotionValue, useTransform } from "framer-motion";
import * as THREE from "three";
import { motion } from "framer-motion-3d";

extend(THREE);

type PrivateProps = {
  firstMoveProgress: MotionValue<number>;
  secondMoveProgress: MotionValue<number>;
  thirdMoveProgress: MotionValue<number>;
};

export function Floor({
  firstMoveProgress,
  secondMoveProgress,
  thirdMoveProgress,
}: PrivateProps) {
  const firstFloorScale = useTransform(firstMoveProgress, (v) => {
    const coefficient = 1 - v;
    return coefficient * 3;
  });
  const secondFloorScale = useTransform(secondMoveProgress, (v) => {
    const coefficient = 1 - v;
    return coefficient * 3;
  });
  const thirdFloorScale = useTransform(thirdMoveProgress, (v) => {
    const coefficient = 1 - v;
    return coefficient * 3;
  });

  return (
    <>
      <motion.mesh
        rotation-x={Math.PI * -0.5}
        scale={firstFloorScale}
        receiveShadow
        position-y={-0.29}
        name="circle-first"
      >
        <circleGeometry attach="geometry" args={[5, 64]} />
        <meshStandardMaterial attach="material" color="#404258" />
      </motion.mesh>
      <motion.mesh
        rotation-x={Math.PI * -0.5}
        scale={secondFloorScale}
        receiveShadow
        position-y={-0.28}
        position-x={1.5}
        name="circle-second"
      >
        <circleGeometry attach="geometry" args={[5, 64]} />
        <meshStandardMaterial attach="material" color="#474E68" />
      </motion.mesh>
      <motion.mesh
        rotation-x={Math.PI * -0.5}
        scale={thirdFloorScale}
        receiveShadow
        position-y={-0.27}
        name="circle-third"
      >
        <circleGeometry attach="geometry" args={[5, 64]} />
        <meshStandardMaterial attach="material" color="#50577A" />
      </motion.mesh>

      <mesh receiveShadow position-y={-0.3} rotation-x={Math.PI * -0.5}>
        <planeGeometry attach="geometry" args={[100, 100]} />
        <meshStandardMaterial attach="material" color="#edebec" />
      </mesh>
    </>
  );
}
