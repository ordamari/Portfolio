import * as THREE from "three";

type PrivateProps = {
  //   firstCircleRef: React.RefObject<THREE.Mesh>;
  //   secondCircleRef: React.RefObject<THREE.Mesh>;
  //   thirdCircleRef: React.RefObject<THREE.Mesh>;
};

export function Floor({}: //   firstCircleRef,
//   secondCircleRef,
//   thirdCircleRef,
PrivateProps) {
  return (
    <>
      <mesh
        // ref={firstCircleRef}
        rotation-x={Math.PI * -0.5}
        scale={0}
        receiveShadow
        position-y={-0.29}
        name="circle-first"
      >
        <circleGeometry attach="geometry" args={[5, 64]} />
        <meshStandardMaterial attach="material" color="#404258" />
      </mesh>
      <mesh
        // ref={secondCircleRef}
        rotation-x={Math.PI * -0.5}
        scale={0}
        receiveShadow
        position-y={-0.28}
        position-x={1.5}
        name="circle-second"
      >
        <circleGeometry attach="geometry" args={[5, 64]} />
        <meshStandardMaterial attach="material" color="#474E68" />
      </mesh>
      <mesh
        // ref={thirdCircleRef}
        rotation-x={Math.PI * -0.5}
        scale={0}
        receiveShadow
        position-y={-0.27}
        name="circle-third"
      >
        <circleGeometry attach="geometry" args={[5, 64]} />
        <meshStandardMaterial attach="material" color="#50577A" />
      </mesh>

      <mesh receiveShadow position-y={-0.3} rotation-x={Math.PI * -0.5}>
        <planeGeometry attach="geometry" args={[100, 100]} />
        <meshStandardMaterial attach="material" color="#edebec" />
      </mesh>
    </>
  );
}
