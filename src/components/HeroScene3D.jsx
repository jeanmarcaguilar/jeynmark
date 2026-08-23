import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ------- Torus Knot — center-right -------
const TorusKnot = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.position.y = 0 + Math.sin(t * 0.4) * 0.3;
  });
  return (
    <mesh ref={meshRef} position={[6.0, 0, 0]}>
      <torusKnotGeometry args={[2.5, 0.58, 200, 32, 2, 3]} />
      <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.55} emissive="#ffffff" emissiveIntensity={1.2} />
    </mesh>
  );
};

// ------- Icosahedron — left side -------
const Icosahedron = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.05;
    meshRef.current.rotation.z = t * 0.07;
    meshRef.current.position.y = -0.5 + Math.cos(t * 0.35) * 0.2;
  });
  return (
    <mesh ref={meshRef} position={[-6.0, -0.5, 0]}>
      <icosahedronGeometry args={[2.0, 1]} />
      <meshStandardMaterial color="rgba(19, 18, 18, 1)" wireframe transparent opacity={0.45} emissive="#ffffff" emissiveIntensity={1.0} />
    </mesh>
  );
};

// ------- Octahedron — top center -------
const Octahedron = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.position.y = 2.8 + Math.sin(t * 0.5 + 1) * 0.3;
  });
  return (
    <mesh ref={meshRef} position={[-2.0, 2.8, -1]}>
      <octahedronGeometry args={[1.0, 0]} />
      <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.6} emissive="#ffffff" emissiveIntensity={1.5} />
    </mesh>
  );
};

// ------- Top-right Dodecahedron — fills empty corner -------
const Dodecahedron = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.07;
    meshRef.current.rotation.y = t * 0.09;
    meshRef.current.position.y = 2.5 + Math.cos(t * 0.45) * 0.25;
  });
  return (
    <mesh ref={meshRef} position={[7.0, 2.5, -0.5]}>
      <dodecahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.5} emissive="#ffffff" emissiveIntensity={1.1} />
    </mesh>
  );
};

// ------- Bottom-right Tetrahedron accent -------
const Tetrahedron = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.z = t * 0.15;
    meshRef.current.rotation.y = t * 0.08;
    meshRef.current.position.y = -2.8 + Math.sin(t * 0.6 + 2) * 0.22;
  });
  return (
    <mesh ref={meshRef} position={[8.0, -2.8, -1]}>
      <tetrahedronGeometry args={[0.9, 0]} />
      <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.55} emissive="#ffffff" emissiveIntensity={1.3} />
    </mesh>
  );
};

// ------- Small ring top-right -------
const RingSmall = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.09 + 1.2;
    meshRef.current.rotation.y = t * 0.05;
  });
  return (
    <mesh ref={meshRef} position={[7.5, 1.0, -1.5]}>
      <torusGeometry args={[1.4, 0.022, 12, 80]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.4} emissive="#ffffff" emissiveIntensity={1.0} />
    </mesh>
  );
};

// ------- Main exported Scene -------
const HeroScene3D = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.2} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, 3, 2]} intensity={1.0} color="#ffffff" />
        <pointLight position={[6, -2, 3]} intensity={0.8} color="#ffffff" />
        <pointLight position={[5, 4, 1]} intensity={0.7} color="#ffffff" />

        <TorusKnot />
        <Icosahedron />
        <Octahedron />
        <Dodecahedron />
        <Tetrahedron />
        <RingSmall />
      </Canvas>
    </div>
  );
};

export default HeroScene3D;
