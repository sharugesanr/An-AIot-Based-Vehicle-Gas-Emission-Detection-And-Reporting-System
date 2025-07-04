import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

function GlobeSphere() {
  return (
    <mesh>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial color="#00bcd4" wireframe />
    </mesh>
  );
}

export default function Home() {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <div style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 7] }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade />
          <GlobeSphere />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
        </Canvas>
      </div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', paddingLeft: '5rem', color: 'white' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>Eco<span style={{ color: '#00bcd4' }}>Track</span></h1>
        <p style={{ fontSize: '1.5rem', color: '#ccc' }}>Advanced Vehicle Emissions Monitoring</p>
      </div>
    </div>
  );
}
