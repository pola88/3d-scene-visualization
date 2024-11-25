import React from 'react';
import { Cuboid as CuboidDT } from './types';
import * as THREE from 'three';

interface CuboidsProps {
  cuboids: CuboidDT[];
  opacity: number;
  showInfo: (cuboid: CuboidDT ) => void;
}

const Cuboids: React.FC<CuboidsProps> = ({ cuboids, showInfo, opacity }) => {
  const color = new THREE.Color(0Xedfc1c);
  return (
    <>
      {cuboids.map((cuboid, index) => (
        <mesh 
          key={index}
          position={cuboid.position} rotation={[0, 0, cuboid.yaw]}
          onPointerOver={() => showInfo(cuboid) }
        >
          <boxGeometry args={cuboid.dimensions} />
          <meshStandardMaterial color={color} transparent opacity={opacity} />
          <lineSegments>
          
          <edgesGeometry args={[new THREE.BoxGeometry(...cuboid.dimensions)]} />
            <lineBasicMaterial color="red" linewidth={2} />
          </lineSegments>
        </mesh>
      ))}
    </>
  );
};

export default Cuboids;