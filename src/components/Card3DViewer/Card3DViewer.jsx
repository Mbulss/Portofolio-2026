import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Html, Float, ContactShadows, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import './Card3DViewer.css';

const cardGLB = "/assets/card.glb";

function CardModel({ hovered }) {
  const { nodes, materials } = useGLTF(cardGLB);
  const cardRef = useRef();

  useFrame((state) => {
    if (!hovered && cardRef.current) {
      // Add the -2.0 offset to the float animation so it stays LOW
      cardRef.current.position.y = -2.0 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    } else if (hovered && cardRef.current) {
      cardRef.current.position.y = -2.0;
    }
  });

  return (
    <group 
      ref={cardRef} 
      scale={typeof window !== 'undefined' && window.innerWidth < 1024 ? 3.0 : 3.5} 
      position={[0, -2.0, 0]}
    >
      <mesh geometry={nodes.card.geometry}>
        <meshPhysicalMaterial 
          map={materials.base.map} 
          map-anisotropy={16} 
          clearcoat={1} 
          clearcoatRoughness={0.05} 
          roughness={0.1} 
          metalness={0.4} 
          reflectivity={1}
        />
      </mesh>
      
      {/* Clip & Clamp details */}
      <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
      <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
    </group>
  );
}

export default function Card3DViewer() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="card-viewer-container">
      <Canvas 
        shadows 
        gl={{ antialias: true, alpha: true, stencil: false, depth: true }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        
        <ambientLight intensity={1.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={250} color="#fff" />
        <pointLight position={[-10, -10, -10]} intensity={100} color="#fff" />
        
        <Suspense fallback={<Html center><div className="loader">INITIALIZING 3D...</div></Html>}>
          <CardModel hovered={hovered} />
          
          <ContactShadows 
            position={[0, -4, 0]} 
            opacity={0.5} 
            scale={12} 
            blur={2.5} 
            far={10} 
            color="#000"
          />
          
          <Environment preset="city" />
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={!hovered} 
          autoRotateSpeed={4} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
