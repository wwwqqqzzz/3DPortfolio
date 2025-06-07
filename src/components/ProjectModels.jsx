import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useSpring, a } from '@react-spring/three';

export const ProjectModels = ({ currentSection }) => {
  const boxRef = useRef();
  const sphereRef = useRef();
  const torusRef = useRef();
  
  // 使用react-spring进行动画
  const [sphereProps, sphereApi] = useSpring(() => ({
    scale: 0.5,
    rotateY: 0,
    config: { mass: 1, tension: 180, friction: 20 }
  }));
  
  const [boxProps, boxApi] = useSpring(() => ({
    x: -4,
    config: { mass: 1, tension: 180, friction: 20 }
  }));
  
  const [torusProps, torusApi] = useSpring(() => ({
    x: 4,
    config: { mass: 1, tension: 180, friction: 20 }
  }));
  
  // 当部分变化时更新动画
  React.useEffect(() => {
    if (currentSection === 1) {
      sphereApi.start({ scale: 1, rotateY: Math.PI * 2 });
      boxApi.start({ x: -2 });
      torusApi.start({ x: 2 });
    } else {
      sphereApi.start({ scale: 0.5, rotateY: 0 });
      boxApi.start({ x: -4 });
      torusApi.start({ x: 4 });
    }
  }, [currentSection, sphereApi, boxApi, torusApi]);
  
  useFrame((state, delta) => {
    if (currentSection === 1) {
      if (boxRef.current) {
        boxRef.current.rotation.y += delta * 0.2;
        boxRef.current.rotation.x += delta * 0.1;
      }
      if (torusRef.current) {
        torusRef.current.rotation.y -= delta * 0.3;
        torusRef.current.rotation.x += delta * 0.2;
      }
    }
  });
  
  return (
    <group position={[0, 0, 0]}>
      <a.mesh 
        position={[0, 1, 0]}
        scale={sphereProps.scale}
        rotation-y={sphereProps.rotateY}
        ref={sphereRef}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          metalness={0.4} 
          roughness={0.3}
        />
      </a.mesh>
      
      <a.mesh 
        position-x={boxProps.x}
        position-y={0}
        position-z={0}
        ref={boxRef}
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial 
          color="#10b981" 
          metalness={0.2} 
          roughness={0.3}
        />
      </a.mesh>
      
      <a.mesh 
        position-x={torusProps.x}
        position-y={0}
        position-z={0}
        ref={torusRef}
      >
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial 
          color="#f59e0b" 
          metalness={0.5} 
          roughness={0.2} 
        />
      </a.mesh>
    </group>
  );
}; 