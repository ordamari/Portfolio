import { MotionValue, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { assets } from "../assets/assets";
import { useSmoothTransform } from "./useSmoothTransform";

type ThreeMotionValues = [
  MotionValue<number>,
  MotionValue<number>,
  MotionValue<number>
];

export function useEntranceAnimation() {
  const thirdPartEffectFlag = useRef(false);
  const floorZScale = useMotionValue(0);
  const smoothFloorZScale = useSmoothTransform(floorZScale, (v) => v);
  const miniFloor1ScaleX = useMotionValue(0);
  const miniFloor1ScaleY = useMotionValue(0);
  const miniFloor1ScaleZ = useMotionValue(0);
  const smoothMiniFloor1ScaleX = useSmoothTransform(miniFloor1ScaleX, (v) => v);
  const smoothMiniFloor1ScaleY = useSmoothTransform(miniFloor1ScaleY, (v) => v);
  const smoothMiniFloor1ScaleZ = useSmoothTransform(miniFloor1ScaleZ, (v) => v);
  const miniFloor2ScaleX = useMotionValue(0);
  const miniFloor2ScaleY = useMotionValue(0);
  const miniFloor2ScaleZ = useMotionValue(0);
  const smoothMiniFloor2ScaleX = useSmoothTransform(miniFloor2ScaleX, (v) => v);
  const smoothMiniFloor2ScaleY = useSmoothTransform(miniFloor2ScaleY, (v) => v);
  const smoothMiniFloor2ScaleZ = useSmoothTransform(miniFloor2ScaleZ, (v) => v);
  const miniFloor3ScaleX = useMotionValue(0);
  const miniFloor3ScaleY = useMotionValue(0);
  const miniFloor3ScaleZ = useMotionValue(0);
  const smoothMiniFloor3ScaleX = useSmoothTransform(miniFloor3ScaleX, (v) => v);
  const smoothMiniFloor3ScaleY = useSmoothTransform(miniFloor3ScaleY, (v) => v);
  const smoothMiniFloor3ScaleZ = useSmoothTransform(miniFloor3ScaleZ, (v) => v);
  const mailBoxScale = useMotionValue(0);
  const smoothMailBoxScale = useSmoothTransform(mailBoxScale, (v) => v);
  const lampScale = useMotionValue(0);
  const smoothLampScale = useSmoothTransform(lampScale, (v) => v);

  const entranceFifthPart = () => {
    miniFloor3ScaleX.set(assets.minifloorScale[0]);
    miniFloor3ScaleY.set(assets.minifloorScale[1]);
    miniFloor3ScaleZ.set(assets.minifloorScale[2]);
  };

  const entranceFourthPart = () => {
    miniFloor2ScaleX.set(assets.minifloorScale[0]);
    miniFloor2ScaleY.set(assets.minifloorScale[1]);
    miniFloor2ScaleZ.set(assets.minifloorScale[2]);
    setTimeout(() => {
      entranceFifthPart();
    }, 400);
  };

  const entranceThirdPart = () => {
    lampScale.set(assets.lampScale);
    setTimeout(() => {
      entranceFourthPart();
    }, 400);
  };

  const entranceSecondPart = () => {
    miniFloor1ScaleX.set(assets.minifloorScale[0]);
    miniFloor1ScaleY.set(assets.minifloorScale[1]);
    miniFloor1ScaleZ.set(assets.minifloorScale[2]);
    setTimeout(() => {
      entranceThirdPart();
    }, 400);
  };

  const entranceFirstPart = () => {
    mailBoxScale.set(assets.mailboxScale);
    setTimeout(() => {
      entranceSecondPart();
    }, 400);
  };

  const startAnimation = () => {
    if (thirdPartEffectFlag.current) return;
    thirdPartEffectFlag.current = true;
    floorZScale.set(assets.floorScale);
    setTimeout(() => {
      entranceFirstPart();
    }, 400);
  };

  return {
    startAnimation,
    floorZScale: smoothFloorZScale,
    minifloor1Scale: [
      smoothMiniFloor1ScaleX,
      smoothMiniFloor1ScaleY,
      smoothMiniFloor1ScaleZ,
    ] as ThreeMotionValues,
    minifloor2Scale: [
      smoothMiniFloor2ScaleX,
      smoothMiniFloor2ScaleY,
      smoothMiniFloor2ScaleZ,
    ] as ThreeMotionValues,
    minifloor3Scale: [
      smoothMiniFloor3ScaleX,
      smoothMiniFloor3ScaleY,
      smoothMiniFloor3ScaleZ,
    ] as ThreeMotionValues,
    mailBoxScale: smoothMailBoxScale,
    lampScale: smoothLampScale,
  };
}
