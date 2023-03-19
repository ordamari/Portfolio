import { MotionValue } from "framer-motion";
import { Suspense } from "react";
import { Group } from "three";
import { Status } from "../assets/types/status";
import { Theme } from "../assets/types/theme";
import { Environment } from "./components/Environment";
import { Floor } from "./components/Floor";
import { Room } from "./components/Room";

type PrivateProps = {
  roomRef: React.RefObject<Group>;
  mouseX: MotionValue<number>;
  theme: Theme;
  firstMoveProgress: MotionValue<number>;
  secondMoveProgress: MotionValue<number>;
  thirdMoveProgress: MotionValue<number>;
  setStatus: (status: Status) => void;
  status: Status;
};

export function Experience({
  roomRef,
  mouseX,
  theme,
  firstMoveProgress,
  secondMoveProgress,
  thirdMoveProgress,
  setStatus,
  status,
}: PrivateProps) {
  return (
    <>
      <Room
        mouseX={mouseX}
        roomRef={roomRef}
        firstMoveProgress={firstMoveProgress}
        secondMoveProgress={secondMoveProgress}
        thirdMoveProgress={thirdMoveProgress}
        setStatus={setStatus}
        status={status}
      />
      <Environment theme={theme} />
      <Floor
        firstMoveProgress={firstMoveProgress}
        secondMoveProgress={secondMoveProgress}
        thirdMoveProgress={thirdMoveProgress}
      />
      {/* <Controls /> */}
    </>
  );
}
