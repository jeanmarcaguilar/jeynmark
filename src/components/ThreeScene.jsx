import { Canvas } from '@react-three/fiber';
import { Float, Environment, Text, OrbitControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

const FloatingLaptop = () => {
  const meshRef = useRef();

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        {/* Laptop Base */}
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />

        {/* Laptop Screen */}
        <mesh position={[0, 0.8, -0.9]}>
          <boxGeometry args={[2.8, 1.8, 0.05]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Screen Glow */}
        <mesh position={[0, 0.8, -0.87]}>
          <planeGeometry args={[2.6, 1.6]} />
          <meshBasicMaterial color="#4a9eff" transparent opacity={0.1} />
        </mesh>
      </mesh>
    </Float>
  );
};

const FloatingCode = ({ text, position, color = "#ffffff" }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <Text
        position={position}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </Float>
  );
};

const GeometricShapes = () => {
  return (
    <>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh position={[2, 1, 0]} rotation={[0.5, 0.5, 0]}>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.5} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[-2, -0.5, 1]} rotation={[0.3, 0.7, 0.2]}>
          <tetrahedronGeometry args={[0.25]} />
          <meshStandardMaterial color="#a1a1aa" metalness={0.6} roughness={0.4} />
        </mesh>
      </Float>

      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh position={[1.5, -1, -1]} rotation={[0.7, 0.3, 0.5]}>
          <icosahedronGeometry args={[0.2]} />
          <meshStandardMaterial color="#71717a" metalness={0.7} roughness={0.3} />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.25}>
        <mesh position={[-1.5, 1.5, -0.5]} rotation={[0.4, 0.6, 0.3]}>
          <torusGeometry args={[0.2, 0.05, 16, 32]} />
          <meshStandardMaterial color="#52525b" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
    </>
  );
};

const ThreeScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          {/* Environment */}
          <Environment preset="night" />

          {/* 3D Objects */}
          <FloatingLaptop />
          <GeometricShapes />

          {/* Floating Tech Labels */}
          <FloatingCode text="React" position={[2.5, 0.5, 0]} color="#61DAFB" />
          <FloatingCode text="JavaScript" position={[-2.5, 1, 0]} color="#F7DF1E" />
          <FloatingCode text="PHP" position={[2, -1.5, 1]} color="#777BB4" />
          <FloatingCode text="MySQL" position={[-2, -1, -1]} color="#4479A1" />
          <FloatingCode text="Git" position={[0, 2, 0]} color="#F05032" />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
