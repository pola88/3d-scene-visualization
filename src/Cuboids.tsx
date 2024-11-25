import React from 'react';
import { Cuboid as CuboidDT } from './types';
import Cuboid from './Cuboid';

interface CuboidsProps {
  cuboids: CuboidDT[];
  opacity: number;
  showInfo: (cuboid: CuboidDT ) => void;
}

const Cuboids: React.FC<CuboidsProps> = ({ cuboids, showInfo, opacity }) => {
  return (
    <>
      {cuboids.map((cuboid, index) => (
        <mesh 
          key={index}
          position={cuboid.position} rotation={[0, 0, cuboid.yaw]}
          onPointerOver={() => showInfo(cuboid) }
        >
          <Cuboid cuboid={cuboid} opacity={opacity}/>
        </mesh>
      ))}
    </>
  );
};

export default Cuboids;