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
        <mesh key={index} position={cuboid.position} rotation={[0, 0, cuboid.yaw]}>
          <boxGeometry args={cuboid.dimensions} />
          <meshStandardMaterial color="yellow" transparent opacity={0.2} />
          <lineSegments>
          
          <edgesGeometry args={[new THREE.BoxGeometry(...cuboid.dimensions)]} />
            <lineBasicMaterial color="black" linewidth={10} />
          </lineSegments>
        </mesh>
      ))}
    </>
  );
};

export default Cuboids;