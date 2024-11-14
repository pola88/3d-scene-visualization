import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('https://static.scale.com/uploads/pandaset-challenge/frame_00.json')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="App">
      {data
        ? <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [0, -20, 15], fov: 75 }}>
            <Scene points={data} />
          </Canvas>
        : <p>Loading point cloud...</p>
      }
    </div>
  );
};

export default App;