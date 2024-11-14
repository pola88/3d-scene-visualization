import { CameraControls } from '@react-three/drei';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';

const ControlsContainer = styled.div`
   margin-bottom: 24px;
   &:last-of-type {
    margin-bottom: 8px;
   }
`;

const StyledButton = styled.button`
  flex: auto;
  border-radius: 8px;
  padding: 8px;
  background-color: blue;
  color: white;
  border: none;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction:row;
  gap: 8px;
  justify-content: space-between;
`;

const UpButtonContainer = styled.div`
  display: flex;
  flex-direction:row;
  justify-content: center;
  margin-bottom: 8px;
  > button {
    width: 33%;
    flex: none;
    margin-right: 8px;
  }
`

const HelperText = styled.span`
  font-size: 0.8rem;
  color: gray;
`;

interface ControlsProps {
  cameraRef: React.MutableRefObject<CameraControls | null>;
}

const moveTo: { [key: string]: number[] } = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
}

const Controls = ({ cameraRef }: ControlsProps) => {
  const handlePosition = ([dx, dy]: number[]) => {
    if (!cameraRef.current) {
      return;
    }
    let currentPosition: THREE.Vector3 = cameraRef.current.camera.position;
    cameraRef.current.setPosition(currentPosition.x + dx, currentPosition.y + dy, currentPosition.z, true)
  };

  const handleZoom = (zoomStep: number) => {
    if (!cameraRef.current) {
      return;
    }
    cameraRef.current.zoom(zoomStep, true);
  };

  const handelReset = () => {
    if (!cameraRef.current) {
      return;
    }
    cameraRef.current.reset(true);
  }

  useEffect( () => {
    const onKeyDownCallback = (event: KeyboardEvent) => {
      const key = event.key;
      if (key.startsWith('Arrow')) {
        const direction = key.replace('Arrow', '').toLowerCase();
        return handlePosition([...moveTo[direction]]);
      }

      if (key === '+') {
        return handleZoom(1);
      }

      if (key === '-') {
        return handleZoom(-1);
      }

      if (key === 'Escape') {
        return handelReset();
      }
    };

    document.addEventListener('keydown', onKeyDownCallback);
    
    return () => {
      document.removeEventListener('keydown', onKeyDownCallback);
    }
  }, []);

  return <>
    <ControlsContainer>
      <UpButtonContainer>
        <StyledButton onClick={() => handlePosition([...moveTo.up])}>Up</StyledButton>
      </UpButtonContainer>
      <ButtonsContainer>
        <StyledButton onClick={() => handlePosition([...moveTo.left])}>Left</StyledButton>
        <StyledButton onClick={() => handlePosition([...moveTo.down])}>Down</StyledButton>
        <StyledButton onClick={() => handlePosition([...moveTo.right])}>Right</StyledButton>
      </ButtonsContainer>
      <HelperText>You can also use the arrows keyboards</HelperText>
    </ControlsContainer>
    
    <ControlsContainer>
      <ButtonsContainer>
        <StyledButton onClick={() => handleZoom(1)}>Zoom In</StyledButton>
        <StyledButton onClick={() => handleZoom(-1)}>Zoom Out</StyledButton>
      </ButtonsContainer>
      <HelperText>You can also use + - in your keyboard</HelperText>
    </ControlsContainer>
    <ControlsContainer>
      <ButtonsContainer>
        <StyledButton onClick={() => handelReset()}>Reset</StyledButton>
      </ButtonsContainer>
      <HelperText>You can also use Esc your keyboard</HelperText>
    </ControlsContainer>
  </>
};

export default Controls;