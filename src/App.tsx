import React, { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, CameraControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import styled from 'styled-components';
import Slider from '@mui/material/Slider';

import './App.css';

import Scene from './Scene';
import { parseCuboids } from './helpers/utils';
import { JSONData, Cuboid } from './types';
import Cuboids from './Cuboids';
import { CuboidInfo } from './CuboidInfo';
import Controls from './Controls';
import Typography from '@mui/material/Typography';

const MainContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const CanvasContainer = styled.div`
  position: relative;
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

const StyledSlider = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 33%;
  margin: auto;
  color: white;
`;

const StyledSliderOpacity = styled.div`
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 33%;
  margin: auto;
  color: white;
`;

const App: React.FC = () => {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const [data, setData] = useState<JSONData | null>(null);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [currentOpacity, setCurrentOpacity] = useState<number>(4);
  const [currentCuboid, setCurrentCuboid] = useState<Cuboid>();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_EXAMPLES}${(currentFrame).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}.json`)
      .then((response) => response.json())
      .then((json) => {
        const cuboids = parseCuboids(json.cuboids)
        setData({
          points: json.points,
          cuboids,
        })
      });
  }, [currentFrame]);

  const onShowInfo = (cuboid: Cuboid) => {
    setCurrentCuboid(cuboid);
  };

  const handleChange = (event: Event, newValue: number) => {
    setCurrentFrame(newValue);
  };

  const handleChangeOpacity = (event: Event, newValue: number) => {
    setCurrentOpacity(newValue);
  };

  return (
    <div className="App">
      <MainContainer>
        <CanvasContainer>
          <Canvas style={{ height: '100vh', backgroundColor: 'black' }} camera={{ position: [0, -20, 15], fov: 75 }}>
            <CameraControls ref={cameraControlRef}/>
            <ambientLight intensity={0.5} />
            <OrbitControls />
            {data &&  <>
              <Cuboids cuboids={data.cuboids} showInfo={onShowInfo} opacity={currentOpacity / 10}/>}
              <Scene points={data.points} />
            </>}
          </Canvas>

          <StyledSlider>
            <Typography id="non-linear-slider" gutterBottom>
              Frame: {currentFrame}/10
            </Typography>
            <Slider value={currentFrame} aria-label="Default" valueLabelDisplay="auto" max={10} onChange={handleChange} />
          </StyledSlider>

          <StyledSliderOpacity>
            <Typography id="non-linear-slider" gutterBottom>
              Current Opacity: {currentOpacity / 10}/1
            </Typography>
            <Slider value={currentOpacity} aria-label="Default" valueLabelDisplay="auto" max={10} onChange={handleChangeOpacity} />
          </StyledSliderOpacity>
        </CanvasContainer>
        <RightSideContainer>
          <CuboidInfo cuboid={currentCuboid} />
          <Controls cameraRef={cameraControlRef} />
        </RightSideContainer>     
      </MainContainer>
    </div>
  );
};

export default App;