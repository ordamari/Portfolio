import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { extend, ThreeElements, useThree } from "@react-three/fiber";
import {
  MotionValue,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRect } from "../../hooks/useRect";
import { assets } from "../../assets/assets";
import { useMotionsValues } from "../../hooks/useMotionsValues";
import { motion } from "framer-motion-3d";
import { useSmoothTransform } from "../../hooks/useSmoothTransform";
import { useEntranceAnimation } from "../../hooks/useEntranceAnimation";
import { useRoomScrollAnimation } from "../../hooks/useRoomScrollAnimation";
import { Status } from "../../assets/types/status";
import { usePreloader } from "../../hooks/usePreloader";

extend(THREE);

type PrivateProps = {
  roomRef: React.RefObject<THREE.Group>;
  mouseX: MotionValue<number>;
  firstMoveProgress: MotionValue<number>;
  secondMoveProgress: MotionValue<number>;
  thirdMoveProgress: MotionValue<number>;
  setStatus: (status: Status) => void;
  status: Status;
};

export function Room({
  roomRef,
  mouseX,
  firstMoveProgress,
  secondMoveProgress,
  thirdMoveProgress,
  setStatus,
  status,
}: PrivateProps) {
  //@ts-ignore
  const { nodes, materials, animations } = useGLTF("./models/room.glb");
  //@ts-ignore
  const { actions } = useAnimations(animations, roomRef);
  const entrance = useEntranceAnimation();
  const room = useRoomScrollAnimation(
    mouseX,
    firstMoveProgress,
    secondMoveProgress,
    thirdMoveProgress,
    status
  );
  const preloader = usePreloader(setStatus);
  const rect = useRect(document.body);

  const width = useMemo(() => {
    if (!rect) return 1;
    return rect.width;
  }, [rect]);

  function startEntranceAnimation(v: number) {
    const coefficient = 1 - v;
    if (coefficient > 0.5) {
      entrance.startAnimation();
    }
  }

  useEffect(() => {
    setStatus("LOAD_ROOM");
    const unsubscribe = thirdMoveProgress.on("change", startEntranceAnimation);
    return () => {
      unsubscribe();
    };
  }, []);

  const screenVideoElement = useMemo(() => {
    const video = document.createElement("video");
    video.src = "./textures/coding.mp4";
    video.muted = true;
    video.loop = true;
    video.play();
    // document.body.appendChild(video);
    return video;
  }, []);

  const televisionVideoElement = useMemo(() => {
    const video = document.createElement("video");
    video.src = "./textures/technologies.mp4";
    video.muted = true;
    video.loop = true;
    video.play();
    document.body.appendChild(video);
    return video;
  }, []);

  const screenMaterial = useMemo(() => {
    const texture = new THREE.VideoTexture(screenVideoElement);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    return material;
  }, []);
  const televisionMaterial = useMemo(() => {
    const texture = new THREE.VideoTexture(televisionVideoElement);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    return material;
  }, []);

  return (
    <motion.group
      scale={room.scale}
      rotation-y={room.rotationY}
      animate={preloader.first ? "after" : "before"}
      variants={{
        before: {
          x: width > 960 ? -1 : 0,
          y: width > 960 ? 0 : -1,
        },
        after: {
          x: 0,
          y: 0,
        },
      }}
      position={room.position}
      dispose={null}
    >
      <group name="Scene">
        <motion.group
          name="hiddenCube"
          position={[0, -1.5, 0]}
          animate={
            preloader.first ? (preloader.second ? "second" : "first") : "before"
          }
          variants={{
            before: {
              scale: 1.4,
            },
            first: {
              scale: 10,
              rotateY: 2 * Math.PI,
              y: 11.1551,
              z: -0.822436,
              x: 0.608948,
            },
            after: {
              scale: -1,
            },
          }}
        >
          <mesh
            name="Cube118"
            castShadow
            receiveShadow
            geometry={nodes.Cube118.geometry}
            material={materials.key}
          />
          <mesh
            name="Cube118_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube118_1.geometry}
            material={materials.earphones}
          />
        </motion.group>

        <motion.mesh
          scale={0}
          name="airCondation"
          castShadow
          receiveShadow
          animate={preloader.fourth ? "after" : "before"}
          variants={{
            before: {
              scaleY: 0,
              scaleZ: 4,
              scaleX: 0,
            },
            after: {
              scaleY: 0.785,
              scaleZ: 4.055,
              scaleX: 0.553,
            },
          }}
          geometry={nodes.airCondation.geometry}
          material={materials.earphones}
          position={[-8.7, 14.72, 5.63]}
        />
        <motion.group
          scale={0}
          animate={preloader.second ? "after" : "before"}
          variants={{
            before: {
              scale: 0,
            },
            after: {
              scale: 10.611,
            },
          }}
          name="room"
          position={[0.34, 10.73, 0.45]}
          // scale={10.61}
        >
          <mesh
            name="Cube004"
            castShadow
            receiveShadow
            geometry={nodes.Cube004.geometry}
            material={materials.wall}
          />
          <mesh
            name="Cube004_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube004_1.geometry}
            material={materials.key}
          />
          <mesh
            name="Cube004_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube004_2.geometry}
            material={materials.key}
          />
        </motion.group>

        <motion.mesh
          scale={0}
          name="picture"
          castShadow
          receiveShadow
          geometry={nodes.picture.geometry}
          material={nodes.picture.material}
          position={[-3.7, 14.29, -9.04]}
          animate={preloader.fifth ? "after" : "before"}
          variants={{
            before: {
              scaleY: 0,
              scaleZ: 0,
              scaleX: 0,
            },
            after: {
              scaleY: 2.193,
              scaleZ: 0.2,
              scaleX: 4.358,
            },
          }}
        />

        <motion.mesh
          scale={0}
          name="mousePad"
          castShadow
          receiveShadow
          geometry={nodes.mousePad.geometry}
          material={materials.mousePad}
          position={[-6.74, 5.08, 4.34]}
          rotation={[0, 0, -0.06]}
          animate={preloader.fourth ? "after" : "before"}
          variants={{
            before: {
              scaleX: 0,
              scaleY: 0,
              scaleZ: 0,
            },
            after: {
              scaleX: 1.225,
              scaleY: 1,
              scaleZ: 3.462,
            },
          }}
        />

        <motion.group
          scale={0}
          name="rug"
          animate={preloader.fourth ? "after" : "before"}
          variants={{
            before: {
              scaleX: 0,
              scaleY: 0,
              scaleZ: 0,
            },
            after: {
              scaleY: 0.05,
              scaleZ: 6.329,
              scaleX: 6.329,
            },
          }}
          position={[3.8, 1.06, 0.71]}
          // scale={[6.33, 0.05, 6.33]}
        >
          <mesh
            name="Cylinder006"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder006.geometry}
            material={materials.key}
          />
          <mesh
            name="Cylinder006_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder006_1.geometry}
            material={materials.earphones}
          />
        </motion.group>

        <motion.mesh
          scale={0}
          name="miniRug"
          animate={preloader.fifth ? "after" : "before"}
          variants={{
            before: {
              scaleY: 0,
              scaleZ: 0,
              scaleX: 0,
            },
            after: {
              scaleY: 1,
              scaleZ: 1.43,
              scaleX: 2.564,
            },
          }}
          castShadow
          receiveShadow
          geometry={nodes.miniRug.geometry}
          material={materials.key}
          position={[4.44, 1.01, 9.2]}
        />

        <motion.mesh
          scale={0}
          name="mouse"
          castShadow
          receiveShadow
          geometry={nodes.mouse.geometry}
          material={materials.key}
          position={[-6.65, 5.11, 2.23]}
          rotation={[Math.PI, -0.39, Math.PI]}
          animate={preloader.sixth ? "after" : "before"}
          variants={{
            before: {
              scaleY: 0,
              scaleZ: 0,
              scaleX: 0,
            },
            after: {
              scaleY: -0.106,
              scaleZ: 0.234,
              scaleX: 0.288,
            },
          }}
        />

        <motion.mesh
          scale={0}
          name="screen-plan"
          castShadow
          receiveShadow
          geometry={nodes["screen-plan"].geometry}
          material={screenMaterial}
          position={[-8.15, 6.37, 4.39]}
          animate={preloader.sixth ? "after" : "before"}
          variants={{
            before: {
              scaleY: 0,
              scaleZ: 0,
              scaleX: 0,
            },
            after: {
              scaleY: 0.844,
              scaleZ: 3.009,
              scaleX: 0.025,
            },
          }}
        />
        <motion.group
          scale={0}
          name="chair"
          position={[-3.77, 3.53, 4.45]}
          rotation={[Math.PI, Math.PI, 2.98]}
          animate={preloader.seventh ? "after" : "before"}
          variants={{
            before: {
              scaleY: 0,
              scaleZ: 0,
              scaleX: 0,
              rotateY: Math.PI,
            },
            after: {
              scaleY: 1.901,
              scaleZ: 1,
              scaleX: 0.107,
              rotateY: Math.PI * 5,
            },
          }}
          // scale={[-0.11, -1.9, -1]}
        >
          <mesh
            name="Cube030"
            castShadow
            receiveShadow
            geometry={nodes.Cube030.geometry}
            material={materials.key}
          />
          <mesh
            name="Cube030_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube030_1.geometry}
            material={materials.chairPlastic}
          />
          <mesh
            name="Cube030_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube030_2.geometry}
            material={materials.mousePad}
          />
        </motion.group>

        <motion.group
          scale={0}
          name="screen"
          position={[-8.15, 6.37, 4.39]}
          animate={preloader.sixth ? "after" : "before"}
          variants={{
            before: {
              scaleY: 0,
              scaleZ: 0,
              scaleX: 0,
            },
            after: {
              scaleY: 0.844,
              scaleZ: 3.009,
              scaleX: 0.025,
            },
          }}
        >
          <mesh
            name="Cube002"
            castShadow
            receiveShadow
            geometry={nodes.Cube002.geometry}
            material={materials.screenFrame}
          />
          <mesh
            name="Cube002_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_1.geometry}
            material={materials.screenHolder}
          />
        </motion.group>

        <motion.group
          scale={0}
          name="table"
          animate={preloader.third ? "after" : "before"}
          variants={{
            before: {
              scaleX: 0,
              scaleY: 0,
              scaleZ: 0,
            },
            after: {
              scaleY: 0.134084,
              scaleZ: 1.68643,
              scaleX: 2.09269,
            },
          }}
          position={[-8.01, 1.03, 4.41]}
          rotation={[0, 0, -0.06]}
          // scale={[2.09, 0.13, 1.69]}
        >
          <mesh
            name="Cube"
            castShadow
            receiveShadow
            geometry={nodes.Cube.geometry}
            material={materials.tableBoard}
          />
          <mesh
            name="Cube_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube_1.geometry}
            material={materials.tableLeg}
          />
        </motion.group>
        <motion.mesh
          scale={0}
          name="chairLegs"
          castShadow
          receiveShadow
          geometry={nodes.chairLegs.geometry}
          material={materials.chairPlastic}
          position={[-3.53, 1.44, 4.42]}
          animate={preloader.sixth ? "after" : "before"}
          variants={{
            before: {
              scaleY: 0,
              scaleZ: 0,
              scaleX: 0,
            },
            after: {
              scaleY: 0.08,
              scaleZ: 0.08,
              scaleX: 0.051,
            },
          }}
        />
        <motion.mesh
          scale={0}
          name="earphones"
          castShadow
          receiveShadow
          geometry={nodes.earphones.geometry}
          material={materials.earphones}
          position={[-7.35, 6.45, 8.4]}
          rotation={[-1.56, -0.02, -1.13]}
          animate={preloader.seventh ? "after" : "before"}
          variants={{
            before: {
              scaleY: 0,
              scaleZ: 0,
              scaleX: 0,
            },
            after: {
              scaleY: 1.044,
              scaleZ: 0.528,
              scaleX: 0.528,
            },
          }}
        />
        <motion.mesh
          name="televisionScreen"
          castShadow
          receiveShadow
          scale={0}
          geometry={nodes.televisionScreen.geometry}
          material={televisionMaterial}
          position={[2.98, 7.34, -8.98]}
          rotation={[0, Math.PI / 2, 0]}
          animate={preloader.sixth ? "after" : "before"}
          variants={{
            before: {
              scaleY: 0,
              scaleZ: 0,
              scaleX: 0,
            },
            after: {
              scaleY: -2.59,
              scaleZ: 5.323,
              scaleX: 0.025,
            },
          }}
        />
        <motion.group
          scale={0}
          name="sideboard"
          position={[3.02, 0.99, -8.03]}
          animate={preloader.third ? "after" : "before"}
          variants={{
            before: {
              scale: 0,
            },
            after: {
              scale: 0.621,
            },
          }}
          // scale={0.62}
        >
          <mesh
            name="Cube100"
            castShadow
            receiveShadow
            geometry={nodes.Cube100.geometry}
            material={materials.screenFrame}
          />
          <mesh
            name="Cube100_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube100_1.geometry}
            material={materials.key}
          />
          <mesh
            name="Cube100_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube100_2.geometry}
            material={materials.earphones}
          />
          <mesh
            name="Cube100_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube100_3.geometry}
            material={materials.tableBoard}
          />
        </motion.group>

        <motion.mesh
          scale={0}
          name="television"
          castShadow
          receiveShadow
          geometry={nodes.television.geometry}
          material={materials.screenFrame}
          position={[2.98, 7.34, -8.98]}
          rotation={[0, Math.PI / 2, 0]}
          animate={preloader.sixth ? "after" : "before"}
          variants={{
            before: {
              scaleY: 0,
              scaleZ: 0,
              scaleX: 0,
            },
            after: {
              scaleY: 2.59,
              scaleZ: 5.323,
              scaleX: 0.025,
            },
          }}
        />
        <motion.group
          scale={0}
          animate={preloader.fourth ? "after" : "before"}
          name="smallSpeaker"
          variants={{
            before: {
              scale: 0,
            },
            after: {
              scale: 0.303,
            },
          }}
          position={[4.23, 3.39, -8.38]}
        >
          <mesh
            name="Cube112"
            castShadow
            receiveShadow
            geometry={nodes.Cube112.geometry}
            material={materials.screenFrame}
          />
          <mesh
            name="Cube112_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube112_1.geometry}
            material={materials.earphones}
          />
          <mesh
            name="Cube112_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube112_2.geometry}
            material={materials.key}
          />
        </motion.group>

        <motion.group
          animate={preloader.fifth ? "after" : "before"}
          variants={{
            before: {
              scaleY: 0,
              scaleZ: 0,
              scaleX: 0,
            },
            after: {
              scaleY: 0.02,
              scaleZ: 0.077,
              scaleX: 0.077,
            },
          }}
          name="keyboard"
          position={[-6.61, 5.08, 4.33]}
          rotation={[0, 0, -0.06]}
          scale={0}
          // scale={[0.08, 0.02, 0.08]}
        >
          <mesh
            name="Cube019"
            castShadow
            receiveShadow
            geometry={nodes.Cube019.geometry}
            material={materials.key}
          />
          <mesh
            name="Cube019_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube019_1.geometry}
            material={materials.earphones}
          />
        </motion.group>

        <motion.mesh
          name="earphonesHolder"
          castShadow
          animate={preloader.fifth ? "after" : "before"}
          variants={{
            before: {},
            after: {
              scaleY: 0.055,
              scaleZ: 0.341,
              scaleX: 0.341,
            },
          }}
          receiveShadow
          geometry={nodes.earphonesHolder.geometry}
          material={materials.key}
          position={[-7.32, 5.07, 8.4]}
          rotation={[0, 0.45, 0]}
          scale={0}
          // scale={[0.34, 0.06, 0.34]}
        />
        <motion.group
          name="ps4"
          position={[-0.99, 3.49, -8.01]}
          rotation={[Math.PI / 2, 0, 0]}
          animate={preloader.fifth ? "after" : "before"}
          scale={0}
          variants={{
            before: {
              scale: 0,
            },
            after: {
              scale: 0.788,
            },
          }}
          // scale={0.79}
        >
          <mesh
            name="meshId0_name"
            castShadow
            receiveShadow
            geometry={nodes.meshId0_name.geometry}
            material={materials["Material.004"]}
          />
          <mesh
            name="meshId0_name_1"
            castShadow
            receiveShadow
            geometry={nodes.meshId0_name_1.geometry}
            material={materials["Material.012"]}
          />
          <mesh
            name="meshId0_name_2"
            castShadow
            receiveShadow
            geometry={nodes.meshId0_name_2.geometry}
            material={materials["Material.011"]}
          />
          <mesh
            name="meshId0_name_3"
            castShadow
            receiveShadow
            geometry={nodes.meshId0_name_3.geometry}
            material={materials["Material.010"]}
          />
          <mesh
            name="meshId0_name_4"
            castShadow
            receiveShadow
            geometry={nodes.meshId0_name_4.geometry}
            material={materials["Material.002"]}
          />
          <mesh
            name="meshId0_name_5"
            castShadow
            receiveShadow
            geometry={nodes.meshId0_name_5.geometry}
            material={materials["Material.003"]}
          />
          <mesh
            name="meshId0_name_6"
            castShadow
            receiveShadow
            geometry={nodes.meshId0_name_6.geometry}
            material={materials["Material.005"]}
          />
          <mesh
            name="meshId0_name_7"
            castShadow
            receiveShadow
            geometry={nodes.meshId0_name_7.geometry}
            material={materials["Material.001"]}
          />
          <mesh
            name="meshId0_name_8"
            castShadow
            receiveShadow
            geometry={nodes.meshId0_name_8.geometry}
            material={materials["Material.006"]}
          />
          <mesh
            name="meshId0_name_9"
            castShadow
            receiveShadow
            geometry={nodes.meshId0_name_9.geometry}
            material={materials["Material.009"]}
          />
          <mesh
            name="meshId0_name_10"
            castShadow
            receiveShadow
            geometry={nodes.meshId0_name_10.geometry}
            material={materials["Material.008"]}
          />
          <mesh
            name="meshId0_name_11"
            castShadow
            receiveShadow
            geometry={nodes.meshId0_name_11.geometry}
            material={materials["Material.007"]}
          />
        </motion.group>

        <motion.group
          name="itoIto"
          animate={preloader.fourth ? "after" : "before"}
          variants={{
            before: {
              scale: 0,
            },
            after: {
              scale: 0.00465,
            },
          }}
          position={[2.95, 2.11, -7.54]}
          scale={0}
        >
          <mesh
            name="01"
            castShadow
            receiveShadow
            geometry={nodes["01"].geometry}
            material={materials["Material.015"]}
          />
          <mesh
            name="01_1"
            castShadow
            receiveShadow
            geometry={nodes["01_1"].geometry}
            material={materials["Material.014"]}
          />
        </motion.group>

        <motion.group
          name="opeOpe"
          position={[1.82, 2.43, -7.46]}
          scale={0}
          animate={preloader.fourth ? "after" : "before"}
          variants={{
            before: {
              scale: 0,
            },
            after: {
              scale: 0.011845,
            },
          }}
        >
          <mesh
            name="01001"
            castShadow
            receiveShadow
            geometry={nodes["01001"].geometry}
            material={materials["Material.017"]}
          />
          <mesh
            name="01001_1"
            castShadow
            receiveShadow
            geometry={nodes["01001_1"].geometry}
            material={materials["Material.016"]}
          />
        </motion.group>

        <motion.group
          name="meraMera"
          position={[5.51, 2.65, -7.61]}
          scale={0}
          animate={preloader.fourth ? "after" : "before"}
          variants={{
            before: {
              scale: 0,
            },
            after: {
              scale: 0.288,
            },
          }}
          // scale={0.29}
        >
          <mesh
            name="Cube111"
            castShadow
            receiveShadow
            geometry={nodes.Cube111.geometry}
            material={materials["Fruit_Tip.001"]}
          />
          <mesh
            name="Cube111_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube111_1.geometry}
            material={materials.Inner}
          />
        </motion.group>

        <motion.group
          name="yamiYami"
          position={[0.57, 2.13, -7.55]}
          scale={0}
          animate={preloader.fourth ? "after" : "before"}
          variants={{
            before: {
              scale: 0,
            },
            after: {
              scale: 0.005,
            },
          }}
        >
          <mesh
            name="01002"
            castShadow
            receiveShadow
            geometry={nodes["01002"].geometry}
            material={materials["Material.019"]}
          />
          <mesh
            name="01002_1"
            castShadow
            receiveShadow
            geometry={nodes["01002_1"].geometry}
            material={materials["Material.018"]}
          />
        </motion.group>

        <motion.group
          name="gomuGomugomuGomu"
          position={[4.16, 2.37, -7.55]}
          // scale={0.01}
          scale={0}
          animate={preloader.fourth ? "after" : "before"}
          variants={{
            before: {
              scale: 0,
            },
            after: {
              scale: 0.006,
            },
          }}
        >
          <mesh
            name="01-gomu_gomu"
            castShadow
            receiveShadow
            geometry={nodes["01-gomu_gomu"].geometry}
            material={materials.sunny}
          />
          <mesh
            name="01-gomu_gomu_1"
            castShadow
            receiveShadow
            geometry={nodes["01-gomu_gomu_1"].geometry}
            material={materials["Material.013"]}
          />
        </motion.group>

        <motion.mesh
          name="floor"
          castShadow
          receiveShadow
          geometry={nodes.floor.geometry}
          position={[3.96, 0.46, 9.11]}
          material={materials.wall}
          animate={preloader.third ? "after" : "before"}
          scale={[0, 0, 0]}
          variants={{
            before: { scaleX: 0, scaleY: 0 },
            after: { scaleX: 5.09, scaleY: 4.56 },
          }}
          scale-z={entrance.floorZScale}
        />
        <motion.mesh
          name="lamp"
          scale={entrance.lampScale}
          castShadow
          receiveShadow
          geometry={nodes.lamp.geometry}
          material={materials.earphones}
          position={[0.86, 0.74, 13.02]}
        />
        <motion.mesh
          scale={entrance.lampScale}
          castShadow
          receiveShadow
          geometry={nodes.lampInner.geometry}
          material={nodes.lampInner.material}
          position={[0.86, 0.74, 13.02]}
        />
        <motion.mesh
          name="minifloor"
          castShadow
          receiveShadow
          geometry={nodes.minifloor.geometry}
          material={materials.earphones}
          position={[4.94, 0.72, 12.87]}
          scale={entrance.minifloor1Scale}
        />
        <motion.mesh
          name="minifloor001"
          castShadow
          receiveShadow
          geometry={nodes.minifloor001.geometry}
          material={materials.key}
          position={[4.55, 0.72, 15.19]}
          scale={entrance.minifloor2Scale}
        />
        <motion.mesh
          name="minifloor002"
          castShadow
          receiveShadow
          geometry={nodes.minifloor002.geometry}
          material={materials.earphones}
          position={[4.23, 0.72, 17.58]}
          scale={entrance.minifloor3Scale}
        />
        <motion.group
          name="pPlane5"
          position={[8.14, 0.62, 14.09]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={entrance.mailBoxScale}
        >
          <mesh
            name="Mesh"
            castShadow
            receiveShadow
            geometry={nodes.Mesh.geometry}
            material={materials.key}
          />
          <mesh
            name="Mesh_1"
            castShadow
            receiveShadow
            geometry={nodes.Mesh_1.geometry}
            material={materials.earphones}
          />
        </motion.group>
        <motion.group
          name="thousendSunny"
          animate={preloader.fifth ? "after" : "before"}
          variants={{
            before: {
              scale: 0,
            },
            after: {
              scale: 0.266,
            },
          }}
          position={[7.56, 3.76, -8.04]}
          scale={0}

          // scale={0.27}
        >
          <mesh
            name="Cube090"
            castShadow
            receiveShadow
            geometry={nodes.Cube090.geometry}
            material={materials.sunny}
          />
          <mesh
            name="Cube090_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube090_1.geometry}
            material={materials.sunny_masts}
          />
        </motion.group>
        <motion.mesh
          name="pictureImage"
          castShadow
          receiveShadow
          geometry={nodes.pictureImage.geometry}
          material={materials.picture}
          position={[-3.7, 14.29, -9.04]}
          // scale={[4.36, 2.19, 0.2]}
          scale={0}
          animate={preloader.fifth ? "after" : "before"}
          variants={{
            before: {
              scaleY: 0,
              scaleZ: 0,
              scaleX: 0,
            },
            after: {
              scaleY: 2.193,
              scaleZ: 0.2,
              scaleX: 4.358,
            },
          }}
        />
      </group>
    </motion.group>
  );
}

useGLTF.preload("./models/room.glb");
