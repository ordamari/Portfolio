import { useThree } from "@react-three/fiber";
import { MotionValue, useTransform, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useMemo } from "react";
import { assets } from "../assets/assets";
import { useMotionsValues } from "./useMotionsValues";
import { useRect } from "./useRect";

export function useRoomScrollAnimation(
  mouseX: MotionValue<number>,
  firstMoveProgress: MotionValue<number>,
  secondMoveProgress: MotionValue<number>,
  thirdMoveProgress: MotionValue<number>
) {
  const rect = useRect(document.body);
  const camera = useThree((state) => state.camera);

  const mouseToLightRotation = useCallback(
    (v: number) => {
      return (v / width) * 0.1 + assets.roomBaseRotation;
    },
    [rect]
  );
  const motionValue = useMotionValue(0);
  const width = useMemo(() => {
    if (!rect) return 1;
    return rect.width;
  }, [rect]);

  const roomFirstTargetX = useMemo(() => {
    return width * 0.0015;
  }, [width]);

  const scale = useMemo(() => {
    if (width < 960) return assets.roomMobileScale;
    return assets.roomScale;
  }, [width]);

  const rotationY = useTransform(mouseX, mouseToLightRotation);

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

  const mobileFirstMoveRoomScale = useTransform(firstMoveProgress, (v) => {
    const coefficient = 1 - v;
    const path = assets.mobileFirstMoveScale - assets.roomMobileScale;
    return assets.roomMobileScale + path * coefficient;
  });

  const mobileSecondMoveRoomScale = useTransform(secondMoveProgress, (v) => {
    const coefficient = 1 - v;
    const path = assets.mobileSecondMoveScale - assets.mobileFirstMoveScale;
    return assets.mobileFirstMoveScale + path * coefficient;
  });

  const mobileRoomScale = useMotionsValues(
    [mobileFirstMoveRoomScale, mobileSecondMoveRoomScale],
    assets.roomMobileScale
  );

  const mobilePositionX = useTransform(secondMoveProgress, (v) => {
    const coefficient = 1 - v;
    const path = assets.mobileSecondMoveX;
    return path * coefficient;
  });

  const mobilePositionZ = useTransform(thirdMoveProgress, (v) => {
    const coefficient = 1 - v;
    const path = assets.mobileThirdMoveZ;
    return path * coefficient;
  });

  useEffect(() => {
    function updateCamera(v: number) {
      if (!camera || width < 960) return;
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

  return {
    scale: width > 960 ? roomScale : mobileRoomScale,
    rotationY,
    position:
      width > 960
        ? [positionX, motionValue, positionZ]
        : [mobilePositionX, motionValue, mobilePositionZ],
  };
}
