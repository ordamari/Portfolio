import { useGLTF } from "@react-three/drei";
import { ThreeElements, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo } from "react";
import { useActions } from "../../hooks/useActions";
import { useRect } from "../../hooks/useRect";
import { motion } from "framer-motion-3d";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { MotionValue, useMotionValue, useTransform } from "framer-motion";
import useMeasure from "react-use-measure";
import { useSmoothTransform } from "../../hooks/useSmoothTransform";
import { useMotionsValues } from "../../hooks/useMotionsValues";
import { assets } from "../../assets/assets";
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
  const camera = useThree((state) => state.camera);
  const width = useMemo(() => {
    if (!rect) return 1;
    return rect.width;
  }, [rect]);

  const mouseToLightRotation = useCallback(
    (v: number) => {
      return (v / width) * 0.1 + baseRotation;
    },
    [rect]
  );
  const roomFirstTargetX = useMemo(() => {
    return width * 0.0015;
  }, [width]);

  const scale = useMemo(() => {
    if (width < 960) return assets.roomMobileScale;
    return assets.roomScale;
  }, [width]);

  useEffect(() => {
    if (!roomRef.current) return;
    roomRef.current.scale.set(scale, scale, scale);
  }, [scale]);

  const RotateY = useTransform(mouseX, mouseToLightRotation);

  const PositionXFirstMove = useTransform(firstMoveProgress, (v) => {
    const coefficient = 1 - v;
    return coefficient * roomFirstTargetX;
  });

  const PositionXSecondMove = useTransform(secondMoveProgress, (v) => {
    const coefficient = (1 - v) * -1;
    const secondMovePath = roomFirstTargetX - 1;
    return roomFirstTargetX + secondMovePath * coefficient;
  });

  const positionX = useMotionsValues([PositionXFirstMove, PositionXSecondMove]);

  const positionZ = useTransform(secondMoveProgress, (v) => {
    const coefficient = 1 - v;
    const path = assets.secondPartZ;
    return path * coefficient;
  });

  const roomScale = useTransform(secondMoveProgress, (v) => {
    const coefficient = 1 - v;
    const path = assets.secondPartScale - scale;
    return scale + path * coefficient;
  });

  useEffect(() => {
    function updateCamera(v: number) {
      if (!camera || !roomRef.current) return;
      const coefficient = 1 - v;
      const [baseX, baseY, baseZ] = assets.baseCameraPosition;
      const [targetX, targetY, targetZ] = assets.thirdPartCameraPosition;
      const x = baseX + (targetX - baseX) * coefficient;
      const y = baseY + (targetY - baseY) * coefficient;
      const z = baseZ + (targetZ - baseZ) * coefficient;
      camera.position.set(x, y, z);
    }
    const unsubscribe = thirdMoveProgress.on("change", updateCamera);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!roomRef.current || !roomChildrenRefs.current) return;
    roomRef.current.children.forEach((child: any) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (roomChildrenRefs.current)
        roomChildrenRefs.current[child.name.toLowerCase()] = child;
      console.log(child.name);

      if (
        child.name === "minifloor" ||
        child.name === "minifloor001" ||
        child.name === "minifloor002" ||
        child.name === "pPlane5" ||
        child.name === "lamp" ||
        child.name === "lampInner"
      )
        child.scale.set(0, 0, 0);

      if (child.name === "floor") child.position.z = 5;
      // if (child.name === "hiddenCube") child.position.set(0, -1.5, 0);
      // if (child.name === "chair") child.rotation.x = Math.PI;
      // if (child.name === "mouse") child.rotation.y = Math.PI;
    });
    console.log(roomChildrenRefs);
  }, []);

  return (
    <motion.primitive
      ref={roomRef}
      object={room.scene}
      rotation-y={RotateY}
      position-x={positionX}
      position-z={positionZ}
      scale={roomScale}
    />
  );
}

useGLTF.preload("./models/room.glb");
