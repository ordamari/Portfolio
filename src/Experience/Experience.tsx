import { ThreeElements } from "@react-three/fiber";
import { Environment } from "./components/Environment";
import { Room } from "./components/Room";

type PrivateProps = {
  roomRef: React.RefObject<ThreeElements["primitive"]>;
  roomChildrenRefs: React.RefObject<{ [key: string]: any }>;
};

export function Experience({ roomRef, roomChildrenRefs }: PrivateProps) {
  return (
    <>
      {/* <Room roomRef={roomRef} roomChildrenRefs={roomChildrenRefs} /> */}
      <Environment />
      {/* <Floor /> */}
      {/* <Controls /> */}
    </>
  );
}
