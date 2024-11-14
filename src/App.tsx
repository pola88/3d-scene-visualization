import React, { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, CameraControls } from '@react-three/drei';
import styled from 'styled-components';
import './App.css';

import Scene from './Scene';
import { parseCuboids } from './helpers/utils';
import { JSONData, Cuboid } from './types';
import Cuboids from './Cuboids';
import { CuboidInfo } from './CuboidInfo';
import Controls from './Controls';

const MainContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const CanvasContainer = styled.div`
  flex-grow: 1;
`;

const RightSideContainer = styled.div`
  min-width: 250px;
  margin: 16px;
  flex-direction: column;
  display: flex;

  > div:first-child {
   flex: 1;
  }
`;

const App: React.FC = () => {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const [data, setData] = useState<JSONData | null>(null);
  const [currentCuboid, setCurrentCuboid] = useState<Cuboid>();

  useEffect(() => {
    fetch('https://static.scale.com/uploads/pandaset-challenge/frame_00.json')
      .then((response) => response.json())
      .then((json) => {
        const cuboids = parseCuboids(json.cuboids)
        setData({
          points: json.points,
          cuboids,
        })
      });
  }, []);

  const onShowInfo = (cuboid: Cuboid) => {
    setCurrentCuboid(cuboid);
  };

  return (
    <div className="App">
      {data
        ? <MainContainer>
            <CanvasContainer>
              <Canvas style={{ height: '100vh', backgroundColor: 'black' }} camera={{ position: [0, -20, 15], fov: 75 }}>
                <CameraControls ref={cameraControlRef}/>
                <ambientLight intensity={0.5} />
                <OrbitControls />
                <Cuboids cuboids={data.cuboids} showInfo={onShowInfo} />
                <Scene points={data.points} />
              </Canvas>
            </CanvasContainer>
            <RightSideContainer>
              <CuboidInfo cuboid={currentCuboid} />
              <Controls cameraRef={cameraControlRef} />
            </RightSideContainer>
          </MainContainer>
        : <p>Loading point cloud...</p>
      }
    </div>
  );
};

export default App;