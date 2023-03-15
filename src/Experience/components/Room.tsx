import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useRect } from "../../hooks/useRect";
import { motion } from "framer-motion-3d";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
extend(THREE);

type PrivateProps = {
  roomRef: React.RefObject<ThreeElements["primitive"]>;
  roomChildrenRefs: React.RefObject<{ [key: string]: any }>;
};

export function Room({ roomRef, roomChildrenRefs }: PrivateProps) {
  const room = useGLTF("./models/room.glb");

  // const rect = useRect();
  // const AC = useActions();

  // useEffect(() => {
  //   if (!roomRef.current || !rect) return;
  //   if (rect.width < 960) {
  //     roomRef.current.scale.set(0.07, 0.07, 0.07);
  //   } else {
  //     roomRef.current.scale.set(0.11, 0.11, 0.11);
  //   }
  // }, [rect]);

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

  // return <primitive ref={roomRef} object={room.scene} />;
}

useGLTF.preload("./models/room.glb");
