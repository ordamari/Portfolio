import { useGLTF } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo } from "react";
import { useActions } from "../../hooks/useActions";
import { useRect } from "../../hooks/useRect";
import { motion } from "framer-motion-3d";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { MotionValue, useMotionValue, useTransform } from "framer-motion";
import useMeasure from "react-use-measure";
import { useSmoothTransform } from "../../hooks/useSmoothTransform";
extend(THREE);

type PrivateProps = {
  roomRef: React.RefObject<ThreeElements["primitive"]>;
  roomChildrenRefs: React.RefObject<{ [key: string]: any }>;
  mouseX: MotionValue<number>;
  firstMoveProgress: MotionValue<number>;
  secondMoveProgress: MotionValue<number>;
  thirdMoveProgress: MotionValue<number>;
};

const baseRotation = -Math.PI / 4;
export function Room({
  roomRef,
  roomChildrenRefs,
  mouseX,
  firstMoveProgress,
  secondMoveProgress,
  thirdMoveProgress,
}: PrivateProps) {
  const room = useGLTF("./models/room.glb");
  const rect = useRect(document.body);
  const width = rect ? rect.width : 1;

  const mouseToLightRotation = useCallback(
    (v: number) => {
      return (v / width) * 0.1 + baseRotation;
    },
    [rect]
  );

  const roomTargetX = useMemo(() => {
    return width * 0.0014;
  }, [rect]);

  const RotateY = useTransform(mouseX, mouseToLightRotation);
  const position = useTransform(
    firstMoveProgress,
    [0, 0, 0],
    [roomTargetX, 0, 0]
  );
  // const AC = useActions();
  useEffect(() => {
    if (!roomRef.current || !rect) return;
    if (rect.width < 960) {
      roomRef.current.scale.set(0.07, 0.07, 0.07);
    } else {
      roomRef.current.scale.set(0.11, 0.11, 0.11);
    }
  }, [rect]);

  // useEffect(() => {
  //   if (!roomRef.current || !roomChildrenRefs.current) return;
  //   AC.setStatus("load room");
  //   roomRef.current.children.forEach((child: any) => {
  //     child.castShadow = true;
  //     child.receiveShadow = true;
  //     if (roomChildrenRefs.current)
  //       roomChildrenRefs.current[child.name.toLowerCase()] = child;
  //     child.scale.set(0, 0, 0);
  //     if (child.name === "floor") child.position.z = 5;
  //     if (child.name === "hiddenCube") child.position.set(0, -1.5, 0);
  //     if (child.name === "chair") child.rotation.x = Math.PI;
  //     if (child.name === "mouse") child.rotation.y = Math.PI;
  //   });
  // }, []);

  return (
    <motion.primitive
      ref={roomRef}
      object={room.scene}
      rotation-y={RotateY}
      // position={position}
    />
  );
}

useGLTF.preload("./models/room.glb");
