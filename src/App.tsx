import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Scene from './Scene';
import { parseCuboids } from './helpers/utils';
import { JSONData } from './types';
import Cuboids from './Cuboids';

const App: React.FC = () => {
  const [data, setData] = useState<JSONData | null>(null);

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

  return (
    <div className="App">
      {data
        ? <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [0, -20, 15], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <OrbitControls />
            <Cuboids cuboids={data.cuboids} />
            <Scene points={data.points} />
          </Canvas>
        : <p>Loading point cloud...</p>
      }
    </div>
  );
};

export default App;