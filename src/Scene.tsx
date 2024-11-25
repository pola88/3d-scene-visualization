import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Point } from './types';

const getColorFromZ = (z: number, zMin: number, zMax: number): [number, number, number] => {
  const ratio = (z - zMin) / (zMax - zMin);
  const gray = ratio;
  return [gray, gray, gray];
};

interface SceneProps {
  points: number[][];
}

let currentPoints: Float32Array;
let currentColors: Float32Array;

const Scene: React.FC<SceneProps> = ({ points }) => {  
  const geometryRef = useRef<any>();

  useEffect( () => {
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

    if (currentPoints && currentColors && currentPoints.length >= positions.length) {
      currentPoints.set(positions);
      currentColors.set(colors);
    } else {
      currentPoints = new Float32Array(positions);
      currentColors = new Float32Array(colors);
    }

    if (geometryRef.current) {
      geometryRef.current.setAttribute(
        'position',
        new THREE.BufferAttribute(currentPoints, 3)
      );
      geometryRef.current.setAttribute(
        'color',
        new THREE.BufferAttribute(currentColors, 3)
      );
    }  
  }, [points]);

  return (
    <>
      {<points>
        <bufferGeometry ref={geometryRef} />
        <pointsMaterial vertexColors size={0.05} />
      </points>}
    </>
  );
};

export default Scene;