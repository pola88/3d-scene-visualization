import React, { useMemo } from 'react';
import { Point } from './types';

const getColorFromZ = (z: number, zMin: number, zMax: number): [number, number, number] => {
  const ratio = (z - zMin) / (zMax - zMin);
  const gray = ratio;
  return [gray, gray, gray];
};

interface SceneProps {
  points: number[][];
}

const Scene: React.FC<SceneProps> = ({ points }) => {
  const { positions, colors } = useMemo(() => {
    let zMax = 0;
    let zMin = 0;
    const parsedPoints: Point[] = points.map(
      ([x, y, z]) => {
        if (z > zMax) {
          zMax = z;
        } else if (z < zMin) {
          zMin = z;
        }
        return { x, y, z }
      }
    );

    const positions: number[] = [];
    const colors: number[] = [];

    parsedPoints.forEach(({ x, y, z }) => {
      positions.push(x, y, z);
      const color = getColorFromZ(z, zMin, zMax);
      colors.push(...color);
    });

    return { positions, colors };
  }, [points]);

  return (
    <>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={new Float32Array(positions)} count={positions.length / 3} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={new Float32Array(colors)} count={colors.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial vertexColors size={0.06} />
      </points>
    </>
  );
};

export default Scene;