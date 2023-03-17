import { MotionValue } from "framer-motion";
import { Group } from "three";
import { Theme } from "../assets/types/theme";
import { Environment } from "./components/Environment";
import { Room } from "./components/Room2";

type PrivateProps = {
  roomRef: React.RefObject<Group>;
  roomChildrenRefs: React.RefObject<{ [key: string]: any }>;
  mouseX: MotionValue<number>;
  theme: Theme;
  firstMoveProgress: MotionValue<number>;
  secondMoveProgress: MotionValue<number>;
  thirdMoveProgress: MotionValue<number>;
};

export function Experience({
  roomRef,
  roomChildrenRefs,
  mouseX,
  theme,
  firstMoveProgress,
  secondMoveProgress,
  thirdMoveProgress,
}: PrivateProps) {
  return (
    <>
      <Room
        mouseX={mouseX}
        roomRef={roomRef}
        roomChildrenRefs={roomChildrenRefs}
        firstMoveProgress={firstMoveProgress}
        secondMoveProgress={secondMoveProgress}
        thirdMoveProgress={thirdMoveProgress}
      />
      <Environment theme={theme} />
      {/* <Floor /> */}
      {/* <Controls /> */}
    </>
  );
}
