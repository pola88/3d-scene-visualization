import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import styled from 'styled-components';
import Scene from './Scene';
import { parseCuboids } from './helpers/utils';
import { JSONData, Cuboid } from './types';
import Cuboids from './Cuboids';
import { CuboidInfo } from './CuboidInfo';


const MainContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const CanvasContainer = styled.div`
  flex-grow: 1;
`;

const CuboidInfoContainer = styled.div`
  min-width: 300px;
`;

const App: React.FC = () => {
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
              <Canvas style={{ height: '100vh' }} camera={{ position: [0, -20, 15], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <OrbitControls />
                <Cuboids cuboids={data.cuboids} showInfo={onShowInfo} />
                <Scene points={data.points} />
              </Canvas>
            </CanvasContainer>
            <CuboidInfoContainer>
              <CuboidInfo cuboid={currentCuboid} />
            </CuboidInfoContainer>
          </MainContainer>
        : <p>Loading point cloud...</p>
      }
    </div>
  );
};

export default App;