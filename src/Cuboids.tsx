import React, { useState } from 'react';
import * as THREE from 'three';
import { Cuboid as CuboidDT } from './types';
import Cuboid from './Cuboid';

interface CuboidsProps {
  cuboids: CuboidDT[];
  opacity: number;
  showInfo: (cuboid: CuboidDT ) => void;
}

const Cuboids: React.FC<CuboidsProps> = ({ cuboids, showInfo, opacity }) => {
  const [currentCuboid, setCurrentCuboid] = useState<string>('');

  const onPointerOver = (cuboid: CuboidDT) => {
    showInfo(cuboid);
    setCurrentCuboid(cuboid.uuid);
  }

  return (
    <>
      {cuboids.map((cuboid, index) => (
        <mesh 
          key={index}
          position={cuboid.position} rotation={[0, 0, cuboid.yaw]}
          onPointerOver={() => onPointerOver(cuboid) }
        >
          <Cuboid
            cuboid={cuboid} opacity={opacity}
            {...(currentCuboid === cuboid.uuid && {
              color: new THREE.Color(0Xff0033)
            })}
          />
        </mesh>
      ))}
    </>
  );
};

export default Cuboids;