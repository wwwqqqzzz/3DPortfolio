import { OrbitControls, Grid, Environment, useScroll } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useControls } from "leva";
import { TechIcons } from "./TechIcons";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CenterText } from "./CenterText";
import { motion } from "framer-motion";
import { MotionConfig } from "framer-motion";
import { useMotionValue, useTransform, animate } from "framer-motion";
import { ProjectModels } from "./ProjectModels";
import { ContactScene } from "./ContactScene";

// 创建motion支持的3D组件
const MotionGroup = motion.group;
const MotionMesh = motion.mesh;

export const Experience = ({ currentSection, setSection }) => {
  // 添加场景控制
  const { showGrid } = useControls("场景", {
    showGrid: true
  });

  // 添加动画控制
  const { animations } = useControls("角色动画", {
    animations: {
      value: 'walk',
      options: ['walk', 'standing', 'falling'],
    }
  });
  
  // 设置固定的相机角度
  const maxPolarAngle = 1.5707963267948966;

  // 场景参考
  const sceneRef = useRef();
  const orbitControlsRef = useRef();
  
  // 获取相机
  const { camera } = useThree();
  
  // 滚动控制
  const scroll = useScroll();
  
  // framer-motion动画值
  const cameraY = useMotionValue(2);
  const cameraZ = useMotionValue(-5);
  
  // 相机位置更新
  useFrame((state) => {
    // 检测当前滚动部分
    const newSection = Math.floor(scroll.offset * 4);
    if (newSection !== currentSection) {
      setSection(newSection);
      
      // 使用framer-motion的animate函数平滑过渡相机位置
      animate(cameraY, 2 + newSection * 0.2, {
        type: "spring",
        stiffness: 70,
        damping: 20
      });
      
      animate(cameraZ, -5 + newSection * 0.5, {
        type: "spring",
        stiffness: 70,
        damping: 20
      });
      
      // 根据部分切换角色动画
      switch(newSection) {
        case 0:
          setAnimations("standing");
          break;
        case 1:
          setAnimations("walk");
          break;
        case 2:
          setAnimations("standing");
          break;
        case 3:
          setAnimations("falling");
          break;
        default:
          setAnimations("standing");
      }
    }
    
    // 更新相机位置
    camera.position.y = cameraY.get();
    camera.position.z = cameraZ.get();
    camera.lookAt(0, 0, 0);
    
    // 强制相机极角等于maxPolarAngle
    if (orbitControlsRef.current && orbitControlsRef.current.getPolarAngle() !== maxPolarAngle) {
      // 计算相机位置
      const distance = 5; // 相机到目标点的距离
      const y = distance * Math.cos(maxPolarAngle); // 计算y坐标
      const horizontalDistance = distance * Math.sin(maxPolarAngle); // 计算水平距离
      
      // 保持相机的水平方向不变，只调整高度
      const cameraDirection = new THREE.Vector3();
      camera.getWorldDirection(cameraDirection);
      cameraDirection.y = 0; // 忽略垂直分量
      cameraDirection.normalize();
      
      // 设置相机位置
      camera.position.set(
        horizontalDistance * cameraDirection.x, 
        y, 
        horizontalDistance * cameraDirection.z
      );
      
      // 更新控制器
      orbitControlsRef.current.update();
    }
  });

  return (
    <MotionConfig
      transition={{
        type: "spring",
        duration: 0.8,
        bounce: 0.2
      }}
    >
      {/* 环境光和背景 */}
      <color attach="background" args={['#202030']} />
      <fog attach="fog" args={['#202030', 5, 20]} />
      <hemisphereLight intensity={1.2} groundColor="#000a12" />
      
      {/* 增强光照 */}
      <ambientLight intensity={1.5} />
      
      {/* 主要方向光 */}
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1.5} 
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* 前置光源 - 确保模型正面被照亮 */}
      <directionalLight 
        position={[0, 2, 6]} 
        intensity={1.8} 
        color="#ffffff"
      />
      
      {/* 多角度点光源 */}
      <pointLight position={[-5, 5, -5]} intensity={1.0} color="#ffffff" />
      <pointLight position={[0, 3, 5]} intensity={1.2} color="#fff6e0" />
      <pointLight position={[0, 1, 10]} intensity={1.5} color="#ffffff" />
      
      {/* 主场景 - 第一屏 */}
      <MotionGroup 
        ref={sceneRef} 
        position={[0, 0, 0]}
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* 技术图标 */}
        <TechIcons />
        
        {/* 中央文字 */}
        <CenterText />
        
        {/* 主角色 */}
        <MotionGroup 
          position-y={-1.3} 
          rotation-y={Math.PI}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Avatar animations={animations} />
        </MotionGroup>
      </MotionGroup>
      
      {/* 第二屏 - 项目展示 */}
      <MotionGroup 
        position={[0, -10, 0]}
        initial={{ rotateX: -0.5, opacity: 0 }}
        animate={{ 
          rotateX: currentSection >= 1 ? 0 : -0.5,
          opacity: currentSection >= 1 ? 1 : 0.3
        }}
      >
        {/* 项目展示内容 */}
        <ProjectModels currentSection={currentSection} />
      </MotionGroup>
      
      {/* 第三屏 - 技能展示 */}
      <MotionGroup 
        position={[0, -20, 0]}
        animate={{ 
          rotateZ: currentSection === 2 ? 0 : -0.3,
          opacity: currentSection === 2 ? 1 : 0.3
        }}
      >
        {/* 技能展示内容 */}
        <MotionMesh 
          position={[0, 0, 0]}
          animate={{ 
            rotateY: currentSection === 2 ? Math.PI * 2 : 0,
            scale: currentSection === 2 ? [1.5, 1.5, 1.5] : [0.8, 0.8, 0.8]
          }}
          transition={{ 
            rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { type: "spring", stiffness: 100 }
          }}
        >
          <dodecahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </MotionMesh>
      </MotionGroup>
      
      {/* 第四屏 - 联系方式 */}
      <MotionGroup 
        position={[0, -30, 0]}
        animate={{ 
          rotateX: currentSection === 3 ? 0 : 0.5,
          opacity: currentSection === 3 ? 1 : 0.3
        }}
      >
        {/* 联系方式内容 */}
        <ContactScene currentSection={currentSection} />
      </MotionGroup>
      
      {/* 地面网格 */}
      {showGrid && (
        <Grid
          position={[0, -1.01, 0]}
          args={[20, 20]}
          cellSize={1}
          cellThickness={1}
          cellColor="#6f74dd"
          sectionSize={5}
          sectionThickness={1.5}
          sectionColor="#00a2ff"
          fadeDistance={30}
          fadeStrength={1}
        />
      )}
    </MotionConfig>
  );
};