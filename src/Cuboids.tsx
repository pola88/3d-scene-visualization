import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Cuboid } from './types';

interface CuboidsProps {
  cuboids: Cuboid[]
}

const Cuboids: React.FC<CuboidsProps> = ({ cuboids }) => {
  return (
    <>
      {cuboids.map((cuboid, index) => (
        <mesh key={index} position={new THREE.Vector3(...cuboid.position)} rotation={[0, 0, cuboid.yaw]}>
          <boxGeometry args={cuboid.dimensions} />
          <meshStandardMaterial color="skyblue" transparent opacity={0.3} />
        </mesh>
      ))}
    </>
  );
};

export default Cuboids;