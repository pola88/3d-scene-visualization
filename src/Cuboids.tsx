import React from 'react';
import { Cuboid as CuboidDT } from './types';
import * as THREE from 'three';

interface CuboidsProps {
  cuboids: CuboidDT[];
  showInfo: (cuboid: CuboidDT ) => void;
}

const Cuboids: React.FC<CuboidsProps> = ({ cuboids, showInfo }) => {
  return (
    <>
      {cuboids.map((cuboid, index) => (
        <mesh 
          key={index}
          position={cuboid.position} rotation={[0, 0, cuboid.yaw]}
          onPointerOver={() => showInfo(cuboid) }
        >
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