import React from 'react';
import { Cuboid as CuboidDT } from './types';
import * as THREE from 'three';

const defaultColor = new THREE.Color(0Xedfc1c);

interface CuboidsProps {
  cuboid: CuboidDT;
  opacity: number;
  color?: THREE.Color;
}

const Cuboid: React.FC<CuboidsProps> = ({ cuboid, opacity, color = defaultColor }) => {
  return <>
    <boxGeometry args={cuboid.dimensions} />
      <meshStandardMaterial color={color} transparent opacity={opacity} />
    <lineSegments>
      
    <edgesGeometry args={[new THREE.BoxGeometry(...cuboid.dimensions)]} />
      <lineBasicMaterial color="red" linewidth={2} />
    </lineSegments>
  </>;
};

export default Cuboid;