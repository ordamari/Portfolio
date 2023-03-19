export const assets = {
  transition: {
    type: "spring",
    duration: 1,
    bounce: 0.2,
  },
  lightThemes: {
    light: {
      color: "#ffffff",
      intensity: 1,
    },
    dark: {
      color: "#193296",
      intensity: 0.76,
    },
  },
  scrollOffset: ["end end", "start start"] as ["end end", "start start"],
  sectionTopScrollOffset: ["start end", "start start"] as [
    "start end",
    "start start"
  ],
  sectionBottomScrollOffset: ["end end", "end start"] as [
    "end end",
    "end start"
  ],
  roomScale: 0.11,
  roomMobileScale: 0.07,
  mobileFirstMoveScale: 0.1,
  mobileSecondMoveScale: 0.25,
  secondPartScale: 0.4,
  secondPartZ: 1,
  baseCameraPosition: [0, 5.65, 10],
  thirdPartCameraPosition: [-4.5, 3, 10],
  roomBaseRotation: -Math.PI / 4,
  lampScale: 0.71,
  minifloorScale: [2.14, 1, 0.9] as [number, number, number],
  mailboxScale: 0.101,
  mobileSecondMoveX: 1.5,
  mobileThirdMoveZ: -4.5,
  floorScaleStart: 0,
  floorScale: 5.09,
  hiddenCubeStartPos: [-1, 0, 0],
  hiddenCubeMobileStartPos: [0, 0, -1],
  hiddenCubeFirstScale: 1.4,
  cameraPositionYAfterAnimation: 6.5,
};
