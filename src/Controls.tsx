import { CameraControls } from '@react-three/drei';
import React from 'react';
import styled from 'styled-components';
import * as THREE from 'three';

const ControlsContainer = styled.div`
  display: flex;
  flex-direction:row;
  gap: 8px;
  justify-content: space-between;
  margin-bottom: 16px;

  > button{
    flex: auto;
    border-radius: 8px;
    padding: 8px;
    background-color: blue;
    color: white;
    border: none;
  }
`;

interface ControlsProps {
  cameraRef: React.MutableRefObject<CameraControls | null>;
}

const Controls = ({ cameraRef }: ControlsProps) => {
  const handlePosition = (dx: number, dy: number, dz: number) => {
    if (!cameraRef.current) {
      return;
    }
    let currentPosition: THREE.Vector3 = cameraRef.current.camera.position;
    cameraRef.current.setPosition(currentPosition.x + dx, currentPosition.y + dy, currentPosition.z + dz, true)
  };

  return <>
    <ControlsContainer>
      <button onClick={() => handlePosition(-1, 0, 0)}>Left</button>
      <button onClick={() => handlePosition(0, -1, 0)}>Up</button>
      <button onClick={() => handlePosition(0, 1, 0)}>Down</button>
      <button onClick={() => handlePosition(1, 0, 0)}>Right</button>  
    </ControlsContainer>
    <ControlsContainer>
      <button onClick={() => handlePosition(0, 0 ,-1)}>Zoom In</button>
      <button onClick={() => handlePosition(0, 0, 1)}>Zoom Out</button>
    </ControlsContainer>
  </>
};

export default Controls;