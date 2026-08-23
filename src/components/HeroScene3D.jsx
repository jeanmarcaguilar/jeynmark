import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Custom hook to detect if device is mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// ------- Torus Knot — center-right -------
const TorusKnot = ({ isMobile }) => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.position.y = 0 + Math.sin(t * 0.4) * 0.3;
  });
  
  const position = isMobile ? [2.5, 0, 0] : [6.0, 0, 0];
  const scale = isMobile ? 0.5 : 1;
  const args = isMobile ? [1.25, 0.29, 200, 32, 2, 3] : [2.5, 0.58, 200, 32, 2, 3];
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusKnotGeometry args={args} />
      <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.55} emissive="#ffffff" emissiveIntensity={1.2} />
    </mesh>
  );
};

// ------- Icosahedron — left side -------
const Icosahedron = ({ isMobile }) => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.05;
    meshRef.current.rotation.z = t * 0.07;
    meshRef.current.position.y = -0.5 + Math.cos(t * 0.35) * 0.2;
  });
  
  const position = isMobile ? [-2.5, -0.5, 0] : [-6.0, -0.5, 0];
  const scale = isMobile ? 0.5 : 1;
  const args = isMobile ? [1.0, 1] : [2.0, 1];
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={args} />
      <meshStandardMaterial color="rgba(19, 18, 18, 1)" wireframe transparent opacity={0.45} emissive="#ffffff" emissiveIntensity={1.0} />
    </mesh>
  );
};

// ------- Octahedron — top center -------
const Octahedron = ({ isMobile }) => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.position.y = 2.8 + Math.sin(t * 0.5 + 1) * 0.3;
  });
  
  const position = isMobile ? [-1.0, 1.5, -1] : [-2.0, 2.8, -1];
  const scale = isMobile ? 0.5 : 1;
  const args = isMobile ? [0.5, 0] : [1.0, 0];
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={args} />
      <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.6} emissive="#ffffff" emissiveIntensity={1.5} />
    </mesh>
  );
};

// ------- Top-right Dodecahedron — fills empty corner -------
const Dodecahedron = ({ isMobile }) => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.07;
    meshRef.current.rotation.y = t * 0.09;
    meshRef.current.position.y = 2.5 + Math.cos(t * 0.45) * 0.25;
  });
  
  const position = isMobile ? [3.0, 1.5, -0.5] : [7.0, 2.5, -0.5];
  const scale = isMobile ? 0.5 : 1;
  const args = isMobile ? [0.6, 0] : [1.2, 0];
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <dodecahedronGeometry args={args} />
      <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.5} emissive="#ffffff" emissiveIntensity={1.1} />
    </mesh>
  );
};

// ------- Bottom-right Tetrahedron accent -------
const Tetrahedron = ({ isMobile }) => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.z = t * 0.15;
    meshRef.current.rotation.y = t * 0.08;
    meshRef.current.position.y = -2.8 + Math.sin(t * 0.6 + 2) * 0.22;
  });
  
  const position = isMobile ? [3.5, -1.5, -1] : [8.0, -2.8, -1];
  const scale = isMobile ? 0.5 : 1;
  const args = isMobile ? [0.45, 0] : [0.9, 0];
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <tetrahedronGeometry args={args} />
      <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.55} emissive="#ffffff" emissiveIntensity={1.3} />
    </mesh>
  );
};

// ------- Small ring top-right -------
const RingSmall = ({ isMobile }) => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.09 + 1.2;
    meshRef.current.rotation.y = t * 0.05;
  });
  
  const position = isMobile ? [3.5, 0.5, -1.5] : [7.5, 1.0, -1.5];
  const scale = isMobile ? 0.5 : 1;
  const args = isMobile ? [0.7, 0.011, 12, 80] : [1.4, 0.022, 12, 80];
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={args} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.4} emissive="#ffffff" emissiveIntensity={1.0} />
    </mesh>
  );
};

// ------- Main exported Scene -------
const HeroScene3D = () => {
  const isMobile = useIsMobile();
  
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, isMobile ? 8 : 5], fov: isMobile ? 60 : 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.2} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, 3, 2]} intensity={1.0} color="#ffffff" />
        <pointLight position={[6, -2, 3]} intensity={0.8} color="#ffffff" />
        <pointLight position={[5, 4, 1]} intensity={0.7} color="#ffffff" />

        <TorusKnot isMobile={isMobile} />
        <Icosahedron isMobile={isMobile} />
        <Octahedron isMobile={isMobile} />
        <Dodecahedron isMobile={isMobile} />
        <Tetrahedron isMobile={isMobile} />
        <RingSmall isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default HeroScene3D;
