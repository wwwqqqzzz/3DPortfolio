import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { Text, Center } from '@react-three/drei';

export const ContactScene = ({ currentSection }) => {
  const cylinderRef1 = useRef();
  const cylinderRef2 = useRef();
  const boxRef = useRef();
  const textRef = useRef();

  // 使用react-spring进行动画
  const [cylinder1Props, cylinder1Api] = useSpring(() => ({
    y: 0,
    rotateZ: 0,
    config: { mass: 1, tension: 80, friction: 10 }
  }));
  
  const [cylinder2Props, cylinder2Api] = useSpring(() => ({
    y: 0,
    rotateZ: 0,
    config: { mass: 1, tension: 80, friction: 10 }
  }));
  
  const [boxProps, boxApi] = useSpring(() => ({
    y: 1,
    rotateZ: 0,
    config: { mass: 1, tension: 80, friction: 10 }
  }));
  
  // 文字颜色状态
  const [textColor, setTextColor] = useState("#cccccc");
  
  // 当部分变化时更新动画
  useEffect(() => {
    if (currentSection === 3) {
      // 启动动画
      cylinder1Api.start({
        y: 0,
        rotateZ: 0,
        loop: { reverse: true },
        from: { y: -0.2, rotateZ: -0.1 },
        to: { y: 0.2, rotateZ: 0.1 }
      });
      
      cylinder2Api.start({
        y: 0,
        rotateZ: 0,
        loop: { reverse: true },
        from: { y: 0.2, rotateZ: 0.1 },
        to: { y: -0.2, rotateZ: -0.1 }
      });
      
      boxApi.start({
        y: 1,
        rotateZ: 0,
        loop: { reverse: true },
        from: { y: 0.8, rotateZ: -0.05 },
        to: { y: 1.2, rotateZ: 0.05 }
      });
      
      setTextColor("#ec4899");
    } else {
      // 停止动画
      cylinder1Api.stop();
      cylinder2Api.stop();
      boxApi.stop();
      
      // 重置位置
      cylinder1Api.start({ y: 0, rotateZ: 0 });
      cylinder2Api.start({ y: 0, rotateZ: 0 });
      boxApi.start({ y: 1, rotateZ: 0 });
      
      setTextColor("#cccccc");
    }
  }, [currentSection, cylinder1Api, cylinder2Api, boxApi]);

  useFrame((state, delta) => {
    if (currentSection === 3) {
      if (cylinderRef1.current) {
        cylinderRef1.current.rotation.y += delta * 0.3;
      }
      if (cylinderRef2.current) {
        cylinderRef2.current.rotation.y -= delta * 0.3;
      }
      if (boxRef.current) {
        boxRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.05;
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <a.mesh 
        position={[-1.5, cylinder1Props.y, 0]}
        rotation-z={cylinder1Props.rotateZ}
        ref={cylinderRef1}
      >
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshStandardMaterial 
          color="#ec4899" 
          metalness={0.3} 
          roughness={0.4}
        />
      </a.mesh>
      
      <a.mesh 
        position={[1.5, cylinder2Props.y, 0]}
        rotation-z={cylinder2Props.rotateZ}
        ref={cylinderRef2}
      >
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshStandardMaterial 
          color="#ec4899" 
          metalness={0.3} 
          roughness={0.4}
        />
      </a.mesh>
      
      <a.mesh 
        position-x={0}
        position-y={boxProps.y}
        position-z={0}
        rotation-z={boxProps.rotateZ}
        ref={boxRef}
      >
        <boxGeometry args={[4, 0.5, 0.5]} />
        <meshStandardMaterial 
          color="#ec4899" 
          metalness={0.3} 
          roughness={0.4}
        />
      </a.mesh>

      <Center position={[0, -1.5, 0]}>
        <Text
          ref={textRef}
          fontSize={0.5}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          outlineWidth={0.02}
          outlineColor="#ffffff"
        >
          联系我
        </Text>
      </Center>
    </group>
  );
}; 